import React from 'react'

import "./App.css"
import TaskForm from "./components/TaskForm";

const App = () => {
  const [todos, setTodos] = React.useState([])
  const [task, setTask] = React.useState([])
  const [status, setStatus] = React.useState("PENDING")
  

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!task) return 
      setTodos((prev) => [...prev, {name: task, status}]);
      setTask("")
      setStatus("PENDING")
  }

  const handleDelete = (idx) => {
    const filtered = todos?.filter((_, i) => idx !== i)
    setTodos(filtered)
  }
  return (
    <div className='app'>
      <TaskForm value={task} onChange={(e) => setTask(e.target.value)} onSubmit={handleSubmit} status={status} onSelect={(e) => setStatus(e.target.value)}/>
      <main className='app_main'>
        <section className='task_column'>
          <div className='task_column_header'>
            <h1>To-do</h1>
          </div>
          <div className='todo_container'>
            {todos?.filter((todo) => todo.status === "PENDING")?.map((todo, i) => 
            <div className='todo_item' key={i}>
              <p>{todo.name}</p>
              <div>
                <button onClick={() => {
                  const updatedTodo = todos.map((todo, k) => {
                    if(i === k) {
                      return {...todo, status: "IN_PROGRESS"}
                    }

                    return todo
                  })
                  setTodos(updatedTodo)
                }}>in progress</button>
                <button onClick={() => handleDelete(i)}>delete</button>
              </div>
            </div>)}
          </div>
        </section>
        
        <section className='task_column'>
          <div className='task_column_header'>
            <h1>In Progress</h1>
          </div>
          <div className='todo_container'>
            {todos?.filter((todo) => todo.status === "IN_PROGRESS")?.map((todo, i) => 
            <div className='todo_item' key={i}>
              <p>{todo.name}</p>
              <div>
                <button  onClick={() => {
                  const updatedTodo = todos.map((todo, k) => {
                    if(i === k) {
                      return {...todo, status: "PENDING"}
                    }

                    return todo
                  })
                  setTodos(updatedTodo)
                }}>Mark todo</button>
                <button onClick={() => {
                  const updatedTodo = todos.map((todo, k) => {
                    if(i === k) {
                      return {...todo, status: "COMPLETED"}
                    }

                    return todo
                  })
                  setTodos(updatedTodo)
                }}>Completed</button>
                <button onClick={() => handleDelete(i)}>delete</button>
              </div>
            </div>)}
          </div>
        </section>

        <section className='task_column'>
          <div className='task_column_header'>
            <h1>Completed</h1>
          </div>
          <div className='todo_container'>
            {todos?.filter((todo) => todo.status === "COMPLETED")?.map((todo, i) => 
            <div className='todo_item' key={i}>
              <p>{todo.name}</p>
              <div>
                <button onClick={() => {
                  const updatedTodo = todos.map((todo, k) => {
                    if(i === k) {
                      return {...todo, status: "IN_PROGRESS"}
                    }

                    return todo
                  })
                  setTodos(updatedTodo)
                }}>Mark incomplete</button>
                <button onClick={() => handleDelete(i)}>delete</button>
              </div>
            </div>)}
          </div>
        </section>
      </main>
    </div>
  )

}

export default App