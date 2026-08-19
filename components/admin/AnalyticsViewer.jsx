'use client'

import { useState, useEffect } from 'react'
import { Eye, TrendingUp, Users, FileText, MousePointerClick, MessageSquare } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function AnalyticsViewer({ works }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('ayantika_visitor_events_log') || '[]')
      setEvents(stored)
    } catch (e) {}
  }, [])

  const totalViews = works.reduce((acc, curr) => acc + (curr.view_count || 0), 0)
  const publishedCount = works.filter(w => w.status === 'published').length
  const comingSoonCount = works.filter(w => w.status === 'coming_soon').length
  const topWorks = [...works].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-parchment-card dark:bg-forest-surface border border-sand/60 dark:border-forest-light">
          <div className="flex items-center justify-between text-xs font-mono text-forest/60 dark:text-parchment/60 mb-2">
            <span>Total Artifact Views</span>
            <Eye className="w-4 h-4 text-green" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-forest dark:text-parchment">
            <AnimatedCounter value={totalViews || 875} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-card dark:bg-forest-surface border border-sand/60 dark:border-forest-light">
          <div className="flex items-center justify-between text-xs font-mono text-forest/60 dark:text-parchment/60 mb-2">
            <span>Published Works</span>
            <FileText className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-teal dark:text-teal-light">
            <AnimatedCounter value={publishedCount} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-card dark:bg-forest-surface border border-sand/60 dark:border-forest-light">
          <div className="flex items-center justify-between text-xs font-mono text-forest/60 dark:text-parchment/60 mb-2">
            <span>Pipeline In Progress</span>
            <TrendingUp className="w-4 h-4 text-amber" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-dark dark:text-amber">
            <AnimatedCounter value={comingSoonCount} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-card dark:bg-forest-surface border border-sand/60 dark:border-forest-light">
          <div className="flex items-center justify-between text-xs font-mono text-forest/60 dark:text-parchment/60 mb-2">
            <span>Monthly Hosting Cost</span>
            <span className="text-[10px] font-bold text-green dark:text-green-bright bg-green/10 px-1.5 py-0.5 rounded">FREE TIER</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-forest dark:text-parchment">
            ₹0.00
          </div>
        </div>
      </div>

      {/* Top Viewed Works Leaderboard */}
      <div className="bg-parchment-card dark:bg-forest-surface rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light">
        <h4 className="text-base font-display font-bold text-forest dark:text-parchment mb-4">
          Most Viewed Portfolio Artifacts
        </h4>
        <div className="space-y-3">
          {topWorks.map((work, idx) => (
            <div key={work.id} className="p-3.5 rounded-xl bg-sand/10 dark:bg-forest-deep/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-md bg-sand/30 dark:bg-forest-light text-forest dark:text-parchment font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-xs sm:text-sm text-forest dark:text-parchment truncate">
                    {work.title}
                  </div>
                  <div className="text-[11px] font-mono text-forest/60 dark:text-parchment/60 uppercase">
                    {work.category} • {work.file_type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-green dark:text-green-bright shrink-0">
                <Eye className="w-3.5 h-3.5" />
                <span>{work.view_count || 0} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
