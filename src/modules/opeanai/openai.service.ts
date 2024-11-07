import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  openAIClient: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAIClient = new OpenAI({
      apiKey: this.configService.get('config.OPENAI_API_KEY'), // 从环境变量中获取 API 密钥
      baseURL: 'https://api.chatanywhere.tech/v1',
    });
  }
}
