import Users from '../../domain/user/Users';
import UserRepository from '../../domain/user/UserRepository';
import User from '../../domain/user/User';
import { inject, injectable } from 'inversify';

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository') private readonly repository: UserRepository
  ) {}

  public all(): Promise<Users> {
    return this.repository.all();
  }

  public register(user: User): Promise<User> {
    return this.repository.register(user);
  }

  public get(userIdentifier: number): Promise<User> {
    return this.repository.get(userIdentifier);
  }
}
