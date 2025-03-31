import { Message, IMessage } from '../models/message';
import { Conversation } from '../models/conversation';

interface CreateMessageDto {
  attachmentId?: number;
  content: string;
  conversationId: number;
  hideType?: number;
  role: string;
  userId: string;
}

interface ConversationDetail {
  list: IMessage[];
  title: string;
}

export class MessageService {
  /**
   * 创建新消息
   */
  async createMessage(data: CreateMessageDto): Promise<IMessage> {
    try {
      // 生成新的消息ID
      const lastMessage = await Message.findOne().sort({ id: -1 });
      const newId = (lastMessage?.id || 0) + 1;

      // 创建新消息
      const message = new Message({
        id: newId,
        conversationId: data.conversationId,
        content: data.content,
        role: data.role,
        userId: data.userId,
        attachmentId: data.attachmentId,
        hideType: data.hideType,
        deleted: 0,
      });

      // 保存消息
      await message.save();

      return message;
    } catch (error) {
      throw new Error('创建消息失败');
    }
  }

  /**
   * 获取会话的消息列表
   */
  async getMessagesByConversationId(conversationId: number): Promise<IMessage[]> {
    try {
      return await Message.find({
        conversationId,
        deleted: 0,
      })
        .sort({ createdAt: 1 })
        .lean();
    } catch (error) {
      throw new Error('获取消息列表失败');
    }
  }

  /**
   * 获取会话详情（包含消息列表和会话标题）
   */
  async getConversationDetail(conversationId: number): Promise<ConversationDetail> {
    try {
      // 获取会话信息
      const conversation = await Conversation.findOne({ id: conversationId, deleted: 0 });
      if (!conversation) {
        throw new Error('会话不存在');
      }

      // 获取消息列表
      const messages = await Message.find({
        conversationId,
        deleted: 0,
      })
        .sort({ createdAt: 1 })
        .lean();

      return {
        list: messages,
        title: conversation.title,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '获取会话详情失败');
    }
  }
}
