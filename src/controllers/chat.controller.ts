import { Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';

export class ConversationController {
  private conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService();
  }

  /**
   * 获取会话列表
   */
  async getConversations(req: Request, res: Response) {
    try {
      const conversations = await this.conversationService.getConversations();

      res.json({
        code: '0',
        data: conversations,
        message: 'success',
      });
    } catch (error) {
      res.status(500).json({
        code: '500',
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }
}