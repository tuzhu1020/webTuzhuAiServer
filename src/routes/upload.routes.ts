import { Router } from 'express';
import { uploadFile, deleteFile } from '../controllers/upload.controller';
import { upload } from '../config/upload.config';
import { auth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: 上传文件
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 上传成功
 *       400:
 *         description: 文件上传失败
 */
router.post('/', auth, upload.single('file'), uploadFile);

/**
 * @swagger
 * /api/upload/{filename}:
 *   delete:
 *     summary: 删除文件
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 删除成功
 *       404:
 *         description: 文件不存在
 */
router.delete('/:filename', auth, deleteFile);

export default router;
