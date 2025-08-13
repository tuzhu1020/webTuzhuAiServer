import { Router } from 'express'
import { WpsController } from '../controllers/wps.controller'

const router = Router()

// 获取在线编辑打开地址
router.get('/open-url', WpsController.getOpenUrl)

// 占位：第三方回调（根据金山文档要求命名/路径可再调整）
router.post('/callback/file/info', WpsController.fileInfo)
router.post('/callback/file/save', WpsController.fileSave)
router.post('/callback/user/info', WpsController.userInfo)

export default router
