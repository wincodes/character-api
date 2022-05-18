import { Router } from 'express';
import { DataController } from '../controllers/DataController';

const router = Router();

router.get('/', (req : any, res) => {
    res.json({
        status: 'success',
        message: 'Health Check'
    });
})

// router.post('/character/create', DataController.createCharacter)

export default router;