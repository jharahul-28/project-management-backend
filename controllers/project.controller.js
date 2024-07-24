import Project from '../models/project.model.js';

export const createProject = async (req, res) => {
    const { name, description, deadline, participants } = req.body;
    try {
        const newProject = new Project({ name, description, deadline, participants });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, deadline, participants } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { name, description, deadline, participants }, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
