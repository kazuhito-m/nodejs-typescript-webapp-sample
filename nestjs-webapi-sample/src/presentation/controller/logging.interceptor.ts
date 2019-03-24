import { NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CallHandler } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OperationHistoryService } from 'src/application/serivce/operationhistory/operation.history.service';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';
import * as Log4js from 'log4js/lib/log4js';
import { EntityManager, Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import OperationHistoryRepository from 'dist/domain/model/operationhistory/operation.history.repository';
import { OperationHistoryEntity } from 'dist/infrastracture/datasource/operationhistory/operation.history.entity';
import { inspect } from 'util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor<any, any> {
  private readonly logger = Log4js.getLogger();
  private readonly operationLogger = Log4js.getLogger('operationLogger');

  constructor(
    private readonly operationHistoryService: OperationHistoryService,
    @InjectConnection('otherDb') private readonly connection: Connection,
  ) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const owner = this;
    return await this.connection.transaction(async em => {
      const result = await owner.intercept2(context, next, em);
      this.logger.debug('Intercepterではエラーが怒らなかった');
      return result;
    });
  }

  private async intercept2(
    context: ExecutionContext,
    next: CallHandler<any>,
    em: EntityManager,
  ): Promise<Observable<any>> {
    const now = Date.now();

    await this.registerOperationHistory(context, 'リクエストの開始。', em);

    await this.registerOperationHistory(context, 'ハンドル処理直前。', em);

    throw new Error('ここで絶対にこける');

    return await next.handle().pipe(
      await tap(async () => {
        const logText = `リクエスト返却完了。経過時間 : ${Date.now() - now}ms`;
        this.logger.debug(logText);
        await this.registerOperationHistory(context, logText, em);
      }),
    );
  }

  private async registerOperationHistory(
    context: ExecutionContext,
    message: string,
    em: EntityManager,
  ) {
    const hitTest = context
      .getArgs()
      .filter(arg => arg.constructor.name === 'IncomingMessage');
    const url = hitTest.length > 0 ? hitTest[0].url : '';
    const name = context.getClass().name + '.' + context.getHandler().name;
    const description = name + ' | ' + message;
    this.operationLogger.info(url + ',' + description);

    const result = await em.query(
      "SELECT nextval('operation.operation_histories_seq')",
    );
    const id = result[0].nextval;
    this.logger.debug('id:' + id);
    const oh = OperationHistory.of(url, description);
    const entity = OperationHistoryEntity.of(oh, id);
    const repository = em.getRepository(OperationHistoryEntity);
    await repository.save(entity, {
      transaction: false,
    });
    // await this.operationHistoryService.register(oh);
  }
}
