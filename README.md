# Storm Node.js Backend

基于 Node.js + TypeScript + Express + MongoDB 的后端服务框架。

## 技术栈

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- JWT 认证
- Winston 日志
- Swagger API 文档
- Multer 文件上传
- Nodemailer 邮件服务
- Socket.IO 实时通信
- OpenAI API 集成

## 项目结构

```
src/
├── config/         # 配置文件
├── controllers/    # 控制器
├── middleware/     # 中间件
├── models/        # 数据模型
├── routes/        # 路由
├── services/      # 业务逻辑
├── utils/         # 工具函数
└── index.ts       # 应用入口
```

## 开始使用

1. 安装依赖：

```bash
npm install
```

2. 配置环境变量：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，设置必要的环境变量。

3. 开发模式运行：

```bash
npm run dev
```

4. 构建生产版本：

```bash
npm run build
```

5. 运行生产版本：

```bash
npm start
```

## API 文档

启动服务后访问 `http://localhost:7788/api-docs` 查看 Swagger API 文档。

## 开发规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 使用 Winston 进行日志记录

## 测试

运行测试：

```bash
npm test
```

## 部署

1. 构建项目：

```bash
npm run build
```

2. 设置生产环境变量
3. 使用 PM2 或其他进程管理器运行服务

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 更新日志

### 2024-03-27

1. 添加用户模块

   - 创建用户模型 (User Model)
   - 实现用户认证中间件
   - 添加用户相关接口：
     - POST /api/users/register - 用户注册
     - POST /api/users/login - 用户登录
     - GET /api/users/profile - 获取用户信息
     - PUT /api/users/profile - 更新用户信息
   - 添加 Swagger API 文档
   - 实现 JWT 认证
   - 添加密码加密功能
   - 添加错误处理中间件

2. 接口说明

   - 所有接口返回格式统一为：
     ```json
     {
       "status": "success" | "error",
       "data": {},
       "message": "错误信息（如果有）"
     }
     ```
   - 认证接口需要在请求头中携带 token：
     ```
     Authorization: Bearer <token>
     ```

3. 环境变量配置

   - 添加必要的环境变量配置
   - 提供 .env.example 示例文件

4. 代码规范
   - 添加 ESLint 配置
   - 添加 Prettier 配置
   - 统一代码风格

### 2024-03-27 (第二次更新)

1. 添加文件上传功能

   - 实现文件上传配置
   - 添加文件上传和删除接口
   - 支持多种文件类型
   - 添加文件大小限制
   - 实现文件存储管理

2. 增强用户功能

   - 添加修改密码功能
   - 实现忘记密码功能
   - 添加密码重置功能
   - 集成邮件服务
   - 添加密码重置令牌

3. 系统配置

   - 添加文件上传配置
   - 添加邮件服务配置
   - 完善环境变量配置
   - 添加跨域配置

4. 接口更新

   - POST /api/upload - 文件上传
   - DELETE /api/upload/:filename - 文件删除
   - POST /api/users/change-password - 修改密码
   - POST /api/users/forgot-password - 忘记密码
   - POST /api/users/reset-password - 重置密码

5. 依赖更新

   - 添加 multer 文件上传
   - 添加 nodemailer 邮件服务
   - 添加 uuid 生成器
   - 添加相关类型定义

6. 文档更新
   - 更新 API 文档
   - 添加新功能说明
   - 完善环境变量说明
   - 更新项目结构说明

### 2024-03-27 (第三次更新)

1. 添加聊天功能

   - 创建聊天模型
   - 实现对话管理
   - 集成 OpenAI API
   - 添加消息历史记录
   - 实现对话重命名

2. 聊天接口

   - POST /api/chat - 创建新对话
   - GET /api/chat - 获取对话列表
   - GET /api/chat/:id - 获取对话详情
   - POST /api/chat/:id/message - 发送消息
   - PUT /api/chat/:id/rename - 重命名对话
   - DELETE /api/chat/:id - 删除对话
   - DELETE /api/chat - 删除所有对话

3. 数据模型

   - 添加 Chat 模型
   - 添加 Message 子模型
   - 实现用户关联
   - 添加时间戳
   - 创建索引优化

4. AI 集成

   - 配置 OpenAI API
   - 实现消息发送
   - 处理 AI 响应
   - 错误处理机制

5. 环境配置

   - 添加 AI API 配置
   - 配置 API 密钥
   - 设置 API 端点

6. 文档更新
   - 添加聊天接口文档
   - 更新 Swagger 配置
   - 添加 AI 配置说明
   - 完善错误处理说明

### 聊天消息管理

#### 保存聊天记录

```
POST /api/chat/messages
```

