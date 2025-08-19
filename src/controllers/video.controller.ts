import { Request, Response, NextFunction } from 'express';
import * as videoService from '../services/video.service';

export async function createVideo(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const userId = (req as any).user?.id; // 来自 auth 中间件
    const doc = await videoService.createVideo({
      title: body.title,
      description: body.description,
      tags: body.tags || [],
      coverUrl: body.coverUrl,
      videoUrl: body.videoUrl,
      duration: body.duration || 0,
      authorId: userId,
    } as any);
    res.json({ code: '200', data: doc, message: '成功' });
  } catch (e) { next(e); }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await videoService.getVideoById(req.params.id);
    res.json({ code: '200', data: doc, message: '成功' });
  } catch (e) { next(e); }
}

export async function getHot(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 20);
    const data = await videoService.hotVideos(page, size);
    res.json({ code: '200', data, message: '成功' });
  } catch (e) { next(e); }
}

export async function getRecommend(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 20);
    const data = await videoService.recommendVideos(page, size);
    res.json({ code: '200', data, message: '成功' });
  } catch (e) { next(e); }
}

export async function incView(req: Request, res: Response, next: NextFunction) {
  try {
    await videoService.incView(req.params.id);
    res.json({ code: '200', data: true, message: '成功' });
  } catch (e) { next(e); }
}
