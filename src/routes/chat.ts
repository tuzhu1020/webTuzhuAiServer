import { Router } from 'express';
import { ConversationController } from '../controllers/conversationController';
import { MessageController } from '../controllers/messageController';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const conversationController = new ConversationController();
const messageController = new MessageController();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: 聊天相关接口
 */

/**
 * @swagger
 * /api/chat/conversations:
 *   get:
 *     summary: 获取会话列表
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取会话列表
 *       401:
 *         description: 未授权
 *       500:
 *         description: 服务器错误
 */
router.get('/conversations', auth, (req, res) => conversationController.getConversations(req, res));

/**
 * @swagger
 * /api/chat/create/conversations:
 *   post:
 *     summary: 创建新会话
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - role
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               role:
 *                 type: string
 *               hideType:
 *                 type: number
 *               attachmentId:
 *                 type: number
 *     responses:
 *       200:
 *         description: 会话创建成功
 *       401:
 *         description: 未授权
 *       500:
 *         description: 服务器错误
 */
router.post('/create/conversations', auth, (req, res) =>
  conversationController.createConversation(req, res)
);

/**
 * @swagger
 * /api/chat/update/title:
 *   put:
 *     summary: 重命名会话
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - title
 *             properties:
 *               conversationId:
 *                 type: number
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: 重命名成功
 *       401:
 *         description: 未授权
 *       404:
 *         description: 会话不存在
 */
router.put('/update/title', auth, (req, res) => conversationController.updateTitle(req, res));

/**
 * @swagger
 * /api/chat/delete/conversations:
 *   delete:
 *     summary: 删除会话
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *             properties:
 *               conversationId:
 *                 type: number
 *     responses:
 *       200:
 *         description: 删除成功
 *       401:
 *         description: 未授权
 *       404:
 *         description: 会话不存在
 */
router.delete('/delete/conversations', auth, (req, res) =>
  conversationController.deleteConversation(req, res)
);

/**
 * @swagger
 * /api/chat/delete/all/conversations:
 *   delete:
 *     summary: 删除所有会话
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 删除成功
 *       401:
 *         description: 未授权
 */
router.delete('/delete/all/conversations', auth, (req, res) =>
  conversationController.deleteAllConversations(req, res)
);

/**
 * @swagger
 * /api/chat/messages:
 *   post:
 *     summary: 发送消息
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - content
 *               - role
 *             properties:
 *               conversationId:
 *                 type: number
 *               content:
 *                 type: string
 *               role:
 *                 type: string
 *               hideType:
 *                 type: number
 *               attachmentId:
 *                 type: number
 *     responses:
 *       200:
 *         description: 消息发送成功
 *       401:
 *         description: 未授权
 */
router.post('/messages', auth, (req, res) => messageController.createMessage(req, res));

/**
 * @swagger
 * /api/chat/messages:
 *   get:
 *     summary: 获取聊天记录
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 获取聊天记录成功
 *       401:
 *         description: 未授权
 */
router.get('/messages', auth, (req, res) => messageController.getMessages(req, res));

/**
 * @swagger
 * /api/chat/conversations/messages:
 *   get:
 *     summary: 获取会话详情
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 获取会话详情成功
 *       401:
 *         description: 未授权
 *       404:
 *         description: 会话不存在
 */
router.get('/conversations/messages', auth, (req, res) =>
  messageController.getConversationDetail(req, res)
);

export default router;
