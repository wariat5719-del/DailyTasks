import { useState } from 'react'
import './App.css'

function App() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Nauczyć się podstaw Reacta', done: false },
    { id: 2, text: 'Zrobić pierwszy komponent', done: true },
    { id: 3, text: 'Dodać własne zadanie', done: false },
    { id: 4, text: 'Nauczyć się obsługi checkboxa', done: false },
  ])

  const [filter, setFilter] = useState('all')

  const handleAddTask = () => {

    if (taskInput.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: taskInput,
      done: false,
    }

    setTasks([...tasks, newTask])
    setTaskInput('')
  }

  const toggleTaskDone = (id: number) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  )

  setTasks(updatedTasks)
}

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">System zarządzania zadaniami</h1>
        <p className="description">Uczę się Reacta krok po kroku</p>
        <p className="subtitle">Moja pierwsza aplikacja w React</p>

        <div className="task-form">
          <input
            type="text"
            placeholder="Dodaj zadanie do wykonania..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="task-input"
          />
          <button onClick={handleAddTask} className="add-button">
            Dodaj
          </button>
        </div>

        <div className="task-list">
  {tasks.map((task) => (
    <div key={task.id} className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTaskDone(task.id)}
        />
        <span className={task.done ? 'task-done' : ''}>{task.text}</span>
      </label>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default App

