import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exceptions/httpExceptionFilter';
import { LogsInterceptor } from './core/interseptors/loging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable swagger
  const config = new DocumentBuilder()
    .setTitle('nest-test-app')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer('api/v1')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // global prefix
  app.setGlobalPrefix('api/v1');
  // all exceptions handling
  app.useGlobalFilters(new HttpExceptionFilter());
  // all req res intersept and log
  app.useGlobalInterceptors(new LogsInterceptor());
  // enable DTO validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
