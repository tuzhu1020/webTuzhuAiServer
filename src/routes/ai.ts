import express from 'express';
import { AIController } from '../controllers/aiController';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();
const aiController = new AIController();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI 接口
 */

/**
 * @swagger
 * /api/ai/completions:
 *   post:
 *     summary: AI 聊天完成
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: 用户输入的提示
 *               conversationId:
 *                 type: number
 *                 description: 会话ID
 *               model:
 *                 type: string
 *                 description: 模型名称，默认为 gpt-3.5-turbo
 *               maxTokens:
 *                 type: number
 *                 description: 最大 token 数量
 *               temperature:
 *                 type: number
 *                 description: 温度参数，控制随机性
 *     responses:
 *       200:
 *         description: 成功获取 AI 回复
 *       401:
 *         description: 未授权
 *       500:
 *         description: 服务器错误
 */
router.post('/completions', auth, (req, res) => aiController.chatCompletions(req, res));

export default router;
