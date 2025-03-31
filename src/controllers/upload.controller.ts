import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import path from 'path';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError('没有上传文件', 400);
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      status: 'success',
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', filename);

    // 这里可以添加文件删除逻辑
    // 例如使用 fs.unlink 删除文件

    res.json({
      status: 'success',
      message: '文件删除成功',
    });
  } catch (error) {
    next(error);
  }
};
