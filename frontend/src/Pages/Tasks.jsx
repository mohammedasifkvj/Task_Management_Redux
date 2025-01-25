import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setTasks, updateTaskStatus } from '../redux/slice/userSlice.js';
import Column from '../components/Column.jsx';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/slice/userSlice.js';


const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = useSelector((state) => state.user.columns);
  const tasks = useSelector((state) => state.user.tasks);

  const [errors, setErrors] = useState({ taskName: ' ', details: ' ' });

  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/user/tasks'); // Update with the correct API endpoint
        dispatch(setTasks(response.data.tasks));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    const taskId = active.id;
    const targetColumn = over.id;

    if (!taskId || !targetColumn) return;

    dispatch(updateTaskStatus({ taskId, newStatus: targetColumn }));

    // Optionally, update the task status in the backend
    axios
      .put(`/api/tasks/${taskId}`, { status: targetColumn })
      .catch((error) => console.error('Error updating task status:', error));
  };

  //Task add states
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const [showTaskPopup, setShowTaskPopup] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case 'taskName':
        if (value.trim().length < 4) {
          return 'Task must be at least 4 characters long and cannot be only spaces.';
        }
        return '';
      case 'details':
        if (value.trim().length < 8) {
          return 'Task details must be at least 8 characters long and cannot be only spaces.';
        }
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    const errorMessage = validate(id, value);
    setErrors({ ...errors, [id]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/user/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      // navigate('/task');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  // Show task add popup
  const addTask = () => {
    setShowTaskPopup(true);
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((err) => err === '') &&
      Object.values(formData).every((value) => value.trim() !== '')
    );
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 p-4 bg-teal-950">

          <button
            onClick={() => addTask()}
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:bg-green-600 disabled:opacity-80">
            Create Task
          </button>

          {/* {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        ))} */}
        </div>
      </DndContext>
      {showTaskPopup && (
        <div className='p-3 max-w-lg mx-auto'>
          <h1 className='text-3xl text-center font-semibold my-7'>Add Task</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Task name'
              id='taskName'
              autoComplete="off"
              value={formData.taskName}
              required
              className='bg-slate-100 p-3 rounded-lg'
              onChange={handleChange}
            />
            {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}

            <input
              type='text'
              placeholder='Task Details'
              id='details'
              autoComplete="off"
              value={formData.details}
              required
              className='bg-slate-100 p-3 rounded-lg'
              onChange={handleChange}
            />
            {errors.details && <p className="text-red-500 text-sm">{errors.details}</p>}
         {/* Add task button */}
            <button
              disabled={loading || !isFormValid()}
              onClick={() => setShowTaskPopup(false)}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Add Task'}
            </button>
        {/* Close button */}
            <button
              onClick={() => setShowTaskPopup(false)}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {'Close'}
            </button>
          </form>
          <p className='text-red-700 text-center mt-5'>
            {error ? error.message || 'Something went wrong!' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
