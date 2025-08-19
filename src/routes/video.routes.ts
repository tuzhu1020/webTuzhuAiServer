import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import * as ctrl from '../controllers/video.controller';

const router = Router();

router.get('/hot', ctrl.getHot);
router.get('/recommend', ctrl.getRecommend);
router.get('/:id', ctrl.getDetail);
router.post('/', auth, ctrl.createVideo);
router.post('/:id/view', ctrl.incView);

export default router;
