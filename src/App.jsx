import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Create project structure",
      priority: "High",
      completed: true,
    },
    {
      id: 2,
      title: "Build task tracker interface",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Connect database",
      priority: "Low",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = (event) => {
    event.preventDefault();

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      priority: "Medium",
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Task Tracker</h1>
          <p>Organize your work and stay productive.</p>
        </div>

        <div className="header-badge">
          {pendingTasks} Pending
        </div>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </section>

        <section className="task-section">
          <div className="section-header">
            <div>
              <h2>My Tasks</h2>
              <p>Create and manage your daily tasks.</p>
            </div>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a new task..."
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>

          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Create your first task to get started.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task.id}
                >
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <div>
                      <h3>{task.title}</h3>

                      <span
                        className={`priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;