import React, { useState } from 'react'
import { Task } from '../types/task.types'

interface TaskItemProps {
  task: Task
  onToggle: (id: string, currentStatus: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isToggling, setIsToggling] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleToggle = async (): Promise<void> => {
    setIsToggling(true)
    try {
      await onToggle(task.id, task.completed)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true)
    try {
      await onDelete(task.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isToggling}
        />
        <span className="checkbox-style">
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} fill="none">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>
      <span className="task-text">{task.text}</span>
      <button
        className="delete-task"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  )
}