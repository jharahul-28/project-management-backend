import express from 'express';
import { registerUser, loginUser, getUserTasks, getUserProjects, getAdminOverview, getTeamLeadTasks, addNewTask } from '../controllers/user.controller.js';
import { protect, admin, teamLead } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ message: "User" });
});

router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/tasks', protect, getUserTasks);
router.get('/projects', protect, getUserProjects);
router.get('/admin/overview', protect, admin, getAdminOverview);
router.get('/teamlead/tasks', protect, teamLead, getTeamLeadTasks);
router.post('/teamlead/tasks', protect, teamLead, addNewTask);

export default router;