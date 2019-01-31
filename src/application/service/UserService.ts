import { inject, injectable } from 'inversify';
import User from '../../domain/user/User';
import UserRepository from '../../domain/user/UserRepository';
import Users from '../../domain/user/Users';

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository') private readonly repository: UserRepository,
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
