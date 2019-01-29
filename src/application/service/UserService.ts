import Users from "../../domain/user/Users";
import UserRepository from "../../domain/user/UserRepository";

export default class UserService {
    constructor(private readonly repository : UserRepository) {
    }

    public all(): Promise<Users> {
        return this.repository.all();
    }
}