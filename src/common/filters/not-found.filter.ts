import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404);

    if (response.req.accepts('html')) {
      response.sendFile(path.join(process.cwd(), 'public', '404.html'));
    } else if (response.req.accepts('json')) {
      response.json({ error: '404 Not Found' });
    } else {
      response.type('txt').send('404 Not Found');
    }
  }
}
