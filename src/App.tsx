import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { StatsCards } from './components/StatsCards'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'
import { Task, TaskPriority } from './types/task.types'
import { taskApi } from './api/taskApi'
import { calculateStats, validateAndProcessTask } from './utils/helpers'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handleUnknownError = (err: unknown): void => {
    if (err instanceof Error) {
      setError(err.message)
    } else if (typeof err === 'string') {
      setError(err)
    } else {
      setError('An unknown error occurred')
    }
  }

  const fetchTasks = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await taskApi.getAll()
      setTasks(response.data)
      setError(null)
    } catch (err: unknown) {
      handleUnknownError(err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = useCallback(async (text: string, priority: TaskPriority): Promise<void> => {
    try {
      const newTask = validateAndProcessTask(text, priority)
      const response = await taskApi.create(newTask)
      setTasks(prev => [...prev, response.data])
    } catch (err: unknown) {
      handleUnknownError(err)
    }
  }, [])

  const toggleTask = useCallback(async (id: string, currentStatus: boolean): Promise<void> => {
    try {
      const updatedTask = await taskApi.update(id, { completed: !currentStatus })
      setTasks(prev => prev.map(task => task.id === id ? updatedTask.data : task))
    } catch (err: unknown) {
      handleUnknownError(err)
    }
  }, [])

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    try {
      await taskApi.delete(id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err: unknown) {
      handleUnknownError(err)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [])

  const { total, completed, active } = calculateStats(tasks)

  if (loading) {
    return (
      <div className="dashboard">
        <div className="main-content">
          <div className="greeting">
            <h1>Hello, Alex!</h1>
          </div>
          <div style={{ textAlign: 'center', padding: '60px' }}>Loading tasks...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="main-content">
        <Header />
        <StatsCards total={total} completed={completed} active={active} />
        <AddTaskForm onAdd={addTask} />
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', color: '#991B1B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            ⚠️ {error}
            <button onClick={() => fetchTasks()} style={{ background: '#991B1B', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer' }}>Retry</button>
          </div>
        )}
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  )
}

export default App