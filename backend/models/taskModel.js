import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'done'], // Only allow these statuses
      default: 'pending',
    },
  },
  { _id: false } // Disable _id for tasks if it's not needed
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [taskSchema], // Array of task objects
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;