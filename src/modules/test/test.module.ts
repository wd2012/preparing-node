import { Module } from '@nestjs/common';

import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService], // 如果需要在其他模块中使用
})
export class TestModule {}
