import { injectable, inject } from 'inversify';
import { Router } from 'express';
import Api from '../Api';
import PhotoListApi from './PhotoListApi';
import HttpMethod from '../HttpMethod';
import UsersApi from './user/UsersApi';
import UserAddApi from './user/UserAddApi';
import UserApi from './user/UserApi';

@injectable()
export default class ApiV1RouterWrapper {
  constructor(
    @inject('UsersApi') private readonly usersApi: UsersApi,
    @inject('UserAddApi') private readonly userAddApi: UserAddApi,
    @inject('UserApi') private readonly userApi: UserApi
  ) {}

  public get uri(): string {
    return '/api/v1';
  }

  private readonly apis: Api[] = [
    new PhotoListApi(),
    this.usersApi,
    this.userAddApi,
    this.userApi
  ];

  public build(): Router {
    const router = Router();

    this.apis.forEach(api => {
      if (api.method === HttpMethod.Get)
        router.get(api.uri, (req, res, next) => api.execute(req, res, next));
      if (api.method === HttpMethod.Post)
        router.post(api.uri, (req, res, next) => api.execute(req, res, next));
    });

    return router;
  }
}
