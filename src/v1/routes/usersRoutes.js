import express from 'express';
import {
  getUsers,
  getUserByUUID,
  updateUser,
  deleteUser,
  newUser
} from '../../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:uuid', getUserByUUID);
router.post('/users', newUser);
router.put('/users/:uuid', updateUser);
router.delete('/users/:uuid', deleteUser);

export default router;
