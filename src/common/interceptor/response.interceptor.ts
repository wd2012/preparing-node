import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { ISuccessResponse, BasicTypes } from '@/types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ISuccessResponse<BasicTypes>> {
    return next.handle().pipe(
      map((data: ISuccessResponse<BasicTypes> | null) => {
        return {
          code: data?.code || HttpStatus.OK,
          data: data?.data || undefined,
          message: data?.message || 'Success', // 使用自定义 message
        };
      }),
    );
  }
}
