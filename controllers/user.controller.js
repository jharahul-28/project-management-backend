import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWTSECRETKEY;

export const registerUser = async (req, res) => {
  const { username, email, password, role, joiningId } = req.body;
  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({
          status: "400",
          message: "Email already exists",
          Timestamp: new Date().toISOString(),
        });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({
          status: "400",
          message: "Username already exists",
          Timestamp: new Date().toISOString(),
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role,
      joiningId,
    };
    const registeredUser = await User.create(newUser);

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey, {
      expiresIn: "1h",
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(201)
      .json({
        status: "201",
        message: "User registered successfully",
        registeredUser,
        Timestamp: new Date().toISOString(),
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "500",
        message: "Server Error",
        error: error.message,
        Timestamp: new Date().toISOString(),
      });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({
        status: "400",
        message: "Username is mandatory",
        Timestamp: new Date().toISOString(),
      });
  if (!password)
    return res
      .status(400)
      .json({
        status: "400",
        message: "Password is mandatory",
        Timestamp: new Date().toISOString(),
      });
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({
          status: "400",
          message: "Username doesn't exist",
          Timestamp: new Date().toISOString(),
        });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .json({
          status: "400",
          message: "Password doesn't match",
          Timestamp: new Date().toISOString(),
        });

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(201)
      .json({
        status: "201",
        message: "Login Successful!!",
        Timestamp: new Date().toISOString(),
        token,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "500",
        message: "Server Error",
        error: error.message,
        Timestamp: new Date().toISOString(),
      });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ assignee: userId }).exec();
    if (tasks)
      return res
        .status(201)
        .json({
          status: "201",
          tasks: tasks,
          Timestamp: new Date().toISOString(),
        });
    else
      return res
        .status(201)
        .json({
          status: "201",
          message: "Not assigned any task",
          Timestamp: new Date().toISOString(),
        });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "500",
        message: "Server Error",
        error: error.message,
        Timestamp: new Date().toISOString(),
      });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ participants: userId }).exec();
    if (projects)
      return res
        .status(201)
        .json({
          status: "201",
          projects: projects,
          Timestamp: new Date.toISOString(),
        });
    else
      return res
        .status(201)
        .json({
          status: "201",
          message: "Not assigned any project",
          Timestamp: new Date.toISOString(),
        });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "500",
        message: "Server Error",
        error: error.message,
        Timestamp: new Date.toISOString(),
      });
  }
};

export const getAdminOverview = async (req, res) => {
  try {
    const projects = await Project.find().populate("participants").exec();
    const users = await User.find().exec();
    const tasks = await Task.find().exec();

    const overview = {
      projects,
      users,
      tasks,
    };

    return res.status(201).json(overview);
  } catch (error) {
    return res
      .status(500)
      .json({status: "500", message: "Server Error", error: error.message, Timestamp: new Date.toISOString()});
  }
};

export const getTeamLeadTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ participants: userId }).exec();
    const tasks = await Task.find({
      project: { $in: projects.map((p) => p._id) },
    }).exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const addNewTask = async (req, res) => {
  try {
    const { title, description, status, assignee, project } = req.body;
    const user = await User.findOne({ username: assignee });
    if (!user) {
      return res.status(404).json({ message: "Assignee user not found" , Timestamp: new Date().toISOString()});
    }
    const newTask = new Task({
      title,
      description,
      status,
      assignee: user._id,
      project,
    });
    await newTask.save();
    res.status(201).json({status: "201",newTask, Timestamp: new Date().toISOString()});
  } catch (error) {
    res.status(500).json({ status: "500", message: "Server Error", error: error.message, Timestamp: new Date().toISOString()});
  }
};