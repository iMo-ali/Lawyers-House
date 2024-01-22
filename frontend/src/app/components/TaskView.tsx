import React, { useState } from "react";
import "./TaskView.css";

interface TaskViewProps {
  selectedDay: string;
  tasks: { date: string; description: string }[];
  addTask: (description: string) => void;
  removeTask: (task: { date: string; description: string }) => void;
}

const TaskView: React.FC<TaskViewProps> = ({
  selectedDay,
  tasks,
  addTask,
  removeTask,
}) => {
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    addTask(newTaskDescription);
    setNewTaskDescription(""); // Reset input after adding
  };

  return (
    <div>
      <h2>Tasks for {selectedDay}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.description}
            <button onClick={() => removeTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="New Task Description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskView;
