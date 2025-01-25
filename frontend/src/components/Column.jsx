import React from 'react';
import Task from './Task.jsx'
import { useDroppable } from '@dnd-kit/core';


const Column = ({ column, tasks }) => {
  const {setNodeRef} = useDroppable({
    id:column.id
   })


  return (
    <div  
    ref={setNodeRef}    
      className="flex-1 bg-teal-800 rounded-md p-4 shadow-md h-screen"
    >
      <h3 className="text-xl font-semibold mb-4 text-neutral-50">{column.title}</h3>
        <div className="space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;