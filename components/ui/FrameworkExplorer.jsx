'use client'

import { useState } from 'react'
import { Sparkles, Layers, ArrowRight, Check } from 'lucide-react'
import frameworksData from '@/data/frameworks.json'
import { trackEvent } from '@/lib/analytics'

export default function FrameworkExplorer() {
  const frameworkKeys = Object.keys(frameworksData)
  const [activeKey, setActiveKey] = useState(frameworkKeys[0])
  const activeFramework = frameworksData[activeKey]

  const handleTabChange = (key) => {
    setActiveKey(key)
    trackEvent('framework_tab', { framework: key }, 'product_lab')
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light">
      {/* Header & Framework Tab Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand/40 dark:border-forest-light">
        <div>
          <span className="text-xs font-mono uppercase font-semibold text-green dark:text-green-bright tracking-wider">
            Interactive Product Frameworks
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-forest dark:text-parchment mt-0.5">
            {activeFramework.name} — {activeFramework.tagline}
          </h3>
          <p className="text-xs md:text-sm text-forest/70 dark:text-parchment/70 mt-1">
            {activeFramework.purpose}
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 bg-sand/30 dark:bg-forest-deep p-1.5 rounded-xl self-start sm:self-auto">
          {frameworkKeys.map((key) => {
            const isSelected = activeKey === key
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow'
                    : 'text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment'
                }`}
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>

      {/* Two Column Content: Steps Breakdown (Left) + Worked ESG Example (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: Framework Steps Breakdown */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-mono uppercase font-semibold tracking-wider text-forest/60 dark:text-parchment/60 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal" />
            Step-by-Step Architecture
          </h4>

          <div className="space-y-2.5">
            {activeFramework.steps.map((step, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-sand/15 dark:bg-forest-deep/60 border border-sand/30 dark:border-forest-light/60 flex items-start gap-3 hover:border-green/50 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-green/10 dark:bg-green-bright/20 text-green dark:text-green-bright font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {step.letter}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-forest dark:text-parchment">
                    {step.name}
                  </div>
                  <div className="text-[11px] text-forest/70 dark:text-parchment/70 leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Worked ESG Product Example */}
        <div className="lg:col-span-7 bg-parchment-light/60 dark:bg-forest-deep/80 rounded-xl p-5 md:p-6 border border-sand/40 dark:border-forest-light flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-dark dark:text-amber mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Applied Domain Problem</span>
            </div>
            
            <h5 className="text-base font-display font-semibold text-forest dark:text-parchment mb-4 p-3 bg-amber-soft/40 dark:bg-amber-glow/20 rounded-lg border border-amber/20">
              "{activeFramework.workedExample.problem}"
            </h5>

            <div className="space-y-3">
              {Object.entries(activeFramework.workedExample.applied).map(([letter, text]) => {
                const stepMeta = activeFramework.steps.find(s => s.letter === letter)
                return (
                  <div key={letter} className="text-xs md:text-sm flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-teal/15 dark:bg-teal/30 text-teal dark:text-teal-light font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <div className="text-forest/80 dark:text-parchment/80 leading-relaxed">
                      <strong className="text-forest dark:text-parchment font-semibold">{stepMeta?.name || letter}: </strong>
                      {text}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-sand/30 dark:border-forest-light/60 flex items-center justify-between text-xs text-forest/60 dark:text-parchment/60 font-mono">
            <span>Demonstrating structured PM synthesis</span>
            <span className="text-green dark:text-green-bright font-semibold">100% Domain Grounded</span>
          </div>
        </div>
      </div>
    </div>
  )
}
