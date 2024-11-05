import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/')
  getIndex(@Res() res: Response) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  }
}
