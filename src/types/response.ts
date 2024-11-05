export interface ISuccessResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface IErrorResponse {
  code: number;
  message: string;
  error?: any;
}

/**
 * @description 响应基本类型
 */
export type BasicTypes = string | number | boolean | null | undefined | object;

// 自定义错误类型
export type CusError = Error & IErrorResponse;

// 响应结果类型
export type RespType<T> = [CusError | null, ISuccessResponse<T> | null];

export type ReturnTypes<T> = ISuccessResponse<T> | IErrorResponse;
