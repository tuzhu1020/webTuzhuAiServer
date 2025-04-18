import OpenAI from 'openai';
import { AppError } from '../middleware/errorHandler';

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY || 'sk-24d7fd091a1f4c01820a6afca5116056',
    });
  }

  /**
   * 创建 AI 聊天完成
   */
  async createChatCompletion(
    messages: any[],
    model: string = 'deepseek-chat',
    stream: boolean = false
  ) {
    try {
      if (stream) {
        // 明确返回流式响应
        return await this.openai.chat.completions.create({
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          model,
          stream: true,
        });
      } else {
        // 返回常规响应
        return await this.openai.chat.completions.create({
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          model,
          stream: false,
        });
      }
    } catch (error) {
      throw new AppError('AI 服务调用失败', 500);
    }
  }
}
