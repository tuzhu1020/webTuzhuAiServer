import { DanmakuModel } from '../models/danmaku.model';

export async function addDanmaku(videoId: string, payload: {
  userId: string;
  content: string;
  color?: string;
  fontSize?: number;
  mode?: 'scroll' | 'top' | 'bottom';
  time: number;
}) {
  const doc = await DanmakuModel.create({
    videoId,
    userId: payload.userId,
    content: payload.content,
    color: payload.color || '#ffffff',
    fontSize: payload.fontSize || 24,
    mode: payload.mode || 'scroll',
    time: payload.time,
  });
  return doc;
}

export async function getDanmakus(videoId: string, from = 0, to = 60) {
  return DanmakuModel.find({ videoId, time: { $gte: from, $lte: to } })
    .sort({ time: 1 })
    .limit(2000)
    .lean();
}
