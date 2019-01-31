import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import DIContainerBuilder from './DIContainerBuilder';
import Parameters from './infrastracture/datasource/config/Parameters';

export default class WebApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();

    const builder = new DIContainerBuilder(settings);
    const container = builder.build();

    const rootConfig = { rootPath: '/api/v1' };
    const server = new InversifyExpressServer(container, null, rootConfig);
    server.setConfig((app) => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
    });

    const application = server.build();
    application.listen(settings.port, () => {
      console.log('Node.js & Express is listening to Port:' + settings.port);
    });
  }
}
