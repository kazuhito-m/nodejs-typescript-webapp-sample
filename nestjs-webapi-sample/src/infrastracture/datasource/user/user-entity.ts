import 'reflect-metadata';
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import User from '../../../domain/model/user/user';
import { Moment } from 'moment';

@Entity('sample_user.users')
export class UserEntity {
  @PrimaryColumn()
  user_identifier: number;
  @Column()
  name: string;
  @CreateDateColumn()
  created_at: Moment;

  public toDomain(): User {
    return new User(
        this.user_identifier,
        this.name,
        this.created_at,
        );
  }

  public static of(user: User, newIdentifier: number): UserEntity {
    const entity = new UserEntity();
    entity.user_identifier = newIdentifier;
    entity.name = user.name;
    entity.created_at = user.createdAt;
    return entity;
  }
}
