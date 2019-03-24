import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Log4jsAdapterService from './Log4jsAdapterService';
import * as Log4js from '../node_modules/log4js/lib/log4js';
import { INestApplication } from '@nestjs/common';

function setLog4jsLoggerToExpress(app: INestApplication) {
  const logger = Log4js.getLogger('access');
  app.use(Log4js.connectLogger(logger, {}));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Log4jsAdapterService(),
  });
  setLog4jsLoggerToExpress(app);
  await app.listen(3000);
}

bootstrap();
