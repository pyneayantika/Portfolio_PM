'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const ESG_ITEMS = [
  // Above Waterline (Visible ESG compliance)
  { id: 'brsr', label: 'SEBI BRSR / Core', position: 'above', pmSkill: 'Requirements Translation & Regulatory Scoping', pmDesc: 'Decomposing compliance directives into clear feature specs' },
  { id: 'ghg', label: 'GHG Protocol (Scope 1/2/3)', position: 'above', pmSkill: 'Data Architecture & Aggregation Pipelines', pmDesc: 'Designing multi-entity data pipelines with standard factor tables' },
  { id: 'tcfd', label: 'TCFD / IFRS S1 & S2', position: 'above', pmSkill: 'Risk Modeling & Scenario Planning', pmDesc: 'Translating climate scenarios into balance sheet risk metrics' },
  
  // Below Waterline (Deep enterprise implementation)
  { id: 'envizi', label: 'IBM Envizi Deployment', position: 'below', pmSkill: 'Enterprise SaaS Product Ownership', pmDesc: 'Backlog grooming, vendor negotiations & user onboarding' },
  { id: 'scope3', label: 'EPA EEIO Scope 3 Modeling', position: 'below', pmSkill: 'Incomplete Data & Proxy Estimations', pmDesc: 'Applying materiality logic to prioritize high-impact data gaps' },
  { id: 'sprih', label: 'Sprih GHG Platform PO', position: 'below', pmSkill: 'Multi-Stakeholder Cross-Functional Alignment', pmDesc: 'Aligning 8 regulated entities with divergent data maturity' },
  { id: 'surveys', label: 'Employee Commute Survey Design', position: 'below', pmSkill: 'Primary User Research & Survey Design', pmDesc: 'Synthesizing noisy respondent feedback into clean data inputs' },
  { id: 'vendor', label: '6-Vendor Decision Matrix', position: 'below', pmSkill: 'Weighted Trade-off Evaluation', pmDesc: 'Structured procurement decision-making under ambiguous constraints' },
]

export default function IcebergDiagram() {
  const [hoveredId, setHoveredId] = useState(null)

  const activeItem = ESG_ITEMS.find(item => item.id === hoveredId) || ESG_ITEMS[3] // Default to Envizi / PO

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Column: Visual Iceberg Container */}
      <div className="lg:col-span-6 relative bg-parchment-light/70 dark:bg-forest-deep/60 rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-semibold uppercase text-teal dark:text-teal-light tracking-wider">
            The ESG Domain Depth (Hover to Inspect)
          </span>
          <span className="text-[11px] font-mono text-forest/50 dark:text-parchment/50">
            Waterline Boundary
          </span>
        </div>

        {/* Iceberg Graphic Card */}
        <div className="relative rounded-xl border border-sand/40 dark:border-forest-light bg-sand/10 dark:bg-forest-surface/50 p-4">
          {/* Above Waterline Section */}
          <div className="pb-6 border-b-2 border-dashed border-teal/40 relative">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal dark:text-teal-light bg-teal/10 px-2 py-0.5 rounded">
              ▲ Above Waterline — What Recruiters See (Standard ESG)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              {ESG_ITEMS.filter(i => i.position === 'above').map(item => (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => setHoveredId(item.id)}
                  className={`p-2.5 rounded-lg text-left text-xs font-medium transition-all ${
                    hoveredId === item.id || (!hoveredId && item.id === 'brsr')
                      ? 'bg-teal text-parchment dark:bg-teal-light dark:text-forest shadow font-semibold scale-105'
                      : 'bg-parchment dark:bg-forest-light/60 text-forest dark:text-parchment hover:bg-sand/40 border border-sand/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Waterline Indicator */}
          <div className="py-2 text-center text-[11px] font-mono text-teal/80 dark:text-teal-light flex items-center justify-center gap-2">
            <span>~~~~~~~~~~~~~~~~</span>
            <span className="font-bold">WATERLINE</span>
            <span>~~~~~~~~~~~~~~~~</span>
          </div>

          {/* Below Waterline Section */}
          <div className="pt-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-green dark:text-green-bright bg-green/10 px-2 py-0.5 rounded">
              ▼ Below Waterline — The Hidden PM Foundation (4 Years of Craft)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              {ESG_ITEMS.filter(i => i.position === 'below').map(item => (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => setHoveredId(item.id)}
                  className={`p-3 rounded-lg text-left text-xs font-medium transition-all ${
                    hoveredId === item.id
                      ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest shadow-md font-semibold scale-105'
                      : 'bg-parchment dark:bg-forest-light/40 text-forest dark:text-parchment hover:bg-sand/30 border border-sand/30'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5 truncate">→ {item.pmSkill}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Direct PM Superpower Mapping Card */}
      <div className="lg:col-span-6 bg-parchment-card dark:bg-forest-surface rounded-2xl p-6 md:p-8 border border-green/30 dark:border-green-bright/30 shadow-card">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-green dark:text-green-bright mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Active Superpower Mapping</span>
        </div>

        <div className="text-xs font-mono text-forest/50 dark:text-parchment/50">
          Domain Experience Anchor:
        </div>
        <h4 className="text-xl font-display font-bold text-forest dark:text-parchment mb-4">
          {activeItem.label}
        </h4>

        <div className="p-4 rounded-xl bg-green/10 dark:bg-green-bright/10 border border-green/20 mb-4">
          <div className="text-xs font-mono font-bold uppercase text-green-dark dark:text-green-bright mb-1">
            Transferred PM Superpower
          </div>
          <div className="text-lg font-display font-semibold text-forest dark:text-parchment">
            {activeItem.pmSkill}
          </div>
          <p className="text-xs md:text-sm text-forest/80 dark:text-parchment/80 mt-2 leading-relaxed">
            {activeItem.pmDesc}
          </p>
        </div>

        <div className="space-y-2 text-xs font-mono text-forest/70 dark:text-parchment/70">
          <div className="flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-green" />
            <span>Not a generic pivot — 4 years of real product pressure testing</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-green" />
            <span>High data integrity mindset applied to AI and SaaS metrics</span>
          </div>
        </div>
      </div>
    </div>
  )
}
