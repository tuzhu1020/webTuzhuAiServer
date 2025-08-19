import { FilterQuery } from 'mongoose';
import { VideoModel, IVideo } from '../models/video.model';

export async function createVideo(payload: Partial<IVideo>) {
  const doc = await VideoModel.create(payload);
  return doc;
}

export async function getVideoById(id: string) {
  return VideoModel.findById(id).lean();
}

export async function listVideos(filter: FilterQuery<IVideo>, page = 1, size = 20, sort: any = { createdAt: -1 }) {
  const skip = (page - 1) * size;
  const [items, total] = await Promise.all([
    VideoModel.find(filter).sort(sort).skip(skip).limit(size).lean(),
    VideoModel.countDocuments(filter),
  ]);
  return { items, total, page, size };
}

export async function incView(id: string) {
  await VideoModel.updateOne({ _id: id }, { $inc: { 'stats.views': 1 } });
}

export async function hotVideos(page = 1, size = 20) {
  // 简单按总 views 排序（可扩展为近7天窗口加权）
  return listVideos({}, page, size, { 'stats.views': -1, createdAt: -1 });
}

export async function recommendVideos(page = 1, size = 20) {
  // 简单按时间+少量随机（这里用时间排序示意）
  return listVideos({}, page, size, { createdAt: -1 });
}
