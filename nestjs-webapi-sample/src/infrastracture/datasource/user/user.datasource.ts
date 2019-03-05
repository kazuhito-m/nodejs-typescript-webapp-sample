import UserRepository from '../../../domain/model/user/user.repository';
import { UserEntity } from './user-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserDatasource implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dao: Repository<UserEntity>,
  ) {}

  public all(): Promise<UserEntity[]> {
    return this.dao.find();
  }

  public async get(identifier: number): Promise<UserEntity> {
    const condition = { userIdentifier: identifier };
    return await this.dao.findOne(condition);
  }

  public async register(user: UserEntity): Promise<UserEntity> {
    const newIdentifier = await this.nextSequence();
    user.userIdentifier = newIdentifier;
    return await this.dao.save<UserEntity>(user);
  }

  private async nextSequence(): Promise<number> {
    const sql = 'SELECT nextval(\'users_seq\')';
    const result = await this.dao.query(sql);
    return result[0].nextval;
  }
}
