// config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  server: {
    port: process.env.PORT || 3000, // 设置默认值
    nodeServiceName: process.env.NODE_SERVICE_NAME,
    nacosAddress: process.env.NACOS_ADDRESS,
    nacosAccountName: process.env.NACOS_ACCOUNT_NAME,
    nacosAccountPassword: process.env.NACOS_ACCOUNT_PASSWORD,
    nacosEndpoint: process.env.NACOS_ENDPOINT,
    nacosNameSpace: process.env.NACOS_NAMESPACE,
    ossMaterialsUrl: process.env.OSS_MATERIALS_URL,
  },
  cors: {
    cors_origin: process.env.CORS_ORIGIN,
  },
}));
