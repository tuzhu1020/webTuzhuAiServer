import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// 邮件发送配置
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 生成重置密码令牌
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// 发送重置密码邮件
const sendResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: '重置密码',
    html: `
      <h1>重置密码请求</h1>
      <p>请点击下面的链接重置密码：</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>此链接将在1小时后失效。</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new AppError('用户名或邮箱已存在', 400);
    }

    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7 * 24 * 60 * 60,
    });

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      throw new AppError('用户名或密码错误', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('用户名或密码错误', 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 7 * 24 * 60 * 60,
    });

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError('用户不存在', 404);
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError('当前密码错误', 401);
    }

    user.password = newPassword;
    await user.save();

    res.json({
      status: 'success',
      message: '密码修改成功',
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('用户不存在', 404);
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1小时后过期

    await user.save();
    await sendResetEmail(email, resetToken);

    res.json({
      status: 'success',
      message: '重置密码邮件已发送',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('重置密码链接无效或已过期', 400);
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      status: 'success',
      message: '密码重置成功',
    });
  } catch (error) {
    next(error);
  }
};
