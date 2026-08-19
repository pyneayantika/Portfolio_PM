'use client'

import { Bot, User, Sparkles } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
        isUser
          ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest'
          : 'bg-teal text-parchment dark:bg-teal-light dark:text-forest shadow'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
        isUser
          ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest-deep rounded-tr-none font-medium'
          : 'bg-parchment-light dark:bg-forest-surface text-forest dark:text-parchment border border-sand/50 dark:border-forest-light rounded-tl-none'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="block text-[10px] opacity-60 mt-1 text-right font-mono">
          {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}
