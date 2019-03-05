import { Injectable, UseInterceptors, Inject } from '@nestjs/common';
import { UserEntity } from '../../../infrastracture/datasource/user/user-entity';
import UserRepository from '../../../domain/model/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  public all(): Promise<UserEntity[]> {
    return this.repository.all();
  }

  public async get(identifier: number): Promise<UserEntity> {
    return await this.repository.get(identifier);
  }

  public async register(user: UserEntity): Promise<UserEntity> {
    return await this.repository.register(user);
  }
}
