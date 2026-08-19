'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageSquare, X, ArrowDown } from 'lucide-react'

export default function AnimeGreeting({ onOpenChat, isChatOpen }) {
  const [showCharacter, setShowCharacter] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if dismissed in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('greeting-dismissed') === 'true') {
      setDismissed(true)
      return
    }

    // Avatar slides in after hero typewriter finishes (~2.2s)
    const charTimer = setTimeout(() => setShowCharacter(true), 2200)
    // Speech bubble fades in shortly after avatar
    const bubbleTimer = setTimeout(() => setShowBubble(true), 2600)
    // Auto-fade speech bubble after ~12s (leaves avatar clickable or gently fades)
    const autoTimer = setTimeout(() => {
      setShowBubble(false)
    }, 14000)

    return () => {
      clearTimeout(charTimer)
      clearTimeout(bubbleTimer)
      clearTimeout(autoTimer)
    }
  }, [])

  const handleDismiss = (e) => {
    e?.stopPropagation()
    setShowCharacter(false)
    setShowBubble(false)
    setDismissed(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('greeting-dismissed', 'true')
    }
  }

  const handleAvatarClick = () => {
    if (onOpenChat) {
      onOpenChat()
      setShowBubble(false)
    }
  }

  // If chat modal is currently open or user manually dismissed, hide floating guide
  if (dismissed || isChatOpen || !showCharacter) return null

  return (
    <aside aria-label="Interactive guide" className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble */}
      <div className={`
        pointer-events-auto transition-all duration-300 ease-out mb-2 origin-bottom-right
        ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
      `}>
        <div className="relative max-w-[280px] sm:max-w-[310px] bg-parchment-card/95 dark:bg-forest-surface/95 backdrop-blur-md border border-sand/70 dark:border-forest-light rounded-2xl rounded-br-none p-4 shadow-2xl">
          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-forest/40 hover:text-forest dark:text-parchment/40 dark:hover:text-parchment hover:bg-sand/30 dark:hover:bg-forest-light transition-colors text-sm"
            aria-label="Close guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <p className="text-xs sm:text-sm leading-relaxed text-forest dark:text-parchment pr-4 font-sans">
            Hey! I'm <strong className="font-semibold text-green dark:text-green-bright">Ayantika</strong>. Sustainability scientist turned AI product builder.
            Scroll down or chat with me to explore everything I've built! 👋
          </p>

          {/* Quick CTA inside bubble */}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-sand/40 dark:border-forest-light/60">
            <button
              onClick={handleAvatarClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green dark:bg-green-bright text-parchment dark:text-forest-deep text-xs font-semibold shadow-sm hover:scale-105 transition-all"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Ask AI Twin</span>
            </button>
            <a
              href="#roadmap"
              onClick={() => setShowBubble(false)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment transition-colors"
            >
              <span>Take tour</span>
              <ArrowDown className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Anime Avatar */}
      <div 
        onClick={handleAvatarClick}
        title="Click to chat with Ayantika"
        className={`
          pointer-events-auto cursor-pointer transition-all duration-500 ease-out group
          ${showCharacter ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}
        `}
      >
        <div className="relative animate-float hover:scale-105 transition-transform duration-300">
          <Image
            src="/guide/anime-intro.png"
            alt="Ayantika's Anime Interactive Guide"
            width={160}
            height={200}
            className="w-[110px] sm:w-[135px] md:w-[150px] h-auto drop-shadow-2xl select-none"
            priority
          />
          {/* Subtle pulse indicator badge on avatar */}
          <span className="absolute bottom-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green dark:bg-green-bright opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green dark:bg-green-bright"></span>
          </span>
        </div>
      </div>
    </aside>
  )
}
