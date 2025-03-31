import { Router } from 'express';
import { ConversationController } from '../controllers/conversationController';
import { MessageController } from '../controllers/messageController';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const conversationController = new ConversationController();
const messageController = new MessageController();

// 获取会话列表
router.get('/conversations', auth, (req, res) => conversationController.getConversations(req, res));

// 创建新会话
router.post('/create/conversations', auth, (req, res) =>
  conversationController.createConversation(req, res)
);

// 重命名会话
router.put('/update/title', auth, (req, res) => conversationController.updateTitle(req, res));

// 删除会话
router.delete('/delete/conversations', auth, (req, res) =>
  conversationController.deleteConversation(req, res)
);

// 删除所有会话
router.delete('/delete/all/conversations', auth, (req, res) =>
  conversationController.deleteAllConversations(req, res)
);

// 保存聊天记录
router.post('/messages', auth, (req, res) => messageController.createMessage(req, res));

// 获取聊天记录
router.get('/messages', auth, (req, res) => messageController.getMessages(req, res));

// 获取会话详情
router.get('/conversations/messages', auth, (req, res) =>
  messageController.getConversationDetail(req, res)
);

export default router;
