import { Conversation, IConversation } from '../models/conversation';
import dayjs from 'dayjs';
import { AppError } from '../middleware/errorHandler';

interface ConversationGroup {
  timeStr: string;
  list: Array<IConversation>;
}

interface CreateConversationDto {
  attachmentId?: number;
  content: string;
  conversationId?: number;
  hideType?: number;
  role: string;
  title: string;
  userId: string;
}

export class ConversationService {
  /**
   * 获取会话列表
   */
  async getConversations(userId: string): Promise<ConversationGroup[]> {
    try {
      // 获取所有会话并按创建时间倒序排序
      const conversations = await Conversation.find({
        deleted: 0,
        userId: userId,
      })
        .sort({ createdAt: -1 })
        .lean();

      // 按日期分组
      const groupedConversations: { [key: string]: IConversation[] } = {};

      conversations.forEach((conversation) => {
        const date = dayjs(conversation.createdAt);
        const today = dayjs();

        let timeStr = '';
        if (date.isSame(today, 'day')) {
          timeStr = '今天';
        } else if (date.isSame(today.subtract(1, 'day'), 'day')) {
          timeStr = '昨天';
        } else if (date.isSame(today, 'year')) {
          timeStr = date.format('M月D日');
        } else {
          timeStr = date.format('YYYY年M月D日');
        }

        if (!groupedConversations[timeStr]) {
          groupedConversations[timeStr] = [];
        }
        groupedConversations[timeStr].push(conversation);
      });

      // 转换为数组格式
      return Object.entries(groupedConversations).map(([timeStr, list]) => ({
        timeStr,
        list,
      }));
    } catch (error) {
      throw new Error('获取会话列表失败');
    }
  }

  /**
   * 创建新会话
   */
  async createConversation(data: CreateConversationDto): Promise<IConversation> {
    try {
      // 生成新的会话ID
      const lastConversation = await Conversation.findOne().sort({ id: -1 });
      const newId = (lastConversation?.id || 0) + 1;

      // 创建新会话
      const conversation = new Conversation({
        id: newId,
        title: data.title,
        userId: data.userId,
        attachmentId: data.attachmentId,
        hideType: data.hideType,
        lastMessage: data.content,
        deleted: 0,
      });

      // 保存会话
      await conversation.save();

      return conversation;
    } catch (error) {
      throw new Error('创建会话失败');
    }
  }

  /**
   * 更新会话标题
   */
  async updateTitle(conversationId: number, newTitle: string) {
    const conversation = await Conversation.findOne({ id: conversationId });
    if (!conversation) {
      throw new AppError('会话不存在', 404);
    }

    conversation.title = newTitle;
    await conversation.save();

    return {
      id: conversation.id,
      title: conversation.title,
      userId: conversation.userId,
      deleted: conversation.deleted,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  /**
   * 删除会话
   */
  async deleteConversation(conversationId: number) {
    const conversation = await Conversation.findOne({ id: conversationId });
    if (!conversation) {
      throw new AppError('会话不存在', 404);
    }

    // 软删除会话
    conversation.deleted = 1;
    await conversation.save();

    return true;
  }

  /**
   * 删除所有会话
   */
  async deleteAllConversations(userId: string) {
    try {
      // 软删除用户的所有会话
      await Conversation.updateMany({ userId, deleted: 0 }, { $set: { deleted: 1 } });
      return true;
    } catch (error) {
      throw new Error('删除所有会话失败');
    }
  }
}
