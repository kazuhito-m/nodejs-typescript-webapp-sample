import { Module } from '@nestjs/common';
import { AppController } from './presentation/controller/app.controller';
import { AppService } from './app.service';
import { UserService } from './application/serivce/user/user.service';
import { UserModule } from './application/serivce/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastracture/datasource/user/user-entity';
import ConfigFileSearcher from './ConfigFileSearcher';
import { LoggingInterceptor } from './presentation/controller/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OperationHistoryEntity } from './infrastracture/datasource/operationhistory/operation.history.entity';
import { OperationHistoryModule } from './application/serivce/operationhistory/operation.history.module';
import { OperationHistoryService } from './application/serivce/operationhistory/operation.history.service';

const sampleEntities = [UserEntity];
const otherEntities = [OperationHistoryEntity];

const config = new ConfigFileSearcher();
config.search();

@Module({
  imports: [
    TypeOrmModule.forRoot(config.databaseSettings('sampleDb', sampleEntities)),
    TypeOrmModule.forRoot(config.databaseSettings('otherDb', otherEntities)),
    UserModule,
    OperationHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    OperationHistoryService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
