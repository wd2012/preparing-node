import { Module } from '@nestjs/common';
import { RoutePrefixController } from './route-prefix.controller';

@Module({
  controllers: [RoutePrefixController],
})
export class RoutePrefixModule {}
