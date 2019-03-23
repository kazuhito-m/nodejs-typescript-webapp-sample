import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OperationHistoryService } from 'src/application/serivce/operationhistory/operation.history.service';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly operationHistoryService: OperationHistoryService,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: Observable<any>,
  ): Observable<any> {
    this.registerOperationHistory(context);

    const now = Date.now();
    return next.pipe(
      tap(() =>
        console.log(`リクエスト返却完了。経過時間 : ${Date.now() - now}ms`),
      ),
    );
  }

  private registerOperationHistory(context: ExecutionContext) {
    const hitTest = context
      .getArgs()
      .filter(arg => arg.constructor.name === 'IncomingMessage');
    const url = hitTest.length > 0 ? hitTest[0].url : '';
    const name = context.getClass().name + '.' + context.getHandler().name;

    const operationHistory = OperationHistory.of(url, name);
    this.operationHistoryService.register(operationHistory);
  }
}
