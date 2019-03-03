import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastracture/datasource/user/user-entity';
import SearchOrmConfigFile from '../../SearchOrmConfigFile';

@Module({
  imports: [
    TypeOrmModule.forRoot(new SearchOrmConfigFile().find([UserEntity])),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
