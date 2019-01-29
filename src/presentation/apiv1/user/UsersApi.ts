import { Request, Response, NextFunction } from "express";
import { injectable, inject } from 'inversify';
import Api from "../../Api";
import HttpMethod from "../../HttpMethod";
import UserService from "../../../application/service/UserService";

/**
 * このシステムのユーザ群を返すAPI。
 */
@injectable()
 export default class UsersApi implements Api {
    constructor(@inject('UserService') private readonly service: UserService) { }

    public get uri() {
        return '/users';
    }

    public get method() {
        return HttpMethod.Get;
    }

    public async execute(req: Request, res: Response, next: NextFunction): Promise<any> {
        const users = await this.service.all();
        res.json(users.list());
    }
}
