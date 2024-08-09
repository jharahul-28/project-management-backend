import Project from '../models/project.model.js';
import User from '../models/user.model.js';

export const createProject = async (req, res) => {
    const { name, description, deadline, participants } = req.body;
    try {
        const userIds = await Promise.all(participants.map(async username => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error(`User with username ${username} not found`);
            }
            return user._id;
        }));
        const newProject = new Project({
            name,
            description,
            deadline,
            participants: userIds,
        });

        await newProject.save();
        res.status(201).json({
            status: "201",
            newProject: newProject,
            Timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: error.message.includes('not found') ? error.message : "Server Error",
            error: error.message,
            Timestamp: new Date().toISOString(),
        });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, deadline, participants } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { name, description, deadline, participants }, { new: true });
        res.status(200).json({
            status: "200",
            updatedProject: updatedProject,
            Timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message,
            Timestamp: new Date().toISOString()
        });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ 
            status: "200",
            message: "Project deleted successfully",
            Timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message,
            Timestamp: new Date().toISOString()
        });
    }
};

export const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        res.status(200).json({
            status: "200",
            project: project,
            Timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message,
            Timestamp: new Date().toISOString()
        });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            status: "200",
            projects: projects,
            Timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message,
            Timestamp: new Date().toISOString()
        });
    }
};
