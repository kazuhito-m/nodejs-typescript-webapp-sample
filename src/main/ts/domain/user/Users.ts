import User from "./User";

export default class Users {
    constructor(private readonly values: User[]) {
    }

    public list(): User[] {
        return this.values;
    }
}