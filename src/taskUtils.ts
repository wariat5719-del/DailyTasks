
export type Task = {
  id: number
  text: string
  done: boolean
}

export function filterTasks(
  tasks: Task[],
  filter: 'all' | 'active' | 'done'
): Task[] {
  if (filter === 'active') {
    return tasks.filter((task) => !task.done)
  }

  if (filter === 'done') {
    return tasks.filter((task) => task.done)
  }

  return tasks
}

export function calculateProgress(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 0
  }

  const completed = tasks.filter((task) => task.done).length

  return Math.round((completed / tasks.length) * 100)
}
