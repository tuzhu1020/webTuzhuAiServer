import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { AppError } from '../middleware/errorHandler';

export class AIController {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  /**
   * AI 聊天完成
   */
  async chatCompletions(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('未授权', 401);
      }

      const { messages, model } = req.body;
      if (!messages || !Array.isArray(messages)) {
        throw new AppError('消息格式不正确', 400);
      }

      // 设置响应头，支持流式传输
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // 创建 AI 聊天完成流
      const stream = await this.aiService.createChatCompletion(messages, model);

      // 处理流式响应
      for await (const chunk of stream) {
        const data = {
          id: `chatcmpl-${Date.now()}`,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: model || 'deepseek-chat',
          system_fingerprint: 'fp_ollama',
          choices: chunk.choices.map((choice: any) => ({
            index: choice.index,
            delta: choice.delta,
            finish_reason: choice.finish_reason,
          })),
        };

        // 发送数据块
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }

      // 结束响应
      res.end();
    } catch (error) {
      if (res.headersSent) {
        res.end();
      } else {
        res.status(error instanceof AppError ? error.statusCode : 500).json({
          code: error instanceof AppError ? String(error.statusCode) : '500',
          data: null,
          message: error instanceof Error ? error.message : '服务器内部错误',
        });
      }
    }
  }
}
