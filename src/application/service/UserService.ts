import Users from "../../domain/user/Users";
import UserRepository from "../../domain/user/UserRepository";
import User from '../../domain/user/User';

export default class UserService {
    constructor(private readonly repository : UserRepository) {
    }

    public all(): Promise<Users> {
        return this.repository.all();
    }

    public register(user: User): Promise<User> {
        return this.repository.register(user);
    }
}