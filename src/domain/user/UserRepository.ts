import Users from "./Users";
import User from './User';

export default interface UserRepository {
    all(): Promise<Users>;
    register(user: User): Promise<User>;
    get(userIdentifier: number): Promise<User>;
}