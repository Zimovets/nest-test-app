import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseInfo = this.getResponseInfo(exception, request, status);

    this.logger.error({
      requestInfo: this.getRequestInfo(ctx),
      responseInfo: {
        ...responseInfo,
        stack: exception.stack,
      },
    });
    response.status(status).json(responseInfo);
  }

  getRequestInfo(context) {
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

  getResponseInfo(exception, request, status) {
    return {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        (exception['response'] && exception['response'].message) ||
        exception['response'],
    };
  }
}
