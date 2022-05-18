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

router.post('/comment/create', DataController.createComment)

router.post('/location/create', DataController.createLocation)

export default router;