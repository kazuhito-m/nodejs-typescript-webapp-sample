import 'reflect-metadata';
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Moment } from 'moment';
import OperationHistory from 'src/domain/model/operationhistory/operation.history';

@Entity('operation.operation_histories')
export class OperationHistoryEntity {
  @PrimaryColumn()
  operation_history_identifier: number;
  @Column()
  url: string;
  @Column()
  description: string;
  @CreateDateColumn()
  created_at: Moment;

  public toDomain(): OperationHistory {
    return new OperationHistory(
      this.operation_history_identifier,
      this.url,
      this.description,
      this.created_at,
    );
  }

  public static of(
    operationHistory: OperationHistory,
    newIdentifier: number,
  ): OperationHistoryEntity {
    const entity = new OperationHistoryEntity();
    entity.operation_history_identifier = newIdentifier;
    entity.url = operationHistory.url;
    entity.description = operationHistory.description;
    entity.created_at = operationHistory.createdAt;
    return entity;
  }
}
