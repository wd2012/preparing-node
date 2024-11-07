import { Controller, Get } from '@nestjs/common';

import { TestService } from '@/modules/test/test.service';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get('/')
  async sayHello() {
    return await this.testService.testText();
  }
}
