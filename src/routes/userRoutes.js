import { Router } from 'express';
import usersController from '../controllers/usersController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.post('/', usersController.store);
router.put('/', loginRequired, usersController.update);
router.delete('/', loginRequired, usersController.delete);

export default router;
