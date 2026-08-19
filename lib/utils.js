import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatTimeLeft(targetDate) {
  if (!targetDate) return null
  const difference = +new Date(targetDate) - +new Date()
  
  if (difference <= 0) {
    return { expired: true, text: 'Launching soon' }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / 1000 / 60) % 60)
  
  if (days > 0) {
    return { expired: false, text: `${days}d ${hours}h left`, days, hours, minutes }
  }
  return { expired: false, text: `${hours}h ${minutes}m left`, days, hours, minutes }
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function truncateText(text, length = 120) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
