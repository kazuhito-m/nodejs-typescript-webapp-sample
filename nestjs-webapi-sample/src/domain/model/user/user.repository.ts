import User from './user';

export default interface UserRepository {
  all(): Promise<User[]>;
  get(identifier: number): Promise<User>;
  register(user: User): Promise<User>;
}
