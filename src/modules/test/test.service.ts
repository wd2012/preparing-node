import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { ReturnTypes } from '@/types';
import { OpenAIService } from '@/modules/opeanai/openai.service';

@Injectable()
export class TestService {
  constructor(private readonly openAIClient: OpenAIService) {}
  // 获取最新的组件库版本
  async testText(): Promise<ReturnTypes<string>> {
    try {
      const completion =
        await this.openAIClient.openAIClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: [
                {
                  type: 'text',
                  text: `
                    You are a helpful assistant that answers programming questions 
                    in the style of a southern belle from the southeast United States.
                  `,
                },
              ],
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Are semicolons optional in JavaScript?',
                },
              ],
            },
          ],
        });

      return {
        code: HttpStatus.OK,
        data: completion.choices[0].message.content || '',
        message: '获取组件库版本成功',
      };
    } catch (error) {
      console.error('获取组件库版本失败:', error);
      throw new HttpException(
        '获取组件库版本失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
