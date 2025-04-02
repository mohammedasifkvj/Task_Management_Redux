import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: false,
// };

const initialState = {
  currentUser: null,
  loading: false,
  
  columns: [
    { id: 'pending', title: 'Pending Tasks' },
    { id: 'in-progress', title: 'In Progress Tasks' },
    { id: 'completed', title: 'Completed Tasks' },
  ],
  tasks: [],
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.columns = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((t) => t._id === taskId);
      if (task) task.status = newStatus;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  setTasks,
  updateTaskStatus
} = userSlice.actions;

export default userSlice.reducer;