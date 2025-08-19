import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import * as ctrl from '../controllers/danmaku.controller';

const router = Router();

router.get('/:videoId', ctrl.list);
router.post('/:videoId', auth, ctrl.create);

export default router;
