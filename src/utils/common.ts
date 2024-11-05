type AsyncResult<T, U = Error> = [U | null, T | null];

export const asyncHandler = async <T, U = Error>(
  promise: Promise<T>,
): Promise<AsyncResult<T, U>> => {
  try {
    const data: T = await promise;
    return [null, data]; // 成功时返回
  } catch (err) {
    return [err as U, null]; // 失败时返回
  }
};

/**
 * @description 校验传入的参数是否是一个对象
 */
export const isObject = (value: AnyObject) => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const isArray = (value: AnyObject) => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.prototype.toString.call(value) === '[object Array]';
};

export const isString = (value: AnyObject) => {
  return typeof value === 'string';
};
