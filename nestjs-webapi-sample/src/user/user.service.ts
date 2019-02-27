import { Injectable, UseInterceptors, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { Repository, QueryRunner } from 'typeorm';
import { inspect } from 'util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public all(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public async get(identifier: number): Promise<UserEntity> {
    const condition = { userIdentifier: identifier };
    return await this.repository.findOne(condition);
  }

  public async register(user: UserEntity): Promise<UserEntity> {
    const newIdentifier = await this.nextSequence();
    user.userIdentifier = newIdentifier;
    return await this.repository.save<UserEntity>(user);
  }

  private async nextSequence(): Promise<number> {
    const sql = 'SELECT nextval(\'users_seq\')';
    const result = await this.repository.query(sql);
    return result[0].nextval;
  }
}
