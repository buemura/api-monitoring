import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

function setupMiddlewares(app: INestApplication) {
  app.enableCors();
  app.setGlobalPrefix('api');

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupMiddlewares(app);

  const config = new DocumentBuilder()
    .setTitle('API Monitoring Service')
    .setDescription(
      'An APIs Monitoring service that will check the health of your API based on check rate you define',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(8080);
}

bootstrap();
