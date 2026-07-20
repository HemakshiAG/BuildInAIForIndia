import React from 'react'
import clsx from 'clsx'

interface StatCardProps {
  icon?: React.ReactNode
  label: string
  value: string | number
  trend?: 'up' | 'down'
  trendValue?: number
  suffix?: string
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, trendValue, suffix, className }) => {
  return (
    <div className={clsx('glass p-6 rounded-2xl', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {icon && <div className="mb-3 text-primary">{icon}</div>}
          <p className="text-text-light text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-text number">{value}{suffix && <span className="text-xl font-semibold">{suffix}</span>}</p>
          {trend && trendValue !== undefined && (
            <p className={clsx('text-sm mt-2 font-medium', trend === 'up' ? 'text-success' : 'text-danger')}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}%
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
