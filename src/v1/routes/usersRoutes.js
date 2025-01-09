import express from 'express';
import { getUsers, newUser } from '../../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', newUser);

export default router;
