import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = new Router();

router.post('/', usersController.store);
router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
