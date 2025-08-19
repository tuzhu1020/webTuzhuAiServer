import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from './middleware/errorHandler';
import { responseHandler } from './middleware/responseHandler';
import { logger } from './utils/logger';
import routes from './routes';

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 7788;

// 中间件
app.use(
  helmet({
    contentSecurityPolicy: false, // 禁用CSP以允许Swagger UI正常工作
    crossOriginEmbedderPolicy: false, // 禁用COEP
    crossOriginOpenerPolicy: false, // 禁用COOP
    // 允许跨源资源策略用于图片/视频等被不同源的前端页面嵌入
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));
// 提供上传文件的静态访问（允许跨源嵌入）
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    if (process.env.CORS_ORIGIN) {
      res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    }
    next();
  },
  express.static('uploads')
);

// 全局响应拦截中间件，必须在路由之前注册
app.use(responseHandler);

// Swagger配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI对话系统接口文档',
      version: '1.0.0',
      description: 'StormNode API 接口文档',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: '开发环境服务器',
      },
      {
        url: `http://47.96.135.243:${port}`,
        description: '生产环境服务器',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'AI对话系统接口文档',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // 隐藏Models
      docExpansion: 'list', // none | list | full
      persistAuthorization: true,
      filter: true,
    },
  })
);

// 路由
app.use('/api', routes);

// 错误处理
app.use(errorHandler);

// 数据库连接
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });
