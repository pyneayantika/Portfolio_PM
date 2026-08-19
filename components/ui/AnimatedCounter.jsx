'use client'

import { useState, useEffect, useRef } from 'react'

export default function AnimatedCounter({ value, duration = 1800, prefix = '', suffix = '', decimals = null }) {
  const isDecimal = decimals !== null ? decimals > 0 : String(value).includes('.')
  const decimalPlaces = decimals !== null ? decimals : (isDecimal ? (String(value).split('.')[1]?.length || 1) : 0)
  
  const numericTarget = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0

  const [count, setCount] = useState(isDecimal ? '0.0' : 0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let startTime = null
    const startValue = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const rawCurrent = startValue + (numericTarget - startValue) * easeOut
      
      if (isDecimal) {
        setCount(rawCurrent.toFixed(decimalPlaces))
      } else {
        setCount(Math.floor(rawCurrent))
      }

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(isDecimal ? numericTarget.toFixed(decimalPlaces) : numericTarget)
      }
    }

    window.requestAnimationFrame(step)
  }, [hasAnimated, numericTarget, duration, isDecimal, decimalPlaces])

  const formattedValue = isDecimal 
    ? count 
    : (typeof count === 'number' ? count.toLocaleString('en-US') : count)

  return (
    <span ref={elementRef} className="font-mono font-semibold tracking-tight">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
