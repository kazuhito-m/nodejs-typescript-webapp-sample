import { inject } from 'inversify';
import {BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam} from 'inversify-express-utils';
import { interfaces } from 'inversify-express-utils';
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

  @httpGet('/:userIdentifier')
  public async getUser(
    @requestParam('userIdentifier') userIdentifier: number,
  ): Promise<interfaces.IHttpActionResult> {
    try {
      const user: User = await this.service.get(userIdentifier);
      return this.json(user, 200);
    } catch (e) {
      console.error(e.message);
      return this.internalServerError(e);
    }
  }

  @httpPost('/')
  public async createUser(@requestBody() body: any): Promise<interfaces.IHttpActionResult> {
    const user = User.prototypeOf(body.name);
    const createdUser = await this.service.register(user);
    return this.json(createdUser, 201);
  }
}
