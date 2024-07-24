import express from 'express';
import { createTask, updateTask, deleteTask, getTask, getAllTasks } from '../controllers/task.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);
router.get('/:id', protect, getTask);
router.get('/', protect, getAllTasks);

export default router;
