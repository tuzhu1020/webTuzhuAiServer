import type { Request, Response, NextFunction } from 'express'

export class WpsController {
  static async getOpenUrl(req: Request, res: Response, _next: NextFunction) {
    const { fileId } = req.query as { fileId?: string }

    // TODO: 使用环境变量与签名算法生成金山文档第三方打开链接
    // const appId = process.env.WPS_APP_ID
    // const appKey = process.env.WPS_APP_KEY
    // const url = buildSignedOpenUrl({ appId, appKey, fileId })

    const demoUrl = 'https://kdocs.cn/l/smXnJOKlH'
    const url = demoUrl

    return res.json({ code: 200, data: { url }, message: 'success' })
  }

  static async fileInfo(_req: Request, res: Response) {
    return res.json({ code: 200, data: { name: 'Demo.docx' }, message: 'success' })
  }

  static async fileSave(_req: Request, res: Response) {
    return res.json({ code: 200, data: true, message: 'success' })
  }

  static async userInfo(_req: Request, res: Response) {
    return res.json({ code: 200, data: { userId: 'u_demo', username: 'demo' }, message: 'success' })
  }
}
