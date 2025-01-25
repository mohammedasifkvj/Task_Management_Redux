import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: false,
// };

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  columns: [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'Work in Progress' },
    { id: 'DONE', title: 'Completed' },
  ],
  tasks: [], // Initialize tasks as an empty array
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
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.status = newStatus;
      }
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