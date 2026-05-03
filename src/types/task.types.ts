export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export type TaskId = string
export type Timestamp = string

export interface BaseTask {
  readonly id: TaskId
  text: string
  completed: boolean
  createdAt: Timestamp
}

export interface PrioritizedTask {
  priority: TaskPriority
}

export type Task = BaseTask & PrioritizedTask

export type TaskFilter = 'all' | TaskStatus.ACTIVE | TaskStatus.COMPLETED

export type SortOrder = 'asc' | 'desc'

export type TaskTuple = [TaskId, string, boolean, TaskPriority]

export type TaskMatrix = Task[][]

export type ReadonlyTaskArray = readonly Task[]

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface Stats {
  total: number
  completed: number
  active: number
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>

export type LoggerFunction = (message: any) => void