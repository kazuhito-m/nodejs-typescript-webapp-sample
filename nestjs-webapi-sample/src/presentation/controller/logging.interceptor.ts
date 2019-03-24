import { NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CallHandler } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OperationHistoryService } from 'src/application/serivce/operationhistory/operation.history.service';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';
import * as Log4js from 'log4js/lib/log4js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor<any, any> {
  private readonly logger = Log4js.getLogger();
  private readonly operationLogger = Log4js.getLogger('operationLogger');

  constructor(
    private readonly operationHistoryService: OperationHistoryService,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();

    this.registerOperationHistory(context);

    return next.handle().pipe(
      tap(() => {
        const logText = `リクエスト返却完了。経過時間 : ${Date.now() - now}ms`;
        this.logger.debug(logText);
      }),
    );
  }

  private registerOperationHistory(context: ExecutionContext) {
    const hitTest = context
      .getArgs()
      .filter(arg => arg.constructor.name === 'IncomingMessage');
    const url = hitTest.length > 0 ? hitTest[0].url : '';
    const name = context.getClass().name + '.' + context.getHandler().name;
    this.operationLogger.info(url + ',' + name);

    const operationHistory = OperationHistory.of(url, name);
    this.operationHistoryService.register(operationHistory);
  }
}
