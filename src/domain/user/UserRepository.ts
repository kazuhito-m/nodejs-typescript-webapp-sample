import User from './User';
import Users from './Users';

export default interface UserRepository {
    all(): Promise<Users>;
    register(user: User): Promise<User>;
    get(userIdentifier: number): Promise<User>;
}
