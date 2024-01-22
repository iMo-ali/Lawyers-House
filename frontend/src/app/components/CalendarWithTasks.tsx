// ./src/app/components/CalendarWithTasks.tsx
"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import TaskView from "./TaskView";
import "react-calendar/dist/Calendar.css";
import "./CalendarWithTasks.css"; // Ensure your custom CSS is imported

const CalendarWithTasks = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [tasks, setTasks] = useState([
    { date: "2024-01-14", description: "Example Task 1" },
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State to manage panel visibility

  const handleDayClick = (value: React.SetStateAction<Date>) => {
    setSelectedDay(value);
    setIsPanelOpen(true); // Open panel when a day is clicked
  };

  const tasksForSelectedDay = tasks.filter(
    (task) => new Date(task.date).toDateString() === selectedDay.toDateString()
  );

  const addTask = (description: any) => {
    setTasks([...tasks, { date: selectedDay.toDateString(), description }]);
  };

  const removeTask = (taskToRemove: { date: string; description: string }) => {
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  const formattedSelectedDay = selectedDay.toDateString();

  return (
    <div className="calendar-tasks-container flex">
      <div className="calendar-wrapper">
        <Calendar onClickDay={handleDayClick} value={selectedDay} />
      </div>
      {isPanelOpen && (
        <div className="task-view-wrapper">
          <button
            className="close-panel-btn"
            onClick={() => setIsPanelOpen(false)}>
            Close
          </button>
          <TaskView
            selectedDay={formattedSelectedDay}
            tasks={tasksForSelectedDay}
            addTask={addTask}
            removeTask={removeTask}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarWithTasks;
