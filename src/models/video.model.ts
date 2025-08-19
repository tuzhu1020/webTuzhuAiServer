import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description?: string;
  tags: string[];
  coverUrl: string;
  videoUrl: string;
  authorId: Types.ObjectId;
  duration?: number; // seconds
  stats: {
    views: number;
    likes: number;
    danmakuCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    tags: { type: [String], default: [] },
    coverUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    duration: { type: Number, default: 0 },
    stats: {
      views: { type: Number, default: 0, index: true },
      likes: { type: Number, default: 0 },
      danmakuCount: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

VideoSchema.index({ createdAt: -1 });
VideoSchema.index({ 'stats.views': -1 });
VideoSchema.index({ tags: 1 });

export const VideoModel = mongoose.model<IVideo>('Video', VideoSchema);
