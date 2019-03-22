import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/controller/app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastracture/datasource/user/user-entity';
import ConfigFileSearcher from '../../ConfigFileSearcher';
import { LoggingInterceptor } from '../../presentation/controller/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(new ConfigFileSearcher().find([UserEntity])),
    TypeOrmModule.forFeature([UserEntity]),
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
