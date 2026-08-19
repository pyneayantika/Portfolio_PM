'use client'

import { FileText, Eye, ArrowRight, Lock, Sparkles, Presentation, Github, ExternalLink } from 'lucide-react'
import CountdownBadge from './CountdownBadge'
import { truncateText } from '@/lib/utils'

export default function ProjectCard({ work, onOpenViewer }) {
  const isPublished = work.status === 'published'
  const isComingSoon = work.status === 'coming_soon'
  const isPptx = work.file_type === 'pptx'

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
      {/* Top Banner / Category Badge */}
      <div className="p-6 pb-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sand/30 dark:bg-forest-light text-forest/80 dark:text-parchment/80">
              {work.category}
            </span>

            <div className="flex items-center gap-2">
              {work.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-dark dark:text-amber bg-amber-soft/80 dark:bg-amber-glow px-2 py-0.5 rounded-full border border-amber/30">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}

              {isComingSoon && work.reveal_date && (
                <CountdownBadge targetDate={work.reveal_date} />
              )}
            </div>
          </div>

          <h3 className="text-xl font-display font-bold text-forest dark:text-parchment group-hover:text-green dark:group-hover:text-green-bright transition-colors mb-2 leading-snug">
            {work.title}
          </h3>

          <p className="text-sm text-forest/70 dark:text-parchment/70 leading-relaxed mb-4">
            {truncateText(work.description, 140)}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {work.tags?.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-sand/20 dark:bg-forest-light/40 text-forest/70 dark:text-parchment/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer / Action Buttons */}
      <div className="px-6 py-4 bg-sand/15 dark:bg-forest-deep/60 border-t border-sand/30 dark:border-forest-light flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-forest/60 dark:text-parchment/60 font-mono">
          {isPptx ? <Presentation className="w-3.5 h-3.5 text-teal" /> : <FileText className="w-3.5 h-3.5 text-green" />}
          <span>{work.file_type?.toUpperCase()}</span>
          {typeof work.view_count === 'number' && (
            <>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {work.view_count}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Direct GitHub Repository Link */}
          {work.github_url && (
            <a
              href={work.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment transition-colors"
              title="View source on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {isPublished ? (
            <button
              onClick={() => onOpenViewer(work)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-green dark:text-green-bright hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>Artifact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1 text-xs font-medium text-amber-dark dark:text-amber">
              <Lock className="w-3.5 h-3.5" />
              <span>In Dev</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
