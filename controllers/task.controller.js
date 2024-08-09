import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
    const { title, description, status, assignee, project } = req.body;
    try {
        const newTask = new Task({ title, description, status, assignee, project });
        await newTask.save();
        res.status(201).json({
            status: "201",
            newTask: newTask,
            Timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message,
            Timestamp: new Date().toISOString(),
        });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignee } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, assignee }, { new: true });
        res.status(200).json({
            status: 200,
            updatedTask: updatedTask,
            message: "Task Updated Successfully",
            Timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message ,
            Timestamp: new Date().toISOString(),
        });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({
            status: "200",
            message: "Task deleted successfully",
            Timestamp: new Date().toISOString(),
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

export const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.status(200).json({
            status: "200",
            task: task,
            Timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message ,
            Timestamp: new Date().toISOString()
        });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            status: "200",
            tasks: tasks,
            Timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: "500",
            message: "Server Error", 
            error: error.message ,
            Timestamp: new Date().toISOString()
        });
    }
};
