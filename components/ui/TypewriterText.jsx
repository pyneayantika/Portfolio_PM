'use client'

import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 45, delay = 300, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [displayed, started, text, speed, onComplete])

  return (
    <span className="inline">
      {displayed}
      <span className="animate-blink font-light text-green dark:text-green-bright ml-0.5">|</span>
    </span>
  )
}
