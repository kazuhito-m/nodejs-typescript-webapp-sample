import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { IUser } from './user.interface';

@Entity('sample_user.users')
export class UserEntity implements IUser {
  //   @PrimaryGeneratedColumn('increment', { name: 'user_identifier' })
  @PrimaryColumn({ name: 'user_identifier' })
  @Generated('rowid')
  userIdentifier: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
