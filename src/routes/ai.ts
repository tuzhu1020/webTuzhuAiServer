import express from 'express';
import { AIController } from '../controllers/aiController';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();
const aiController = new AIController();

// AI 聊天完成接口
router.post('/completions', auth, (req, res) => aiController.chatCompletions(req, res));

export default router;
