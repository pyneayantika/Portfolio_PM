'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'

export default function Navbar({ onOpenChat }) {
  const { theme, toggleTheme, mounted } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-green dark:bg-green-bright flex items-center justify-center text-parchment dark:text-forest font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            A
          </div>
          <div>
            <div className="font-display font-bold text-base tracking-tight text-forest dark:text-parchment leading-tight">
              Ayantika Pyne
            </div>
            <div className="text-[10px] font-mono text-green dark:text-green-bright font-medium tracking-wide">
              PM • ESG × AI
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-forest/75 dark:text-parchment/75">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-green dark:hover:text-green-bright transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Theme Toggle + Chat Button + CTA) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment hover:bg-sand/30 dark:hover:bg-forest-light transition-colors"
            aria-label="Toggle dark/light mode"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber" />
            ) : (
              <Moon className="w-4 h-4 text-teal" />
            )}
          </button>

          {/* Quick Chat Pill */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-green dark:text-green-bright" />
              <span>Ask AI</span>
            </button>
          )}

          {/* Let's Talk CTA */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow hover:bg-green-dark transition-all hover:scale-[1.02]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
