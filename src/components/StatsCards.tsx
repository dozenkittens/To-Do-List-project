import React from 'react'
import { Stats } from '../types/task.types'

export const StatsCards: React.FC<Stats> = ({ total, completed, active }) => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-number">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Completed</div>
        <div className="stat-number">{completed}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Active</div>
        <div className="stat-number">{active}</div>
      </div>
    </div>
  )
}