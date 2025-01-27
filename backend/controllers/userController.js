import bcryptjs from 'bcryptjs';

import { errorHandler } from '../utils/error.js';

import User from '../models/userModel.js'
import Task from '../models/taskModel.js';


export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// Create Task
export const createTask = async (req, res) => {
  const userId = req.user.id; 
  const {taskName, details } = req.body;
  console.log("sec",req.body);
  

  // Validate the required fields
  if (!userId || !taskName || !details) {
    return res.status(400).json({ message: 'userId, taskName, and details are required' });
  }

  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task document for the user or create a new one if it doesn't exist
    let taskDocument = await Task.findOne({ userId });
    if (!taskDocument) {
      taskDocument = new Task({ userId, taskItems: [] });
    }

    // Add the new task to the taskItems array
    const newTask = {
      taskName,
      details,
    };
    taskDocument.taskItems.push(newTask);

    // Save the task document
    await taskDocument.save();

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
// 

// Get tasks for the current user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user's ID from the token

    // Fetch tasks associated with the user
    const tasks = await Task.findOne({ userId });
    console.log(tasks)

    if (!tasks) {
      return res.status(404).json({ message: 'No tasks found for this user.' });
    }

    res.json({ tasks: tasks.taskItems }); // Return the task items
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('Your account has been deleted...');
    res.clearCookie('access_token').status(200).json({message:'Account Deleted Successfully'});
  } catch (error) {
    next(error);
  }
}