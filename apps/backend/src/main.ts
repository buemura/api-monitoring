import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@infra/app.module';

function setupMiddlewares(app: INestApplication) {
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
  });

  const config = new DocumentBuilder()
    .setTitle('API Monitoring Service')
    .setDescription(
      'An APIs Monitoring service that will check the health of your API based on check rate you define',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupMiddlewares(app);

  await app.startAllMicroservices();
  await app.listen(8080);
}

bootstrap().then(() => console.log('Backend Running on port 8080...'));
