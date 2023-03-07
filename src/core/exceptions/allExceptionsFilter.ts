import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus();

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message:
        (exception['response'] && exception['response'].message) ||
        exception['response'],
    };
    this.logger.error({
      requestInfo: this.getReqData(ctx),
      exceptionInfo: { responseBody, stack: exception['stack'] },
    });
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  getReqData(context) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method, params, query, body } = req;

    return {
      originalUrl,
      method,
      params,
      query,
      body,
    };
  }
}
