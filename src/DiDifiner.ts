import { Container } from 'inversify';
import { Client } from 'pg';
import UserDatasource from './infrastracture/datasource/user/UserDatasource';
import UserRepository from './domain/user/UserRepository';
import Settings from './domain/config/Settings';
import UserService from './application/service/UserService';
import UserAddApi from './presentation/apiv1/user/UserAddApi';
import UserApi from './presentation/apiv1/user/UserApi';
import UsersApi from './presentation/apiv1/user/UsersApi';
import ApiV1RouterWrapper from './presentation/apiv1/ApiV1RouterWrapper';

export default class DiDifiner {
  constructor(private readonly settings: Settings) {}

  public build(): Container {
    const container = new Container();
    this.define(container);
    return container;
  }

  private define(container: Container): void {
    container.bind<Settings>('Settings').toConstantValue(this.settings);
    container.bind<Client>('DbClient').toConstantValue(this.createConnectedDbClient());

    container.bind<UserRepository>('UserRepository').to(UserDatasource);
    container.bind<UserService>('UserService').to(UserService);

    container.bind<UserAddApi>('UserAddApi').to(UserAddApi);
    container.bind<UserApi>('UserApi').to(UserApi);
    container.bind<UsersApi>('UsersApi').to(UsersApi);

    container.bind<ApiV1RouterWrapper>('ApiV1RouterWrapper').to(ApiV1RouterWrapper);
  }

  private createConnectedDbClient(): Client {
    const db = this.settings.pg;
    const client = new Client(db);
    client.connect();
    return client;
  }
}
