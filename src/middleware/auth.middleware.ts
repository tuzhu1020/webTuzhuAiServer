import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { User } from '../models/user.model';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('未提供认证令牌', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('用户不存在', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('认证失败', 401));
  }
};
