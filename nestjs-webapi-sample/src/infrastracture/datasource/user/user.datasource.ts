import UserRepository from '../../../domain/model/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../../../domain/model/user/user';
import { UserEntity } from './user-entity';

@Injectable()
export default class UserDatasource implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dao: Repository<UserEntity>,
  ) {}

  public async all(): Promise<User[]> {
    const entities = await this.dao.find();
    return entities.map(e => e.toDomain());
  }

  public async get(identifier: number): Promise<User> {
    const condition = { user_identifier: identifier };
    const entity = await this.dao.findOne(condition);
    return entity.toDomain();
  }

  public async register(user: User): Promise<User> {
    const newIdentifier = await this.nextSequence();
    const entity = UserEntity.of(user, newIdentifier);
    const registered = await this.dao.save<UserEntity>(entity);
    return registered.toDomain();
  }

  private async nextSequence(): Promise<number> {
    const sql = 'SELECT nextval(\'users_seq\')';
    const result = await this.dao.query(sql);
    return result[0].nextval;
  }
}
