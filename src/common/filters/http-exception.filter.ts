import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { IErrorResponse } from '@/types';
import { LoggerService } from '@/modules/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger?: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this?.logger?.error(
      `系统错误 =====> ${exception.message}`,
      exception?.stack || '',
    );
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    const errorResponse: IErrorResponse = {
      code: status,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || 'Error',
      error: typeof message === 'string' ? null : (message as any).error,
    };
    response.status(status).json(errorResponse);
  }
}
