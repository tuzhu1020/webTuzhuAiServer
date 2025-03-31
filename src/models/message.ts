import { Schema, model } from 'mongoose';

// 定义消息模型的接口
export interface IMessage {
  id: number;
  conversationId: number;
  content: string;
  role: string;
  userId: string;
  attachmentId?: number;
  hideType?: number;
  deleted: number;
  createdAt: Date;
  updatedAt: Date;
}

// 定义消息的Schema
const messageSchema = new Schema<IMessage>(
  {
    id: { type: Number, required: true, unique: true },
    conversationId: { type: Number, required: true },
    content: { type: String, required: true },
    role: { type: String, required: true },
    userId: { type: String, required: true },
    attachmentId: { type: Number },
    hideType: { type: Number, default: 0 },
    deleted: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // 自动管理 createdAt 和 updatedAt
  }
);

// 创建并导出消息模型
export const Message = model<IMessage>('Message', messageSchema);
