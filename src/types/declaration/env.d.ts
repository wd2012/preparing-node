declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly PORT: string;
    readonly CORS_ORIGIN: string;
    readonly NODE_SERVICE_NAME: string;
    readonly NACOS_ADDRESS: string;
    readonly NACOS_ACCOUNT_NAME: string;
    readonly NACOS_ACCOUNT_PASSWORD: string;
    readonly NACOS_ENDPOINT: string;
    readonly NACOS_NAMESPACE: string;
    readonly OSS_MATERIALS_URL: string;
    readonly OPENAI_API_KEY: string;
  }
}
