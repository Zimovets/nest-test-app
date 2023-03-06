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

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception['response'].message || exception['message'],
    };
    this.logger.error({
      requestInfo: this.getReqData(ctx),
      exceptionInfo: responseBody,
    });
    httpAdapter.reply(res, responseBody, httpStatus);
  }

  getReqData(context) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method, params, query, body } = req;

    const reqTime = Date.now();
    return {
      originalUrl,
      method,
      params,
      query,
      body,
      reqTime,
    };
  }
}
