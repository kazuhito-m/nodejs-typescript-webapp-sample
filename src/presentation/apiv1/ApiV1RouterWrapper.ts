import { Router } from 'express';
import Api from '../Api';
import PhotoListApi from './PhotoListApi';
import HttpMethod from '../HttpMethod';
import UserService from '../../application/service/UserService';
import UserDatasource from '../../infrastracture/datasource/user/UserDatasource';
import { Client } from 'pg';
import UsersApi from './UsersApi';
import UserAddApi from './UserAddApi';

export default class ApiV1RouterWrapper {
  public get uri(): string {
    return '/api/v1';
  }

  private readonly apis: Api[] = [
    new PhotoListApi(),
    new UsersApi(new UserService(new UserDatasource(this.createPgClient()))), // TODO DIになんとかできないか…
    new UserAddApi(new UserService(new UserDatasource(this.createPgClient())))
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

  private createPgClient(): Client {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'sample',
      user: 'sample_user',
      password: 'sample_password'
    });
    client.connect();
    return client;
  }
}
