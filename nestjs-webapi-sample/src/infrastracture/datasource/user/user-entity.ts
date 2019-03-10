import 'reflect-metadata';
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import User from '../../../domain/model/user/user';
import { Moment } from 'moment';

@Entity('sample_user.users')
export class UserEntity {
  @PrimaryColumn({ name: 'user_identifier' })
  userIdentifier: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Moment;

  public toDomain(): User {
    return new User(this.userIdentifier, this.name, this.createdAt);
  }

  public static of(user: User, newIdentifier: number): UserEntity {
    const entity = new UserEntity();
    entity.userIdentifier = newIdentifier;
    entity.name = user.name;
    entity.createdAt = user.createdAt;
    return entity;
  }
}
