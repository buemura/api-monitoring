import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
