import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
   // allowedHeaders: ['content-type'],
   origin: 'http://localhost:3000',
   credentials: true,
  })
  // somewhere in your initialization file
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Docs Rest API')
    .setVersion('1.0.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
