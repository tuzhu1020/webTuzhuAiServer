import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: 响应代码，成功为'200'，失败为对应错误代码
 *         data:
 *           type: object
 *           description: 响应数据，失败时为null
 *         message:
 *           type: string
 *           description: 响应消息，成功时为'成功'，失败时为错误消息
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 用户注册
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 注册成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: 用户名或邮箱已存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 用户登录
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *       401:
 *         description: 用户名或密码错误
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: 获取用户信息
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 *       401:
 *         description: 未授权
 */
router.get('/profile', auth, getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: 更新用户信息
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *       401:
 *         description: 未授权
 */
router.put('/profile', auth, updateProfile);

/**
 * @swagger
 * /api/users/change-password:
 *   post:
 *     summary: 修改密码
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: 密码修改成功
 *       401:
 *         description: 当前密码错误
 */
router.post('/change-password', auth, changePassword);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: 忘记密码
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 重置密码邮件已发送
 *       404:
 *         description: 用户不存在
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: 重置密码
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 密码重置成功
 *       400:
 *         description: 重置密码链接无效或已过期
 */
router.post('/reset-password', resetPassword);

export default router;
