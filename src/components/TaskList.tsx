import React from 'react'
import { Task } from '../types/task.types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  readonly tasks: readonly Task[]
  onToggle: (id: string, currentStatus: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks-message">
        ✨ No tasks yet. Add your first task above!
      </div>
    )
  }

  return (
    <div className="tasks-container">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}