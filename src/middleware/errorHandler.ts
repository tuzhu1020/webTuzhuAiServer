import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(err.statusCode).json({
      code: String(err.statusCode),
      data: null,
      message: err.message,
    });
  }

  logger.error(`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  return res.status(500).json({
    code: '500',
    data: null,
    message: '服务器内部错误',
  });
};
