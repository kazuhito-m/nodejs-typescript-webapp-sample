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

const sampleEntities = [UserEntity];
// const otherEntities = [];

const config = new ConfigFileSearcher();
config.search();

@Module({
  imports: [
        TypeOrmModule.forRoot(config.databaseSettings('sampleDb', sampleEntities)),
    TypeOrmModule.forFeature(sampleEntities),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
