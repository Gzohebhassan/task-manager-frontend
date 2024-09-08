import React from 'react';
import TaskBoard from '../components/TaskBoard';

const TaskBoardPage = () => {
  return (
    <div className="task-board-page">
      <TaskBoard />  {/* Render the main task board component */}
    </div>
  );
};

export default TaskBoardPage;
