import { Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';
import { AppError } from '../middleware/errorHandler';

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
      // 获取认证用户ID
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const conversations = await this.conversationService.getConversations(userId);

      res.json({
        code: '200',
        data: conversations,
        message: 'success',
      });
    } catch (error) {
      res.status(error instanceof AppError ? error.statusCode : 500).json({
        code: error instanceof AppError ? String(error.statusCode) : '500',
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }

  /**
   * 创建新会话
   */
  async createConversation(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const conversation = await this.conversationService.createConversation({
        ...req.body,
        userId,
      });

      res.json({
        code: '200',
        data: {
          id: conversation.id,
          title: conversation.title,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          userId: conversation.userId,
          deleted: conversation.deleted,
        },
        message: 'success',
      });
    } catch (error) {
      res.status(error instanceof AppError ? error.statusCode : 500).json({
        code: error instanceof AppError ? String(error.statusCode) : '500',
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }

  /**
   * 重命名会话
   */
  async updateTitle(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const { conversationId, newTitle } = req.body;
      if (!conversationId || !newTitle) {
        throw new AppError('会话ID和新标题不能为空', 400);
      }

      const conversation = await this.conversationService.updateTitle(conversationId, newTitle);

      res.json({
        code: '200',
        data: conversation,
        message: 'success',
      });
    } catch (error) {
      res.status(error instanceof AppError ? error.statusCode : 500).json({
        code: error instanceof AppError ? error.statusCode : 500,
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }

  /**
   * 删除会话
   */
  async deleteConversation(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const conversationId = Number(req.query.conversationId);
      if (!conversationId) {
        throw new AppError('会话ID不能为空', 400);
      }

      await this.conversationService.deleteConversation(conversationId);

      res.json({
        code: '200',
        message: 'success',
      });
    } catch (error) {
      res.status(error instanceof AppError ? error.statusCode : 500).json({
        code: error instanceof AppError ? String(error.statusCode) : '500',
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }

  /**
   * 删除所有会话
   */
  async deleteAllConversations(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      await this.conversationService.deleteAllConversations(userId);

      res.json({
        code: '200',
        data: 200,
        message: 'success',
      });
    } catch (error) {
      res.status(error instanceof AppError ? error.statusCode : 500).json({
        code: error instanceof AppError ? String(error.statusCode) : '500',
        data: null,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }
}
