import { Injectable, UseInterceptors, Inject } from '@nestjs/common';
import User from 'src/domain/model/user/user';
import OperationHistoryRepository from 'src/domain/model/operationhistory/operation.history.repository';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';

@Injectable()
export class OperationHistoryService {
  constructor(
    @Inject('OperationHistoryRepository')
    private readonly repository: OperationHistoryRepository,
  ) {}

  public async register(
    operationHistory: OperationHistory,
  ): Promise<OperationHistory> {
    return await this.repository.register(operationHistory);
  }
}
