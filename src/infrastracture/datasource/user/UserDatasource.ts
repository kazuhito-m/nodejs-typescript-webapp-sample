import UserRepository from "../../../domain/user/UserRepository";
import Users from "../../../domain/user/Users";
import User from "../../../domain/user/User";
import * as moment from 'moment';

export default class UserDatasource implements UserRepository {
    public all(): Users {
        // TODO データベースとの接続・取得実装。
        const items: User[] = [
            new User(1, '三浦 一仁', moment()),
            new User(2, 'ふなっしー', moment()),
        ];
        return new Users(items);
    }
}