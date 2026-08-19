'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Flag, RefreshCw, User, Bot, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function ChatLogsViewer({ adminKey }) {
  const [logsData, setLogsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [flaggedIds, setFlaggedIds] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/moderation?key=${encodeURIComponent(adminKey || 'AyantikaPortfolio2026!')}`)
      const data = await res.json()
      setLogsData(data)
    } catch (err) {
      console.error('Failed to load logs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFlag = (msgId) => {
    setFlaggedIds(prev => 
      prev.includes(msgId) ? prev.filter(id => id !== msgId) : [...prev, msgId]
    )
  }

  const sessions = logsData?.sessions || {}
  const sessionKeys = Object.keys(sessions)

  return (
    <div className="bg-parchment-card dark:bg-forest-surface rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand/40 dark:border-forest-light">
        <div>
          <h3 className="text-xl font-display font-bold text-forest dark:text-parchment">
            Chatbot Moderation & Logs
          </h3>
          <p className="text-xs text-forest/60 dark:text-parchment/60 font-mono">
            {logsData?.total_messages || 0} total messages across {sessionKeys.length} visitor sessions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sand/30 hover:bg-sand/60 dark:bg-forest-light text-forest dark:text-parchment transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-forest/50">
          Loading conversation logs...
        </div>
      ) : sessionKeys.length === 0 ? (
        <div className="text-center py-12 p-6 rounded-xl bg-sand/10 border border-dashed border-sand/40">
          <p className="text-xs font-mono text-forest/60 dark:text-parchment/60">
            No chatbot conversations recorded yet this week.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessionKeys.map((sessionId) => {
            const thread = sessions[sessionId]
            return (
              <div 
                key={sessionId}
                className="p-4 rounded-xl bg-parchment-light/60 dark:bg-forest-deep/60 border border-sand/40 dark:border-forest-light space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-forest/60 dark:text-parchment/60 pb-2 border-b border-sand/30 dark:border-forest-light/40">
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    Session: {sessionId}
                  </span>
                  <span>{thread.length} messages</span>
                </div>

                <div className="space-y-2.5">
                  {thread.map((msg, idx) => {
                    const isFlagged = flaggedIds.includes(msg.id || `${sessionId}_${idx}`) || msg.flagged
                    const isUser = msg.role === 'user'

                    return (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs flex items-start justify-between gap-3 ${
                          isFlagged
                            ? 'bg-error/10 border border-error/30'
                            : isUser
                            ? 'bg-sand/20 dark:bg-forest-surface'
                            : 'bg-green/5 dark:bg-green-bright/5'
                        }`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <span className={`p-1 rounded font-bold uppercase text-[10px] ${
                            isUser ? 'text-teal dark:text-teal-light' : 'text-green dark:text-green-bright'
                          }`}>
                            {isUser ? 'USER' : 'AI'}
                          </span>
                          <div className="text-forest dark:text-parchment whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleFlag(msg.id || `${sessionId}_${idx}`)}
                          className={`p-1 rounded transition-colors shrink-0 ${
                            isFlagged
                              ? 'text-error font-bold'
                              : 'text-forest/30 hover:text-error dark:text-parchment/30'
                          }`}
                          title="Flag message for review"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
