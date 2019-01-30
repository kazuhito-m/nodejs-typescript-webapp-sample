import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import Parameters from './infrastracture/datasource/config/Parameters';
import DIContainerBuilder from './DIContainerBuilder';

export default class WebApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();

    const builder = new DIContainerBuilder(settings);
    const container = builder.build();

    const rootConfig = { rootPath: '/api/v1' };
    const server = new InversifyExpressServer(container, null, rootConfig);
    server.setConfig(app => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
    });

    const app = server.build();
    app.listen(settings.port, () => {
      console.log('Node.js & Express is listening to Port:' + settings.port);
    });
  }
}
