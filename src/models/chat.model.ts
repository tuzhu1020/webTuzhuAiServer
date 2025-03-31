import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

// 创建索引
chatSchema.index({ userId: 1, createdAt: -1 });

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
