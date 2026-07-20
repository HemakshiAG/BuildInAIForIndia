'use client'

import React, { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      startValue += increment
      if (startValue >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(startValue))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
