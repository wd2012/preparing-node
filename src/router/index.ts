import { Routes } from '@nestjs/core';

import { RoutePrefixModule } from '@/modules/route-prefix/route-prefix.module';

/** 带api前缀的路由数组 */
export const AppAPIRoutes: Routes = [
  {
    // TODO: 后续该路径名需要改一下
    path: 'api',
    module: RoutePrefixModule,
    children: [],
  },
];
