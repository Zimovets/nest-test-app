import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    const reqTime = Date.now();
    const requestInfo = {
      originalUrl,
      method,
      params,
      query,
      body,
    };

    return next.handle().pipe(
      tap((data) => {
        const resTime = Date.now();
        this.logger.log({
          requestInfo,
          responseInfo: {
            statusCode,
            data,
            duration: `${resTime - reqTime}msc`,
          },
        });
      }),
    );
  }
}
