import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = new Router();

router.post('/', usersController.store);

export default router;
