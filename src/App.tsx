
import { useState, useEffect } from 'react'
import './App.css'
import TaskItem from './componets/TaskItem'
import { filterTasks, calculateProgress } from './taskUtils'
import type { Task } from './taskUtils'



function App() {
  const [taskInput, setTaskInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_URL = 'http://localhost:3001/tasks'

  // Pobieranie zadań z backendu
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Nie udało się pobrać zadań')
        }
        return res.json()
      })
      .then((data: Task[]) => {
        setTasks(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Błąd pobierania danych. Sprawdź, czy backend działa.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Dodawanie zadania
  
const handleAddTask = async () => {
  const text = taskInput.trim()

  if (text === '') {
    setInputError('Wpisz treść zadania.')
    return
  }

  setInputError('')

  const newTask: Task = {
    id: Date.now(),
    text,
    done: false,
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })

    if (!res.ok) {
      throw new Error('Nie udało się dodać zadania')
    }

    const data: Task = await res.json()

    setTasks((previousTasks) => [...previousTasks, data])
    setTaskInput('')
    setError(null)
  } catch (err) {
    console.error(err)
    setError('Nie udało się dodać zadania. Sprawdź połączenie z backendem.')
  }
}

  // Zmiana statusu zadania
  const toggleTaskDone = async (id: number) => {
    const task = tasks.find((item) => item.id === id)
    if (!task) return

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !task.done }),
      })

      if (!res.ok) {
        throw new Error('Nie udało się zmienić statusu zadania')
      }

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === id ? { ...item, done: !task.done } : item
        )
      )
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Nie udało się zmienić statusu zadania.')
    }
  }

  // Usuwanie zadania
  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Nie udało się usunąć zadania')
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      )
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Nie udało się usunąć zadania.')
    }
  }

  // Filtrowanie zadań
  const filteredTasks = filterTasks(tasks, filter)

  // Statystyki zadań
  const completedTasks = tasks.filter((task) => task.done).length
  const totalTasks = tasks.length
  const progress = calculateProgress(tasks)

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">System zarządzania zadaniami</h1>
        <p className="description">Uczę się Reacta krok po kroku</p>
        <p className="subtitle">Moja pierwsza aplikacja w React</p>
<div className="progress-section">
  <div className="progress-header">
    <span>Twój postęp </span>
    <span>{completedTasks} / {totalTasks}</span>
  </div>

  <div
    className="progress-track"
    role="progressbar"
    aria-label="Postęp wykonywania zadań"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    />
  </div>

  <p className="progress-caption">
    {progress}% ukończonych zadań
  </p>
</div>
      
<div className="task-form">
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Dodaj zadanie do wykonania..."
      value={taskInput}
      onChange={(event) => {
        setTaskInput(event.target.value)
        if (event.target.value.trim() !== '') {
          setInputError('')
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          void handleAddTask()
        }
      }}
      className="task-input"
      aria-invalid={inputError !== ''}
      aria-describedby={inputError ? 'task-input-error' : undefined}
    />

    {inputError && (
      <p id="task-input-error" className="input-error">
        {inputError}
      </p>
    )}
  </div>

  <button
    onClick={() => void handleAddTask()}
    className="add-button"
  >
    Dodaj
  </button>
</div>


        <div className="filters">
          <button
            className={filter === 'all' ? 'filter-button active-filter' : 'filter-button'}
            onClick={() => setFilter('all')}
          >
            Wszystkie ({tasks.length})
          </button>

          <button
            className={filter === 'active' ? 'filter-button active-filter' : 'filter-button'}
            onClick={() => setFilter('active')}
          >
            Aktywne ({tasks.filter((task) => !task.done).length})
          </button>

          <button
            className={filter === 'done' ? 'filter-button active-filter' : 'filter-button'}
            onClick={() => setFilter('done')}
          >
            Wykonane ({tasks.filter((task) => task.done).length})
          </button>
        </div>

        {error && <p role="alert">{error}</p>}

        {loading ? (
          <p>Ładowanie zadań...</p>
        ) : filteredTasks.length === 0 ? (
          <p>
            {tasks.length === 0
              ? 'Nie masz jeszcze żadnych zadań. Dodaj pierwsze!'
              : 'Brak zadań w tej kategorii.'}
          </p>
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
      </div>
    </div>
  )
}

export default App
