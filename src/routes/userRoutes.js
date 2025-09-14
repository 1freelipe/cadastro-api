import { Router } from 'express';
import usersController from '../controllers/usersController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', usersController.store);
router.get('/', loginRequired, usersController.index);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