请求头：

```
Authorization: Bearer your_jwt_token
```

请求参数：

```json
{
  "attachmentId": 0,
  "content": "消息内容",
  "conversationId": 0,
  "hideType": 0,
  "role": "user",
  "title": "消息标题"
}
```

响应格式：

```json
{
  "code": 200,
  "data": {
    "attachmentId": 0,
    "content": "消息内容",
    "conversationId": 0,
    "createdAt": "2024-03-31T10:00:00.000Z",
    "deleted": 0,
    "hideType": 0,
    "id": 1,
    "role": "user",
    "userId": "user123"
  },
  "message": "success"
}
```

参数说明：

- attachmentId: 附件ID（可选）
- content: 消息内容
- conversationId: 会话ID
- hideType: 隐藏类型（可选）
- role: 角色（user/assistant）
- title: 消息标题（可选）

错误响应：

```json
{
  "code": 401,
  "data": null,
  "message": "未授权"
}
```

#### 获取聊天记录

```
GET /api/chat/messages?conversationId=1
```

请求头：

```
Authorization: Bearer your_jwt_token
```

请求参数：

- conversationId: 会话ID（必填，通过查询参数传递）

响应格式：

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "conversationId": 1,
      "content": "消息内容",
      "role": "user",
      "userId": "user123",
      "attachmentId": 0,
      "hideType": 0,
      "deleted": 0,
      "createdAt": "2024-03-31T10:00:00.000Z"
    }
  ],
  "message": "success"
}
```

错误响应：

```json
{
  "code": 400,
  "data": null,
  "message": "会话ID不能为空"
}
```

## 会话管理

所有会话相关的接口都需要认证。请在请求头中添加：

```
Authorization: Bearer your_jwt_token
```

#### 获取会话列表

```
GET /api/chat/conversations
```

请求头：

```
Authorization: Bearer your_jwt_token
```

响应格式：

```json
{
  "code": "200",
  "data": [
    {
      "timeStr": "今天",
      "list": [
        {
          "id": 1,
          "title": "新会话",
          "lastMessage": "你好",
          "createdAt": "2024-03-31T10:00:00.000Z"
        }
      ]
    }
  ],
  "message": "success"
}
```

错误响应：

```json
{
  "code": "401",
  "data": null,
  "message": "未授权"
}
```

#### 创建新会话

```
POST /api/chat/create/conversations
```

请求头：

```
Authorization: Bearer your_jwt_token
```

请求参数：

```json
{
  "attachmentId": 0,
  "content": "会话内容",
  "conversationId": 0,
  "hideType": 0,
  "role": "user",
  "title": "会话标题"
}
```

响应格式：

```json
{
  "code": "200",
  "data": {
    "id": 1,
    "title": "会话标题",
    "createdAt": "2024-03-31T10:00:00.000Z",
    "updatedAt": "2024-03-31T10:00:00.000Z",
    "userId": "user123",
    "deleted": 0
  },
  "message": "success"
}
```

错误响应：

```json
{
  "code": "401",
  "data": null,
  "message": "未授权"
}
```

参数说明：

- attachmentId: 附件ID（可选）
- content: 会话内容
- conversationId: 会话ID（新建时可选）
- hideType: 隐藏类型（可选）
- role: 角色
- title: 会话标题

#### 获取会话详情

```
GET /api/chat/conversations/messages?conversationId=4
```

请求头：

```
Authorization: Bearer your_jwt_token
```

请求参数：

- conversationId: 会话ID（必填，通过查询参数传递）

响应格式：

```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "attachmentId": 0,
        "content": "消息内容",
        "conversationId": 4,
        "createdAt": "2024-03-31T10:00:00.000Z",
        "deleted": 0,
        "hideType": 0,
        "id": 1,
        "role": "user",
        "userId": "user123"
      }
    ],
    "title": "会话标题"
  },
  "message": "success"
}
```

错误响应：

```json
{
  "code": 400,
  "data": null,
  "message": "会话ID不能为空"
}
```

或

```json
{
  "code": 401,
  "data": null,
  "message": "未授权"
}
```

参数说明：

- list: 消息列表
  - attachmentId: 附件ID
  - content: 消息内容
  - conversationId: 会话ID
  - createdAt: 创建时间
  - deleted: 是否删除（0-未删除，1-已删除）
  - hideType: 隐藏类型
  - id: 消息ID
  - role: 角色（user/assistant）
  - userId: 用户ID
- title: 会话标题

## 接口列表

### 会话管理

#### 获取会话列表

- 请求方式：GET
- 请求路径：/api/chat/conversations
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": 1,
        "title": "会话标题",
        "userId": "user123",
        "deleted": 0,
        "createdAt": "2024-03-31T10:00:00.000Z",
        "updatedAt": "2024-03-31T10:00:00.000Z"
      }
    ],
    "message": "success"
  }
  ```

