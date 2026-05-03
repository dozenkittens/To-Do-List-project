import React, { useState } from 'react'
import { TaskPriority } from '../types/task.types'

interface AddTaskFormProps {
  onAdd: (text: string, priority: TaskPriority) => Promise<void>
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!text.trim()) return
    setIsSubmitting(true)
    try {
      await onAdd(text.trim(), TaskPriority.MEDIUM)
      setText('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="add-task-section" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSubmitting}
        autoComplete="off"
      />
      <button type="submit" className="add-btn" disabled={isSubmitting}>
        + Add Task
      </button>
    </form>
  )
}