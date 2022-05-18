import { Router } from 'express';
import { DataController } from '../controllers/DataController';

const router = Router();

router.get('/', (req : any, res) => {
    res.json({
        status: 'success',
        message: 'Health Check'
    });
})

router.post('/character/create', DataController.createCharacter)

router.post('/episode/create', DataController.createEpisode)
router.get("/episodes/list", DataController.getEpisodes)

router.post('/comment/create', DataController.createComment)
router.get("/comments/list", DataController.getComments)

router.post('/location/create', DataController.createLocation)

export default router;