import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Log4jsAdapterService from './Log4jsAdapterService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Log4jsAdapterService(),
  });
  await app.listen(3000);
}
bootstrap();
