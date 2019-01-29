import { Client } from 'pg';
import * as moment from 'moment';
import UserRepository from "../../../domain/user/UserRepository";
import Users from "../../../domain/user/Users";
import User from "../../../domain/user/User";


export default class UserDatasource implements UserRepository {
    constructor(private readonly pgClient: Client) {
    }

    public async all(): Promise<Users> {
        const sql = 'SELECT * FROM sample_user.users';
        const { rows } = await this.pgClient.query(sql,[]);
        const items = rows.map(row => new User(
            row.user_identifier,
            row.name,
            moment(row.created_at)
        ));
        return new Users(items);
    }
}