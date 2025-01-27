import express from 'express';
import {
  test,
  createTask,
  getTasks,
  updateUser,
  deleteAccount
} from '../controllers/userController.js';
import { verifyUserToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', test);
router.post('/createTask', verifyUserToken, createTask)
router.get('/getTasks', verifyUserToken, getTasks)
router.patch('/update/:id', verifyUserToken, updateUser);
router.delete('/delete/:id', verifyUserToken, deleteAccount);

export default router;