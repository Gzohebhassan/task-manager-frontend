import React, { useState } from 'react';
import { useDrag } from 'react-dnd';  // Hook for drag functionality
import { updateTask as updateTaskAPI, deleteTask } from '../api/tasks';  // Import API function

const Task = ({ task, onDeleteTask, onEditTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = async () => {
    const token = localStorage.getItem('token');
    if (isEditing && newTitle.trim() !== '' && token) {
      try {
        await updateTaskAPI(task._id, { title: newTitle }, token);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    deleteTask(task._id, token);
  };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="task"
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onClick={(e) => e.stopPropagation()}  // Prevent drag while editing
        />
      ) : (
        <span>{task.title}</span>
      )}

      <div className="task-actions">
        <button className="task-edit-btn" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button className="task-delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
