import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { firstValueFrom } from 'rxjs';

//  暂时无用了

@Injectable()
export class CustomHttpService {
  constructor(private readonly httpService: HttpService) {}

  // 根据需要设置代理
  private createProxyAgent(useProxy: boolean) {
    if (useProxy) {
      return new HttpsProxyAgent('http://localhost:3001');
    }
    return null;
  }

  // 统一处理 OpenAI 请求头和代理配置
  private createRequestConfig(
    useProxy: boolean,
    headers: any,
  ): AxiosRequestConfig {
    const proxyAgent = this.createProxyAgent(useProxy);
    return {
      headers,
      httpsAgent: proxyAgent,
      timeout: 10000, // 设置超时
    };
  }

  // 设置 OpenAI 请求头
  private getOpenAIHeaders(): any {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 从环境变量中获取 OpenAI API Key
    };
  }

  // 封装 GET 请求
  async get(url: string, useProxy: boolean = false) {
    const headers = this.getOpenAIHeaders();
    const config = this.createRequestConfig(useProxy, headers);
    try {
      const response = await firstValueFrom(this.httpService.get(url, config));
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error.message);
      throw error;
    }
  }

  // 封装 POST 请求
  async post(url: string, data: any, useProxy: boolean = false) {
    const headers = this.getOpenAIHeaders();
    const config = this.createRequestConfig(useProxy, headers);
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, config),
      );
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error.message);
      throw error;
    }
  }
}
