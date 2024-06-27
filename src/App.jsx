import React, { useCallback } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [inProgress, setInProgress] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);

  const [task, setTask] = React.useState([]);
  const [status, setStatus] = React.useState("PENDING");

  // Add todos
  const handleSubmit = (e) => {
    e.preventDefault();
    // If no task in input then return
    if (!task) return;

    if (status === "PENDING") {
      setTodos((prev) => [...prev, { name: task, status }]);
    } else if (status === "IN_PROGRESS") {
      setInProgress((prev) => [...prev, { name: task, status }]);
    } else {
      setCompleted((prev) => [...prev, { name: task, status }]);
    }

    setTask("");
    setStatus("PENDING");
  };

  // Delete todos
  const handleDelete = (idx, type) => {
    if (type === "todo") {
      const filtered = todos?.filter((_, i) => idx !== i);
      setTodos(filtered);
    } else if (type === "inprogress") {
      const filtered = inProgress?.filter((_, i) => idx !== i);
      setInProgress(filtered);
    } else {
      const filtered = completed?.filter((_, i) => idx !== i);
      setCompleted(filtered);
    }
  };

  return (
    <div className="app">
      <TaskForm
        value={task}
        onChange={useCallback((e) => setTask(e.target.value), [])}
        onSubmit={handleSubmit}
        status={status}
        onSelect={(e) => setStatus(e.target.value)}
      />
      <main className="app_main">
        <section className="task_column">
          <div className="task_column_header">
            <h1>To-do</h1>
          </div>
          <div className="todo_container">
            {todos?.map((todo, i) => (
              <div className="todo_item" key={i}>
                <p>{todo.name}</p>
                <div>
                  <button
                    onClick={() => {
                      setInProgress((prev) => [...prev, todo]);

                      const filteredTodos = todos?.filter((_, k) => i !== k);
                      setTodos(filteredTodos);
                    }}
                  >
                    in progress
                  </button>
                  <button onClick={() => handleDelete(i, "todo")}>
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="task_column">
          <div className="task_column_header">
            <h1>In progress</h1>
          </div>
          <div className="todo_container">
            {inProgress?.map((todo, i) => (
              <div className="todo_item" key={i}>
                <p>{todo.name}</p>
                <div>
                  <button
                    onClick={() => {
                      setTodos((prev) => [...prev, todo]);

                      const filteredInProgress = inProgress?.filter(
                        (_, k) => i !== k
                      );
                      setInProgress(filteredInProgress);
                    }}
                  >
                    mark to do
                  </button>
                  <button
                    onClick={() => {
                      setCompleted((prev) => [...prev, todo]);

                      const filteredInProgress = inProgress?.filter(
                        (_, k) => i !== k
                      );
                      setInProgress(filteredInProgress);
                    }}
                  >
                    mark completed
                  </button>
                  <button onClick={() => handleDelete(i, "inprogress")}>
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="task_column">
          <div className="task_column_header">
            <h1>Completed</h1>
          </div>
          <div className="todo_container">
            {completed?.map((todo, i) => (
              <div className="todo_item" key={i}>
                <p>{todo.name}</p>
                <div>
                  <button
                    onClick={() => {
                      setInProgress((prev) => [...prev, todo]);

                      const filteredCompleted = completed?.filter(
                        (_, k) => i !== k
                      );
                      setCompleted(filteredCompleted);
                    }}
                  >
                    mark incomplete
                  </button>
                  <button onClick={() => handleDelete(i, "completed")}>
                    delete
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
