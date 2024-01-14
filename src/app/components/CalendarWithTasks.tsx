// ./src/app/components/CalendarWithTasks.tsx
"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TaskView from './TaskView';
import 'react-calendar/dist/Calendar.css';
import './CalendarWithTasks.css';

const CalendarWithTasks = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [tasks, setTasks] = useState([{ date: '2024-01-14', description: 'Example Task 1' }]);

  const handleDayClick = (value) => {
    setSelectedDay(value);
  };

  const tasksForSelectedDay = tasks.filter(task => 
    new Date(task.date).toDateString() === selectedDay.toDateString()
  );

  const addTask = (description) => {
    setTasks([...tasks, { date: selectedDay.toDateString(), description }]);
  };

  const removeTask = (taskToRemove) => {
    setTasks(tasks.filter(task => task !== taskToRemove));
  };

  const formattedSelectedDay = selectedDay.toDateString();

  return (
    <div className="calendar-tasks-container">
      <div className="calendar-wrapper">
        <Calendar onClickDay={handleDayClick} value={selectedDay} />
      </div>
      <div className="task-view-wrapper">
        <TaskView 
          selectedDay={formattedSelectedDay} 
          tasks={tasksForSelectedDay} 
          addTask={addTask} 
          removeTask={removeTask}
        />
      </div>
    </div>
  );
};

export default CalendarWithTasks;
