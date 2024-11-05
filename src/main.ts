import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ResponseInterceptor } from '@/common/interceptor/response.interceptor';
import { LoggerService } from '@/modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置swagger文档相关
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('系统接口文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // 应用全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 应用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()));
  await app.listen(process.env.PORT ?? 3000);
  const configService = app.get(ConfigService);

  // 设置同源限制
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'), // 使用配置中的 CORS origin
    credentials: true,
  });
}

bootstrap();
