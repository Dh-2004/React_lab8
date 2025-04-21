import { useState } from 'react';

import './App.css';

function ReminderApp() {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      taskName,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setDueDate('');
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Reminder App</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div>
              <span>{task.taskName} - {task.dueDate}</span>
              <button onClick={() => toggleCompletion(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReminderApp;