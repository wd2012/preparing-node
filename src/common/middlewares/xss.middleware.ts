import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JSDOM } from 'jsdom';
import * as purify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = purify(window);

// jsdom 创建一个模拟的浏览器环境。
// DOMPurify 在这个环境中执行，清洗用户输入的 HTML，以去除潜在的 XSS 攻击。

@Injectable()
export class XssMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 过滤请求体
    req.body = this.sanitize(req.body);

    // 过滤查询参数
    req.query = this.sanitize(req.query);

    // 过滤路径参数
    req.params = this.sanitize(req.params);

    next();
  }

  private sanitize(data: any): any {
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data);
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = this.sanitize(data[key]);
        }
      }
    }
    return data;
  }
}
