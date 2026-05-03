import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types'

const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

const handleResponse = <T>(response: AxiosResponse<T>): AxiosResponse<T> => response
const handleError = (error: unknown): Promise<never> => {
  console.error('API Error:', error)
  return Promise.reject(error)
}

apiClient.interceptors.response.use(handleResponse, handleError)

export const taskApi = {
  getAll: (): Promise<AxiosResponse<Task[]>> => {
    return apiClient.get<Task[]>('/tasks')
  },

  getById: (id: string): Promise<AxiosResponse<Task>> => {
    return apiClient.get<Task>(`/tasks/${id}`)
  },

  create: (task: CreateTaskInput): Promise<AxiosResponse<Task>> => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    return apiClient.post<Task>('/tasks', newTask)
  },

  update: (id: string, updates: UpdateTaskInput): Promise<AxiosResponse<Task>> => {
    return apiClient.patch<Task>(`/tasks/${id}`, updates)
  },

  delete: (id: string): Promise<AxiosResponse<void>> => {
    return apiClient.delete(`/tasks/${id}`)
  }
}