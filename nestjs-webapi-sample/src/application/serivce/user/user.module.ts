import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../../../infrastracture/datasource/user/user-entity';
import { UserController } from '../../../presentation/controller/user/user.controller';
import UserDatasource from '../../../infrastracture/datasource/user/user.datasource';
import UserRepository from '../../../domain/model/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: 'UserRepository', useClass: UserDatasource },
    UserService,
  ],
  controllers: [UserController],
  exports: ['UserRepository', UserService],
})
export class UserModule {}
