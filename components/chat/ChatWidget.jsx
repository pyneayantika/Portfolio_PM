'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles, Bot, Loader2, RefreshCw } from 'lucide-react'
import ChatMessage from './ChatMessage'
import SuggestedQuestions from './SuggestedQuestions'
import { trackEvent } from '@/lib/analytics'

export default function ChatWidget({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Ayantika's AI twin. Ask me anything about my PM transition, projects like RAGBench, ESG data architecture, or product frameworks.",
      timestamp: new Date().toISOString(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => (typeof window !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `session_${Date.now()}`)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      trackEvent('chat_opened', { sessionId }, 'chat')
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, sessionId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, loading])

  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input
    if (!query.trim() || loading) return

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toISOString(),
    }

    const newHistory = [...messages, userMessage]
    setMessages(newHistory)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.slice(-10).map(m => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      })

      const data = await res.json()
      
      const assistantMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Thanks for your question! Feel free to connect directly with Ayantika on LinkedIn.",
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: "I ran into a brief hiccup. Please try again or reach out directly to Ayantika via email!",
          timestamp: new Date().toISOString(),
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat reset! What would you like to explore next about Ayantika's PM background?",
        timestamp: new Date().toISOString(),
      }
    ])
  }

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow-2xl hover:scale-105 hover:bg-green-dark transition-all duration-300 flex items-center gap-2.5 font-semibold text-sm group"
          aria-label="Open Ask Ayantika AI Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline">Ask Ayantika</span>
        </button>
      )}

      {/* Slide-over Chat Panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-parchment-card dark:bg-forest-surface shadow-2xl border-l border-sand/60 dark:border-forest-light flex flex-col animate-slide-up sm:animate-none">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sand/40 dark:border-forest-light flex items-center justify-between bg-parchment-light/50 dark:bg-forest-surface">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green/10 dark:bg-green-bright/20 flex items-center justify-center text-green dark:text-green-bright">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-forest dark:text-parchment flex items-center gap-1.5">
                  <span>Ask Ayantika</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-green-mint text-green-dark dark:bg-green-dark/40 dark:text-green-bright">
                    AI Twin
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-forest/60 dark:text-parchment/60">
                  Powered by Groq • First-person Q&A
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 text-forest/50 dark:text-parchment/50 hover:text-forest dark:hover:text-parchment rounded-lg transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-2 text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-sand/10 dark:bg-forest-deep/40"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-forest/60 dark:text-parchment/60 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-green dark:text-green-bright" />
                <span>Ayantika is thinking...</span>
              </div>
            )}

            {messages.length === 1 && (
              <div className="pt-4 border-t border-sand/30 dark:border-forest-light/40">
                <SuggestedQuestions onSelectQuestion={(q) => handleSendMessage(q)} />
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-sand/40 dark:border-forest-light bg-parchment-light/80 dark:bg-forest-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my PM frameworks, projects..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-parchment dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment placeholder:text-forest/40 dark:placeholder:text-parchment/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-dark transition-all"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
