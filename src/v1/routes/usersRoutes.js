import express from 'express';
import {
  getUsers,
  getUserById,
  newUser
} from '../../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:uuid', getUserById);
router.post('/users', newUser);

export default router;
