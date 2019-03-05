import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { IUser } from '../../../domain/model/user/user.interface';

@Entity('sample_user.users')
export class UserEntity implements IUser {
  @PrimaryColumn({ name: 'user_identifier' })
  userIdentifier: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
