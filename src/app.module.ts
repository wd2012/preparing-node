import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { XssMiddleware } from '@/common/middlewares/xss.middleware';
import { NotFoundFilter } from '@/common/filters/not-found.filter';
import { RoutePrefixModule } from '@/modules/route-prefix/route-prefix.module';
import { AppAPIRoutes } from '@/router';
import { TestModule } from '@/modules/test/test.module';
import { OpenAIModule } from '@/modules/opeanai/openai.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [config], // 加载配置
      isGlobal: true, // 使配置模块在全局可用，配置后不再需要在其他模块手动导入依赖
    }),
    OpenAIModule,
    RoutePrefixModule,
    TestModule,
    // 注册路由
    RouterModule.register(AppAPIRoutes),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 仅在生产环境中使用 Helmet
    if (process.env['NODE_ENV'] === 'prod') {
      consumer.apply(HelmetMiddleware).forRoutes('*');
    }
    // express.json() 和 express.urlencoded() 的功能已经由 NestJS 内部处理
    consumer.apply(XssMiddleware).forRoutes('*'); // 应用到所有路由或指定路由
  }
}
