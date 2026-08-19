'use client'

import { ChevronDown, ChevronUp, Sparkles, Building, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function RoadmapNode({ node, isExpanded, onToggle, index }) {
  const isNow = node.id === 'now'

  const handleToggle = () => {
    onToggle()
    if (!isExpanded) {
      trackEvent('roadmap_expand', { nodeId: node.id, company: node.company }, 'roadmap')
    }
  }

  return (
    <div 
      className={`relative transition-all duration-300 rounded-xl border ${
        isExpanded 
          ? 'bg-parchment-card dark:bg-forest-surface border-green dark:border-green-bright shadow-lg ring-1 ring-green/20' 
          : 'bg-parchment-light dark:bg-forest-surface/80 border-sand/60 dark:border-forest-light hover:border-teal/50 dark:hover:border-teal/40'
      }`}
    >
      {/* Node Header / Collapsed Summary */}
      <button
        onClick={handleToggle}
        className="w-full text-left p-5 md:p-6 flex flex-col justify-between items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-green rounded-xl"
        aria-expanded={isExpanded}
      >
        <div className="w-full flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              isNow 
                ? 'bg-amber animate-pulse-subtle shadow-glow-amber' 
                : node.color === 'green' 
                ? 'bg-green dark:bg-green-bright' 
                : 'bg-teal dark:bg-teal-light'
            }`} />
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-sand/40 dark:bg-forest-light text-forest dark:text-parchment flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {node.period}
            </span>
          </div>

          <span className="text-forest/60 dark:text-parchment/60 hover:text-forest dark:hover:text-parchment transition-colors p-1">
            {isExpanded ? <ChevronUp className="w-5 h-5 text-green dark:text-green-bright" /> : <ChevronDown className="w-5 h-5" />}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-teal dark:text-teal-light font-medium tracking-wide mb-1">
            <Building className="w-3.5 h-3.5" />
            {node.company}
          </div>
          <h3 className="text-lg md:text-xl font-display font-semibold text-forest dark:text-parchment leading-snug">
            {node.pmSkillUnlocked}
          </h3>
          <p className="text-sm text-forest/70 dark:text-parchment/70 mt-1 italic line-clamp-2">
            "{node.headline}"
          </p>
        </div>

        {!isExpanded && (
          <div className="w-full pt-2 flex items-center justify-between text-xs text-green dark:text-green-bright font-medium border-t border-sand/30 dark:border-forest-light/40">
            <span>Explore PM skill acquisition</span>
            <span className="flex items-center gap-0.5">Details <ChevronDown className="w-3.5 h-3.5" /></span>
          </div>
        )}
      </button>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 border-t border-sand/40 dark:border-forest-light/60 animate-slide-up space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-forest/50 dark:text-parchment/50 font-semibold block mb-1">
              Role & Context
            </span>
            <p className="text-sm font-medium text-forest dark:text-parchment">
              {node.role}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-forest/50 dark:text-parchment/50 font-semibold block mb-1">
              The Narrative
            </span>
            <p className="text-sm text-forest/80 dark:text-parchment/80 leading-relaxed">
              {node.story}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-green dark:text-green-bright font-semibold block mb-2">
              Concrete PM Evidence
            </span>
            <ul className="space-y-2">
              {node.pmEvidence.map((bullet, idx) => (
                <li key={idx} className="text-xs md:text-sm text-forest/90 dark:text-parchment/90 flex items-start gap-2 bg-sand/20 dark:bg-forest-light/30 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green dark:text-green-bright shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-teal dark:text-teal-light bg-teal/10 dark:bg-teal/20 px-3 py-1.5 rounded-md">
              <span className="font-semibold">Frameworks:</span> {node.transferableFramework}
            </div>

            {node.ledTo && (
              <a 
                href="#works"
                className="inline-flex items-center gap-1 text-xs font-semibold text-green dark:text-green-bright hover:underline bg-green/10 dark:bg-green/20 px-3 py-1.5 rounded-md"
              >
                <span>Led to: {node.ledTo}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
