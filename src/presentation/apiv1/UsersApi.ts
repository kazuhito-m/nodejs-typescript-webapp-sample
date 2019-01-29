import { Request, Response, NextFunction } from "express";
import Api from "../Api";
import HttpMethod from "../HttpMethod";
import UserService from "../../application/service/UserService";

/**
 * このシステムのユーザ群を返すAPI。
 */
export default class UsersApi implements Api {
    constructor(private readonly service: UserService) { }

    public get uri() {
        return '/users';
    }

    public get method() {
        return HttpMethod.Get;
    }

    public execute(req: Request, res: Response, next: NextFunction): any {
        const users = this.service.all();
        res.json(users.list());
    }
}
