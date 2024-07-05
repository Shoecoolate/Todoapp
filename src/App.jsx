import React, { useCallback, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";

const App = () => {
  // variables para imanage tung tasks sa different statuses
  const [todos, setTodos] = React.useState([]);
  const [inProgress, setInProgress] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);

  // variables para imanage tung form inputs
  const [task, setTask] = React.useState("");
  const [status, setStatus] = React.useState("PENDING");
  const [deadline, setDeadline] = React.useState("");

  // variable para sa progress bar
  const [progress, setProgress] = React.useState({
    completed: 0,
    inProgress: 0,
    overdueToDo: 0,
    overdueInProgress: 0,
  });

  // variable para imanage ang notified tasks
  const [notifiedTasks, setNotifiedTasks] = React.useState([]);

  // useEffect: mao ning magcalculate sa progress bar percentages pag magchange ang tasks
  useEffect(() => {
    const totalTasks = todos.length + inProgress.length + completed.length;
    const completedPercentage = totalTasks ? (completed.length / totalTasks) * 100 : 0;
    const inProgressPercentage = totalTasks ? (inProgress.length / totalTasks) * 50 : 0; // Half the length of the green bar

    // Calculate overdue tasks
    const overdueToDo = todos.filter((task) => new Date(task.deadline) < new Date()).length;
    const overdueInProgress = inProgress.filter((task) => new Date(task.deadline) < new Date()).length;

    // Calculate overdue task percentages
    const overdueToDoPercentage = overdueToDo ? (overdueToDo / totalTasks) * 25 : 0; // Half of the orange bar
    const overdueInProgressPercentage = overdueInProgress ? (overdueInProgress / totalTasks) * 50 : 0; // Same length as orange bar

    setProgress({
      completed: completedPercentage,
      inProgress: inProgressPercentage,
      overdueToDo: overdueToDoPercentage,
      overdueInProgress: overdueInProgressPercentage,
    });
  }, [todos, inProgress, completed]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    // Check if the deadline is set for PENDING and IN_PROGRESS tasks
    if ((status === "PENDING" || status === "IN_PROGRESS") && !deadline) {
      alert("Please set a deadline for the task.");
      return;
    }

    const newTask = { name: task, status, deadline };

    // Add the new task to the appropriate list
    if (status === "PENDING") {
      setTodos((prev) => [...prev, newTask]);
    } else if (status === "IN_PROGRESS") {
      setInProgress((prev) => [...prev, newTask]);
    } else {
      setCompleted((prev) => [...prev, newTask]);
    }

    // Reset form inputs
    setTask("");
    setStatus("PENDING");
    setDeadline("");
  };

  // Function to handle task deletion
  const handleDelete = (idx, type) => {
    if (type === "todo") {
      setTodos(todos.filter((_, i) => idx !== i));
    } else if (type === "inprogress") {
      setInProgress(inProgress.filter((_, i) => idx !== i));
    } else {
      setCompleted(completed.filter((_, i) => idx !== i));
    }
  };

  // Function to check deadlines and notify the user
  const checkDeadlines = () => {
    const now = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    [...todos, ...inProgress].forEach((task) => {
      if (notifiedTasks.includes(task.name)) return;
      if (task.deadline && (task.deadline === now || task.deadline === tomorrowStr)) {
        alert(
          `IMPORTANT: TASK DUE ${
            task.deadline === now ? "TODAY" : "TOMORROW"
          }. Please do it ASAP`
        );
        setNotifiedTasks((prev) => [...prev, task.name]);
      }
    });
  };

  // useEffect to check deadlines when tasks change
  useEffect(() => {
    checkDeadlines();
  }, [todos, inProgress]);

  return (
    <div className="app">
      <TaskForm
        value={task}
        onChange={useCallback((e) => setTask(e.target.value), [])}
        onSubmit={handleSubmit}
        status={status}
        onSelect={(e) => setStatus(e.target.value)}
        deadline={deadline}
        onDeadlineChange={(e) => setDeadline(e.target.value)}
      />
      <div className="progress-bar">
        {/* Render progress bars with calculated widths */}
        <div className="progress overdue-todo" style={{ width: `${progress.overdueToDo}%` }}></div>
        <div className="progress overdue-inprogress" style={{ width: `${progress.overdueInProgress}%` }}></div>
        <div className="progress in-progress" style={{ width: `${progress.inProgress}%` }}></div>
        <div className="progress completed" style={{ width: `${progress.completed}%` }}></div>
      </div>
      <main className="app_main">
        {/* To-do section */}
        <section className="task_column">
          <div className="task_column_header">
            <h1>To-do</h1>
          </div>
          <div className="tasks_container">
            {todos.map((todo, i) => (
              <div
                className="todo_item"
                key={i}
                style={{ color: new Date(todo.deadline) < new Date() ? "red" : "black" }}
              >
                <p>{todo.name}</p>
                <input
                  type="text"
                  className="deadline_text"
                  value={todo.deadline}
                  readOnly
                />
                <div className="todo_item_buttons">
                  <button
                    onClick={() => {
                      setInProgress((prev) => [...prev, todo]);
                      setTodos(todos.filter((_, k) => i !== k));
                    }}
                  >
                    In Progress
                  </button>
                  <button onClick={() => handleDelete(i, "todo")}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-progress section */}
        <section className="task_column">
          <div className="task_column_header">
            <h1>In progress</h1>
          </div>
          <div className="tasks_container">
            {inProgress.map((todo, i) => (
              <div
                className="todo_item"
                key={i}
                style={{ color: new Date(todo.deadline) < new Date() ? "red" : "black" }}
              >
                <p>{todo.name}</p>
                <input
                  type="text"
                  className="deadline_text"
                  value={todo.deadline}
                  readOnly
                />
                <div className="todo_item_buttons">
                  <button
                    onClick={() => {
                      setTodos((prev) => [...prev, todo]);
                      setInProgress(inProgress.filter((_, k) => i !== k));
                    }}
                  >
                    To do
                  </button>
                  <button
                    onClick={() => {
                      setCompleted((prev) => [...prev, todo]);
                      setInProgress(inProgress.filter((_, k) => i !== k));
                    }}
                  >
                    Completed
                  </button>
                  <button onClick={() => handleDelete(i, "inprogress")}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed section */}
        <section className="task_column">
          <div className="task_column_header">
            <h1>Completed</h1>
          </div>
          <div className="tasks_container">
            {completed.map((todo, i) => (
              <div className="todo_item" key={i}>
                <p>{todo.name}</p>
                <input
                  type="text"
                  className="deadline_text"
                  value={todo.deadline}
                  readOnly
                />
                <div className="todo_item_buttons">
                  <button
                    onClick={() => {
                      setInProgress((prev) => [...prev, todo]);
                      setCompleted(completed.filter((_, k) => i !== k));
                    }}
                  >
                    Incomplete
                  </button>
                  <button onClick={() => handleDelete(i, "completed")}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
