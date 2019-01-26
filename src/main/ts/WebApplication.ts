import * as express from 'express';
import Parameters from "./infrastracture/datasource/config/Parameters";
import ApiV1RouterWrapper from './presentation/apiv1/ApiV1RouterWrapper';
import { AddressInfo } from 'net';

export default class WebApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();

    const app = express();

    const apiV1RouterWrapper = new ApiV1RouterWrapper();
    app.use(apiV1RouterWrapper.uri, apiV1RouterWrapper.build());

    const server = app.listen(settings.port, () => {
      console.log("Node.js & Express is listening to Port:" + (<AddressInfo>server.address()).port);
    });
  }
}
