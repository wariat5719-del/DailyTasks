const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(express.json())

// GET /tasks
app.get('/tasks', (req, res) => {
  const data = fs.readFileSync('tasks.json')
  const tasks = JSON.parse(data)

  res.json(tasks)
})

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`)
})
app.post('/tasks', (req, res) => {
  const newTask = req.body

  const data = fs.readFileSync('tasks.json')
  const tasks = JSON.parse(data)

  tasks.push(newTask)

  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))

  res.json(newTask)
})
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)

  const data = fs.readFileSync('tasks.json')
  let tasks = JSON.parse(data)

  tasks = tasks.filter((task) => task.id !== id)

  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))

  res.json({ success: true })
})
app.patch('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const { done } = req.body

  const data = fs.readFileSync('tasks.json')
  let tasks = JSON.parse(data)

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done } : task
  )

  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))

  res.json({ success: true })
})