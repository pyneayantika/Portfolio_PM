'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { formatTimeLeft } from '@/lib/utils'

export default function CountdownBadge({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(targetDate))

  useEffect(() => {
    if (!targetDate) return

    const updateTimer = () => {
      setTimeLeft(formatTimeLeft(targetDate))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // update every minute

    return () => clearInterval(interval)
  }, [targetDate])

  if (!timeLeft) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-amber-soft text-amber-dark dark:bg-amber/20 dark:text-amber border border-amber/30">
      <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
      <span>{timeLeft.text}</span>
    </span>
  )
}
