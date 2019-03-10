import { Injectable, UseInterceptors, Inject } from '@nestjs/common';
import UserRepository from '../../../domain/model/user/user.repository';
import User from 'src/domain/model/user/user';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  public all(): Promise<User[]> {
    return this.repository.all();
  }

  public async get(identifier: number): Promise<User> {
    return await this.repository.get(identifier);
  }

  public async register(user: User): Promise<User> {
    return await this.repository.register(user);
  }
}
