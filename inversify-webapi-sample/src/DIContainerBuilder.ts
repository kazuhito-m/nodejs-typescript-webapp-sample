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

  public end(container: Container): void {
    container.get<Pool>('DbPool').end();
  }

  private define(container: Container): void {
    container.bind<Settings>('Settings').toConstantValue(this.settings);
    container.bind<Pool>('DbPool').toConstantValue(new Pool(this.settings.pg));

    container.bind<UserRepository>('UserRepository').to(UserDatasource);
    container.bind<UserService>('UserService').to(UserService);
  }
}
