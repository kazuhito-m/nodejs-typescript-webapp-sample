import { UserEntity } from '../../../infrastracture/datasource/user/user-entity';
export default interface UserRepository {
  all(): Promise<UserEntity[]>;
  get(identifier: number): Promise<UserEntity>;
  register(user: UserEntity): Promise<UserEntity>;
}
