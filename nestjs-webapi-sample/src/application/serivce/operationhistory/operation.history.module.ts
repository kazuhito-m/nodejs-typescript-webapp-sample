import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationHistoryEntity } from 'src/infrastracture/datasource/operationhistory/operation.history.entity';
import OperationHistoryDatasource from 'src/infrastracture/datasource/operationhistory/operation.history.datasource';
import { OperationHistoryService } from './operation.history.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperationHistoryEntity], 'otherDb')],
  providers: [
    {
      provide: 'OperationHistoryRepository',
      useClass: OperationHistoryDatasource,
    },
    OperationHistoryService,
  ],
  exports: ['OperationHistoryRepository', OperationHistoryService],
})
export class OperationHistoryModule {}
