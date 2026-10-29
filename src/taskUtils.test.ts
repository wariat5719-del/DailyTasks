
import { describe, it, expect } from 'vitest'
import { filterTasks, calculateProgress } from './taskUtils'
import type { Task } from './taskUtils'

const tasks: Task[] = [
  { id: 1, text: 'Nauczyć się Reacta', done: false },
  { id: 2, text: 'Dodać style CSS', done: true },
  { id: 3, text: 'Napisać testy', done: false },
]

describe('filterTasks', () => {
  it('zwraca tylko aktywne zadania', () => {
    const result = filterTasks(tasks, 'active')

    expect(result).toHaveLength(2)
    expect(result.every((task) => !task.done)).toBe(true)
  })

  it('zwraca tylko wykonane zadania', () => {
    const result = filterTasks(tasks, 'done')

    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Dodać style CSS')
  })
})

describe('calculateProgress', () => {
  it('oblicza procent wykonanych zadań', () => {
    expect(calculateProgress(tasks)).toBe(33)
  })

  it('zwraca zero, gdy nie ma zadań', () => {
    expect(calculateProgress([])).toBe(0)
  })
})
