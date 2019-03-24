import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Log4jsAdapterService from './application/logadapter/Log4jsAdapterService';
import { INestApplication } from '@nestjs/common';
import * as Log4js from 'log4js/lib/log4js';

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
