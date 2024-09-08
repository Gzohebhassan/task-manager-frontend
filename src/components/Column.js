import React from 'react';
import { useDrop } from 'react-dnd';  // Hook for drop functionality
import Task from './Task';

const Column = ({ column, tasks, moveTask, onDeleteTask, onEditTask }) => {
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, column.id),  // When a task is dropped in this column
  }));

  return (
    <div ref={drop} className="column">
      <h2>{column.title}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}  // Pass the delete handler
          onEditTask={onEditTask}      // Pass the edit handler
        />
      ))}
    </div>
  );
};

export default Column;
