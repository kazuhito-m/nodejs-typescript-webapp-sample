import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import OperationHistoryRepository from 'src/domain/model/operationhistory/operation.history.repository';
import { OperationHistoryEntity } from './operation.history.entity';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';

@Injectable()
export default class OperationHistoryDatasource
  implements OperationHistoryRepository {
  constructor(
    @InjectRepository(OperationHistoryEntity)
    private readonly dao: Repository<OperationHistoryEntity>,
  ) {}

  public async register(
    operationHistory: OperationHistory,
  ): Promise<OperationHistory> {
    const newIdentifier = await this.nextSequence();
    const entity = OperationHistoryEntity.of(operationHistory, newIdentifier);
    const registered = await this.dao.save<OperationHistoryEntity>(entity);
    return registered.toDomain();
  }

  private async nextSequence(): Promise<number> {
    const sql = 'SELECT nextval(\'operation_histories_seq\')';
    const result = await this.dao.query(sql);
    return result[0].nextval;
  }
}
