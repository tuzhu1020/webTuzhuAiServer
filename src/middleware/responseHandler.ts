import { Request, Response, NextFunction } from 'express';

/**
 * 统一响应处理中间件
 * 规范响应格式为：
 * {
 *   code: '200' | 错误代码,
 *   data: 成功数据 | null,
 *   message: '成功' | 错误信息
 * }
 */
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  // 保存原始的res.json方法
  const originalJson = res.json;
  const originalStatus = res.status;

  // 重写status方法
  res.status = function (code: number) {
    const statusCode = code;
    return originalStatus.call(this, code);
  };

  // 重写json方法，统一响应格式
  res.json = function (data: any) {
    let statusCode = res.statusCode || 200;

    // 处理已经格式化的响应情况
    // 情况1: 标准格式 {code, data, message}
    if (data && data.code !== undefined && data.data !== undefined && data.message !== undefined) {
      return originalJson.call(this, data);
    }

    // 情况2: 控制器旧格式 {status, code, data}
    if (data && data.status !== undefined && data.code !== undefined && data.data !== undefined) {
      // 转换为标准格式
      const standardResponse = {
        code: data.code,
        data: data.data,
        message: data.status === 'success' ? '成功' : data.message || '请求失败',
      };
      return originalJson.call(this, standardResponse);
    }

    // 构造统一响应格式
    const responseBody = {
      code: statusCode >= 200 && statusCode < 300 ? '200' : String(statusCode),
      data: statusCode >= 200 && statusCode < 300 ? data : null,
      message: statusCode >= 200 && statusCode < 300 ? '成功' : data?.message || '请求失败',
    };

    return originalJson.call(this, responseBody);
  };

  next();
};
