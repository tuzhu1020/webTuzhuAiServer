import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import { AppError } from '../middleware/errorHandler';

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  /**
   * 创建新消息
   */
  async createMessage(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const message = await this.messageService.createMessage({
        ...req.body,
        userId,
      });

      res.json({
        code: '200',
        data: {
          id: message.id,
          conversationId: message.conversationId,
          content: message.content,
          role: message.role,
          userId: message.userId,
          attachmentId: message.attachmentId,
          hideType: message.hideType,
          deleted: message.deleted,
          createdAt: message.createdAt,
        },
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
   * 获取会话的消息列表
   */
  async getMessages(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const conversationId = Number(req.query.conversationId);
      if (!conversationId) {
        throw new AppError('会话ID不能为空', 400);
      }

      const messages = await this.messageService.getMessagesByConversationId(conversationId);

      res.json({
        code: '200',
        data: messages,
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
   * 获取会话详情
   */
  async getConversationDetail(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const conversationId = Number(req.query.conversationId);
      if (!conversationId) {
        throw new AppError('会话ID不能为空', 400);
      }

      const detail = await this.messageService.getConversationDetail(conversationId);

      res.json({
        code: '200',
        data: detail,
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
}
