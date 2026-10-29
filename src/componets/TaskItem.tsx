type Task = {
  id: number
  text: string
  done: boolean
}

type TaskItemProps = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        <span className={task.done ? 'task-done' : ''}>
          {task.text}
        </span>
      </label>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        🗑️
      </button>
    </div>
  )
}

export default TaskItem