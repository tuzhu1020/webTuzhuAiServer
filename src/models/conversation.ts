import { Schema, model } from 'mongoose';

// 定义会话模型的接口
export interface IConversation {
  id: number;
  title: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  deleted: number;
  attachmentId?: number;
  hideType?: number;
}

// 定义会话的Schema
const conversationSchema = new Schema<IConversation>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    lastMessage: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    deleted: { type: Number, default: 0 },
    attachmentId: { type: Number },
    hideType: { type: Number, default: 0 },
  },
  {
    timestamps: true, // 自动管理 createdAt 和 updatedAt
  }
);

// 创建并导出会话模型
export const Conversation = model<IConversation>('Conversation', conversationSchema);
