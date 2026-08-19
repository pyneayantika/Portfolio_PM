'use client'

import { Mail, Linkedin, Github, Heart, Sparkles, ShieldCheck, Leaf, Globe } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="w-full bg-parchment-light/80 dark:bg-forest-deep border-t border-sand/40 dark:border-forest-light pt-14 pb-12 px-4 sm:px-6 lg:px-8 mt-24 transition-colors relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 1. Signature Closing Manifesto Note */}
        <div className="p-6 sm:p-8 rounded-3xl bg-sand/20 dark:bg-forest-surface/70 border border-sand/50 dark:border-forest-light/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-green/15 dark:bg-green-bright/15 text-green dark:text-green-bright flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <div className="text-sm sm:text-base font-display font-bold text-forest dark:text-parchment italic tracking-tight">
                "The future is not just AI × Product — it must be sustainable too."
              </div>
              <p className="text-xs text-forest/70 dark:text-parchment/70 font-mono leading-relaxed">
                Building intelligent systems with architectural efficiency, rigorous data governance, and enduring real-world responsibility.
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono text-xs font-semibold text-green dark:text-green-bright self-end sm:self-center px-3.5 py-1.5 rounded-full bg-green/10 dark:bg-green-bright/10 border border-green/20">
            Ayantika Pyne • 2026
          </div>
        </div>

        {/* 2. Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Left: Role Availability Banner */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green/10 dark:bg-green-bright/10 text-green-dark dark:text-green-bright text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-green dark:bg-green-bright animate-pulse" />
              <span>Open to APM / PM Roles in AI-Native Consumer & B2B SaaS Ecosystems</span>
            </div>
            <p className="text-xs text-forest/70 dark:text-parchment/70 max-w-md">
              "Translating complex domain depth into high-leverage products people trust."
            </p>
          </div>

          {/* Right: Social Links & Admin Link */}
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment hover:text-green dark:hover:text-green-bright transition-all hover:scale-105 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment hover:text-green dark:hover:text-green-bright transition-all hover:scale-105 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.email}
                className="p-2.5 rounded-xl bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment hover:text-green dark:hover:text-green-bright transition-all hover:scale-105 shadow-sm"
                aria-label="Email Ayantika"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-forest/50 dark:text-parchment/50">
              <span>© {new Date().getFullYear()} Ayantika Pyne</span>
              <span>•</span>
              <a 
                href="/admin" 
                className="hover:text-green dark:hover:text-green-bright transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>CMS Admin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
