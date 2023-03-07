import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exceptions/httpExceptionFilter';
import { LogsInterceptor } from './core/interseptors/loging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
