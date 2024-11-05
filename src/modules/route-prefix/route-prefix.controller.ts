import { Controller, Get } from '@nestjs/common';

@Controller()
export class RoutePrefixController {
  @Get('/')
  sayHello() {
    return `Hello From RoutePrefixController`;
  }
}
