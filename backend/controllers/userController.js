import bcryptjs from 'bcryptjs';

// import User from '../models/userModel.js';

import User from '../models/taskModel.js';

import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// Get tasks for the current user
export const taskLoad=async (req, res) => {
  try {
    const userId = req.user.id; // Ensure you extract the user's ID from the token
    const user = await User.findById(userId).select('tasks');
console.log(user,"ghsdhj");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ tasks: user.tasks });
  } catch (error) {
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