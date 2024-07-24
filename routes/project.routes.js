import express from 'express';
import { createProject, updateProject, deleteProject, getProject, getAllProjects } from '../controllers/project.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.get('/:id', protect, getProject);
router.get('/', protect, getAllProjects);

export default router;
