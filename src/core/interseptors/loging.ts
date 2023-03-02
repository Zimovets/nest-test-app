// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { tap } from 'rxjs';

// @Injectable()
// export class LogsInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler) {
//     const req = context.switchToHttp().getRequest();
//     const { statusCode } = context.switchToHttp().getResponse();
//     const { originalUrl, method, params, query, body } = req;

//     return next.handle().pipe(
//       tap((data) => {
//         console.log({
//           originalUrl,
//           method,
//           params,
//           query,
//           body,
//         });
//         console.log({
//           statusCode,
//           data,
//         });
//       }),
//     );
//   }
// }

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
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
      reqTime,
    };

    return next.handle().pipe(
      catchError(async (err) => console.log({ requestInfo }, err)),
      tap((data) => {
        const resTime = Date.now();
        console.log({
          requestInfo,
          responseInfo: {
            statusCode,
            resTime,
            data: data.dataValues,
            duration: `${resTime - reqTime}msc`,
          },
        });
      }),
    );
  }
}