#### 创建新会话

- 请求方式：POST
- 请求路径：/api/chat/create/conversations
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 请求参数：
  ```json
  {
    "title": "新会话"
  }
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": {
      "id": 1,
      "title": "新会话",
      "userId": "user123",
      "deleted": 0,
      "createdAt": "2024-03-31T10:00:00.000Z",
      "updatedAt": "2024-03-31T10:00:00.000Z"
    },
    "message": "success"
  }
  ```

#### 重命名会话

- 请求方式：PUT
- 请求路径：/api/chat/update/title
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 请求参数：
  ```json
  {
    "conversationId": 1,
    "newTitle": "新标题"
  }
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": {
      "id": 1,
      "title": "新标题",
      "userId": "user123",
      "deleted": 0,
      "createdAt": "2024-03-31T10:00:00.000Z",
      "updatedAt": "2024-03-31T10:00:00.000Z"
    },
    "message": "success"
  }
  ```

#### 删除会话

- 请求方式：DELETE
- 请求路径：/api/chat/delete/conversations?conversationId=8
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 响应格式：
  ```json
  {
    "code": "200",
    "message": "success"
  }
  ```

#### 删除所有会话

- 请求方式：DELETE
- 请求路径：/api/chat/delete/all/conversations
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": 200,
    "message": "success"
  }
  ```

错误响应：

```json
{
  "code": "401",
  "data": null,
  "message": "未授权"
}
```

### 消息管理

#### 保存聊天记录

- 请求方式：POST
- 请求路径：/api/chat/messages
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 请求参数：
  ```json
  {
    "conversationId": 1,
    "content": "消息内容",
    "role": "user",
    "title": "会话标题"
  }
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": {
      "id": 1,
      "conversationId": 1,
      "content": "消息内容",
      "role": "user",
      "userId": "user123",
      "attachmentId": 0,
      "hideType": 0,
      "deleted": 0,
      "createdAt": "2024-03-31T10:00:00.000Z"
    },
    "message": "success"
  }
  ```

#### 获取聊天记录

- 请求方式：GET
- 请求路径：/api/chat/messages?conversationId=1
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": 1,
        "conversationId": 1,
        "content": "消息内容",
        "role": "user",
        "userId": "user123",
        "attachmentId": 0,
        "hideType": 0,
        "deleted": 0,
        "createdAt": "2024-03-31T10:00:00.000Z"
      }
    ],
    "message": "success"
  }
  ```

#### 获取会话详情

- 请求方式：GET
- 请求路径：/api/chat/conversations/messages?conversationId=1
- 请求头：
  ```
  Authorization: Bearer your_jwt_token
  ```
- 响应格式：
  ```json
  {
    "code": 200,
    "data": {
      "list": [
        {
          "id": 1,
          "conversationId": 1,
          "content": "消息内容",
          "role": "user",
          "userId": "user123",
          "attachmentId": 0,
          "hideType": 0,
          "deleted": 0,
          "createdAt": "2024-03-31T10:00:00.000Z"
        }
      ],
      "title": "会话标题"
    },
    "message": "success"
  }
  ```

## 错误响应

所有接口在发生错误时会返回以下格式：

```json
{
  "code": 400,
  "data": null,
  "message": "错误信息"
}
```

常见错误码：

- 200: 成功
- 400: 请求参数错误
- 401: 未授权
- 404: 资源不存在
- 500: 服务器内部错误

## AI 聊天接口

### AI 聊天完成

**请求方法：** POST  
**请求路径：** `/api/v1/chat/completions`  
**请求头：**

```
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

**请求参数：**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "你好"
    }
  ],
  "model": "deepseek-r1:32b"
}
```

**响应格式：**

```json
{
  "id": "chatcmpl-1234567890",
  "object": "chat.completion.chunk",
  "created": 1234567890,
  "model": "deepseek-r1:32b",
  "system_fingerprint": "fp_ollama",
  "choices": [
    {
      "index": 0,
      "delta": {
        "content": "你好！"
      },
      "finish_reason": null
    }
  ]
}
```

**错误响应：**

```json
{
  "code": "401",
  "data": null,
  "message": "未授权"
}
```

**注意事项：**

1. 接口支持流式响应，使用 Server-Sent Events (SSE) 格式
2. 需要有效的 JWT token 进行身份验证
3. messages 参数为必填，且必须是数组格式
4. model 参数可选，默认为 "deepseek-r1:32b"
