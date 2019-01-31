import {
  controller,
  httpGet,
  BaseHttpController,
  requestParam
} from 'inversify-express-utils';
import { inject } from 'inversify';
import UserService from '../../../application/service/UserService';
import User from '../../../domain/user/User';

@controller('/users')
export default class UserController extends BaseHttpController {
  constructor(@inject('UserService') private readonly service: UserService) {
    super();
  }

  @httpGet('/')
  public async getUsers() {
    const users = await this.service.all();
    return this.json(users.list(), 200);
  }
}
