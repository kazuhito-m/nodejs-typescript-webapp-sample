import { Request, Response, NextFunction } from 'express';
import Api from '../Api';
import HttpMethod from '../HttpMethod';
import UserService from '../../application/service/UserService';
import User from '../../domain/user/User';

/**
 * このシステムのユーザを返すAPI。
 */
export default class UserApi implements Api {
  constructor(private readonly service: UserService) {}

  public get uri() {
    return '/users/:userIdentifier';
  }

  public get method() {
    return HttpMethod.Get;
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const userIdentifier: number = req.params.userIdentifier;
      const user: User = await this.service.get(userIdentifier);
      res.json(user);
    } catch (e) {
      console.error(e.message);
      res.status(404);
      next('予期せぬエラーが発生しました。');
    }
  }
}
