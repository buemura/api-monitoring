import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Monitoring Service')
    .setDescription(
      'An APIs Monitoring service that will check the health of your API based on check rate you define',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(8080);
}
bootstrap();
