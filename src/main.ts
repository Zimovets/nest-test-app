import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exceptions/allExceptionsFilter';
import { LogsInterceptor } from './core/interseptors/loging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  app.setGlobalPrefix('api/v1');
  // all exceptions handling
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  app.useGlobalInterceptors(new LogsInterceptor());

  await app.listen(3000);
}
bootstrap();
