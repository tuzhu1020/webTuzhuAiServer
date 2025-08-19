import { Request, Response, NextFunction } from 'express';
import * as danmakuService from '../services/danmaku.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { videoId } = req.params as any;
    const from = Number(req.query.from || 0);
    const to = Number(req.query.to || from + 60);
    const items = await danmakuService.getDanmakus(videoId, from, to);
    res.json({ code: '200', data: { items }, message: '成功' });
  } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { videoId } = req.params as any;
    const userId = (req as any).user?.id;
    const { content, color, fontSize, mode, time } = req.body;
    const doc = await danmakuService.addDanmaku(videoId, { userId, content, color, fontSize, mode, time });
    res.json({ code: '200', data: doc, message: '成功' });
  } catch (e) { next(e); }
}
