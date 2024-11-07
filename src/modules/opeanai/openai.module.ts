// logger/logger.module.ts
import { Global, Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Global() // 声明为全局模块
@Module({
  providers: [OpenAIService],
  exports: [OpenAIService], // 导出 LoggerService，以便其他模块使用
})
export class OpenAIModule {}
