import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class NotFoundArticleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data === null || data === undefined) {
          throw new NotFoundException('资源不存在');
        }
        return data;
      }),
    );
  }

}