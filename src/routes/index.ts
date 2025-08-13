import { Router } from 'express';
import userRoutes from './user.routes';
import uploadRoutes from './upload.routes';
import chatRoutes from './chat';
import aiRoutes from './ai';
import wpsRoutes from './wps.routes';

const router = Router();

// 健康检查路由
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 用户路由
router.use('/users', userRoutes);

// 文件上传路由
router.use('/upload', uploadRoutes);

// 聊天路由
router.use('/chat', chatRoutes);

// AI 路由
router.use('/v1/chat', aiRoutes);

// WPS 路由
router.use('/wps', wpsRoutes);

// 在这里添加其他路由
// router.use('/auth', authRoutes);
// router.use('/posts', postRoutes);

export default router;
