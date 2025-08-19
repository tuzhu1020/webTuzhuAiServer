import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDanmaku extends Document {
  videoId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  color: string; // hex color
  fontSize: number; // px
  mode: 'scroll' | 'top' | 'bottom';
  time: number; // seconds in video when it appears
  createdAt: Date;
}

const DanmakuSchema = new Schema<IDanmaku>(
  {
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 140 },
    color: { type: String, default: '#ffffff' },
    fontSize: { type: Number, default: 24 },
    mode: { type: String, enum: ['scroll', 'top', 'bottom'], default: 'scroll' },
    time: { type: Number, required: true, index: true },
  },
  { timestamps: true }
);

DanmakuSchema.index({ videoId: 1, time: 1 });

export const DanmakuModel = mongoose.model<IDanmaku>('Danmaku', DanmakuSchema);
