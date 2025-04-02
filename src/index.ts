import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from './middleware/errorHandler';
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

// Swagger配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Storm API Documentation',
      version: '1.0.0',
      description: 'API documentation for Storm application',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
      {
        url: `http://47.96.135.243:${port}`,
        description: 'Production server',
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
