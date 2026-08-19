'use client'

import { useState } from 'react'
import { Compass, Sparkles, HelpCircle } from 'lucide-react'
import RoadmapNode from '@/components/ui/RoadmapNode'
import roadmapData from '@/data/roadmap.json'

export default function PivotRoadmap() {
  // Start with the latest active node expanded by default
  const [expandedId, setExpandedId] = useState('now')

  const toggleNode = (id) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light text-xs font-mono font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>The PM Skills Acquisition Story</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-forest dark:text-parchment tracking-tight">
          How 4 Years of Sustainability Consulting Built My Product Instincts
        </h2>
        <p className="text-sm sm:text-base text-forest/70 dark:text-parchment/70 mt-3 leading-relaxed">
          "I didn't pivot from ESG to Product. I've been doing product work for 4 years — inside sustainability." Click each milestone to inspect the concrete PM evidence and frameworks earned.
        </p>
      </div>

      {/* Timeline Grid (2 Columns on Tablet/Desktop for great scannability) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {roadmapData.map((node, index) => (
          <RoadmapNode
            key={node.id}
            node={node}
            index={index}
            isExpanded={expandedId === node.id}
            onToggle={() => toggleNode(node.id)}
          />
        ))}
      </div>

      {/* Narrative Synthesis Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/60 dark:border-forest-light flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-soft dark:bg-amber-glow text-amber-dark dark:text-amber">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-display font-bold text-base text-forest dark:text-parchment">
              The Common Thread Across Every Role
            </h4>
            <p className="text-xs sm:text-sm text-forest/75 dark:text-parchment/75">
              Taking noisy, unstructured problem spaces (mandates, carbon data, customer returns) and turning them into scalable systems with crisp UX.
            </p>
          </div>
        </div>

        <a
          href="#lab"
          className="shrink-0 text-xs font-mono font-semibold text-green dark:text-green-bright hover:underline"
        >
          See My Thinking in Product Lab →
        </a>
      </div>
    </section>
  )
}
