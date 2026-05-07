import { useState, useEffect } from 'react'
import './App.css'
import TaskItem from './componets/TaskItem'

type Task = {
  id: number
  text: string
  done: boolean
}

function App() {
  const [taskInput, setTaskInput] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])

  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')

  const API_URL = 'http://localhost:3001/tasks'

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)
  
  const handleAddTask = () => {
  if (taskInput.trim() === '') return

  const newTask = {
    id: Date.now(),
    text: taskInput,
    done: false,
  }

  fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
    .then((res) => res.json())
    .then((data) => {
      setTasks([...tasks, data])
      setTaskInput('')
    })
}

  const toggleTaskDone = (id: number) => {
  const task = tasks.find((t) => t.id === id)
  if (!task) return

  fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done: !task.done }),
  }).then(() => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  })
}
  const handleDeleteTask = (id: number) => {
  fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE',
  }).then(() => {
    setTasks(tasks.filter((task) => task.id !== id))
  })
}

const filteredTasks = tasks.filter((task) => {
  if (filter === 'active') return !task.done
  if (filter === 'done') return task.done
  return true
})

useEffect(() => {
  fetch('http://localhost:3001/tasks')
    .then((res) => res.json())
    .then((data) => {
      setTasks(data)
      setLoading(false)
    })
    .catch((err) => {
  console.error(err)
  setError('Błąd pobierania danych')
  setLoading(false)
})
}, [])

{loading ? (
  <p>Ładowanie...</p>
) : (
  <div className="task-list">
    {filteredTasks.map((task) => (
      <TaskItem
  key={task.id}
  task={task}
  onToggle={toggleTaskDone}
  onDelete={handleDeleteTask}
/>
    ))}
  </div>
)}

{error && <p>{error}</p>}

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">System zarządzania zadaniami</h1>
        <p className="description">Uczę się Reacta krok po kroku</p>
        <p className="subtitle">Moja pierwsza aplikacja w React</p>

        <div className="task-form">
        <div className="filters">
  <button
    className={filter === 'all' ? 'filter-button active-filter' : 'filter-button'}
    onClick={() => setFilter('all')}
  >
    Wszystkie
  </button>

  <button
    className={filter === 'active' ? 'filter-button active-filter' : 'filter-button'}
    onClick={() => setFilter('active')}
  >
    Aktywne
  </button>

  <button
    className={filter === 'done' ? 'filter-button active-filter' : 'filter-button'}
    onClick={() => setFilter('done')}
  >
    Wykonane
  </button>
</div>
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
  {filteredTasks.map((task) => (
    <div key={task.id} className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTaskDone(task.id)}
        />
        <span className={task.done ? 'task-done' : ''}>
          {task.text}
        </span>
      </label>

      <button
        className="delete-button"
        onClick={() => handleDeleteTask(task.id)}
      >
        🗑️
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default App

