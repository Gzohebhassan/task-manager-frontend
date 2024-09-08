import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import './TaskBoard.css'; 
import Column from './Column';  // Import your Column component
import { fetchTasks, updateTask, createTask, deleteTask } from '../api/tasks';  // Import your API functions

const TaskBoard = () => {
  const [columns] = useState([
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Done' }
  ]);
  
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks();  // Fetch tasks from API
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const moveTask = (taskId, targetColumnId) => {
    // Update task order locally
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? { ...task, columnId: targetColumnId } // Update columnId to new column
        : task
    );

    // Update the state with the new task order
    setTasks(updatedTasks);
  };

  const handleAddTask = async () => {
    const title = prompt('Enter task title:');
    if (!title) return; // Cancelled or empty input
  
    // Prompt user to enter column name
    const columnName = prompt('Enter column name (To Do, In Progress, Done):');
    const validColumns = ['To Do', 'In Progress', 'Done'];
  
    if (!validColumns.includes(columnName)) return; // Invalid column name
  
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const newTask = { title, column: columnName }; // Use column name
        const { data } = await createTask(newTask, token); // API call to create task
        setTasks([...tasks, data]); // Update frontend state
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);  // Delete from backend
      setTasks(tasks.filter(task => task.id !== taskId));  // Remove from frontend state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await updateTask(taskId, { title: newTitle }, token);
        setTasks(tasks.map(task =>
          task._id === taskId ? { ...task, title: newTitle } : task
        ));
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token
    navigate('/login');  // Redirect to the login page
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        <div className="task-board-header">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="task-search"
          />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
        <div className="task-columns">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.column === column.title && task.title.includes(searchQuery))}
              moveTask={moveTask}
              onDeleteTask={handleDeleteTask}  // Pass down delete handler
              onEditTask={handleEditTask}  // Pass down edit handler
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
