import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import DIContainerBuilder from './DIContainerBuilder';
import Settings from './domain/config/Settings';

export default class WebApplication {
  private container: Container;

  constructor(private readonly settings: Settings) {}

  public run(): void {
    const application = this.buildExpressApplication();

    application.listen(this.settings.port, () => {
      console.log('Express is listening to Port:' + this.settings.port);
    });
  }

  public buildExpressApplication(): Application {
    const builder = new DIContainerBuilder(this.settings);
    this.container = builder.build();

    const rootConfig = { rootPath: '/api/v1' };
    const server = new InversifyExpressServer(this.container, null, rootConfig);

    server.setConfig(app => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
    });

    return server.build();
  }

  public close(): void {
    const builder = new DIContainerBuilder(this.settings);
    builder.end(this.container);
  }
}
