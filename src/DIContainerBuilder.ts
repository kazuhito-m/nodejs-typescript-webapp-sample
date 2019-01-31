import { Container } from 'inversify';
import { Pool } from 'pg';
import UserService from './application/service/UserService';
import Settings from './domain/config/Settings';
import UserRepository from './domain/user/UserRepository';
import UserDatasource from './infrastracture/datasource/user/UserDatasource';

// DI auto register controllers.
import './presentation/apiv1/photo/PhotoListController';
import './presentation/apiv1/user/UserController';

export default class DIContainerBuilder {
  constructor(private readonly settings: Settings) {}

  public build(): Container {
    const container = new Container();
    this.define(container);
    return container;
  }

  private define(container: Container): void {
    container.bind<Settings>('Settings').toConstantValue(this.settings);
    container.bind<Pool>('DbPool').toConstantValue(this.createConnectedDbPool());

    container.bind<UserRepository>('UserRepository').to(UserDatasource);
    container.bind<UserService>('UserService').to(UserService);
  }

  private createConnectedDbPool(): Pool {
    const dbSetting = this.settings.pg;
    const pool = new Pool(dbSetting);
    pool.connect();
    return pool;
  }
}
