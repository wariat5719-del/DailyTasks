
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3001
const tasksFile = path.join(__dirname, 'tasks.json')

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

// Odczyt zadań
app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'))
  res.json(tasks)
})

// Dodawanie zadania
app.post('/tasks', (req, res) => {
  const newTask = req.body
  const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'))

  tasks.push(newTask)
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2))

  res.status(201).json(newTask)
})

// Usuwanie zadania
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'))

  tasks = tasks.filter((task) => task.id !== id)
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2))

  res.json({ success: true })
})

// Zmiana statusu zadania
app.patch('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const { done } = req.body
  let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'))

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done } : task
  )

  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2))

  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`)
})
