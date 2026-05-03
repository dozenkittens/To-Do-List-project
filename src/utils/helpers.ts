import { Task, TaskPriority, Stats, CreateTaskInput } from '../types/task.types'

export function calculateStats(tasks: Task[]): Stats
export function calculateStats(total: number, completed: number, active: number): Stats
export function calculateStats(
  tasksOrTotal: Task[] | number,
  completed?: number,
  active?: number
): Stats {
  if (Array.isArray(tasksOrTotal)) {
    const tasks = tasksOrTotal as Task[]
    const total = tasks.length
    const completedCount = tasks.filter(t => t.completed).length
    const activeCount = total - completedCount
    return { total, completed: completedCount, active: activeCount }
  } else {
    return {
      total: tasksOrTotal,
      completed: completed!,
      active: active!
    }
  }
}

export const validateAndProcessTask = (text: string, priority: TaskPriority): CreateTaskInput => {
  if (!text || text.trim().length === 0) {
    throw new Error('Task text cannot be empty')
  }
  if (text.length > 200) {
    throw new Error('Task text is too long (maximum 200 characters)')
  }
  return {
    text: text.trim(),
    completed: false,
    priority: priority
  }
}

export const createTaskFromInput = (text: string, ...options: [TaskPriority, string?]): CreateTaskInput => {
  const [priority] = options
  return {
    text: text.trim(),
    completed: false,
    priority: priority
  }
}

export const mergeTaskUpdates = <T extends Partial<Task>>(original: Task, updates: T): Task => {
  return { ...original, ...updates }
}

export function isValidPriority(value: unknown): value is TaskPriority {
  return typeof value === 'string' && Object.values(TaskPriority).includes(value as TaskPriority)
}

export const formatDate = (date: Date, format?: string): string => {
  const defaultFormat = 'YYYY-MM-DD'
  const usedFormat = format ?? defaultFormat
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return usedFormat
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}