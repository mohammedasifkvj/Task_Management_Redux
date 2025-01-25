import express from 'express';
import {
  test,
  taskLoad,
  updateUser,
  deleteAccount
} from '../controllers/userController.js';
import { verifyUserToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', test);
router.get('/tasks', verifyUserToken, taskLoad)
router.patch('/update/:id', verifyUserToken, updateUser);
router.delete('/delete/:id', verifyUserToken, deleteAccount);

export default router;