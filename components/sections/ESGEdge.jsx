'use client'

import { ShieldCheck, Sparkles, Layers, Cpu, Database } from 'lucide-react'
import IcebergDiagram from '@/components/ui/IcebergDiagram'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function ESGEdge() {
  return (
    <section id="esg-edge" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light text-xs font-mono font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Moat Most PMs Don't Have</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-forest dark:text-parchment tracking-tight">
          The ESG × AI Edge
        </h2>
        <p className="text-sm sm:text-base text-forest/70 dark:text-parchment/70 mt-3 leading-relaxed">
          3.8 years of domain depth, consulting & strategy: operating under ruthless regulatory scrutiny, incomplete vendor data, high-stakes board reporting, and cross-functional enterprise silos.
        </p>
      </div>

      {/* 1. Iceberg Diagram with Live PM Superpower Mapping */}
      <div>
        <IcebergDiagram />
      </div>

      {/* 2. Key Data Anchors Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        <div className="p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light text-center flex flex-col justify-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-green dark:text-green-bright mb-1">
            <AnimatedCounter value={201215} suffix=" t" />
          </div>
          <div className="text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase">
            CO₂e Consolidated
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light text-center flex flex-col justify-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-teal dark:text-teal-light mb-1">
            <AnimatedCounter value={8} suffix=" entities" />
          </div>
          <div className="text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase">
            BFSI Managed
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light text-center flex flex-col justify-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-dark dark:text-amber mb-1">
            <AnimatedCounter value={3.8} suffix=" years" />
          </div>
          <div className="text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase leading-snug">
            Domain Depth, Consulting & Strategy
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light text-center flex flex-col justify-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-forest dark:text-parchment mb-1">
            <AnimatedCounter value={726} suffix="+" />
          </div>
          <div className="text-[11px] font-mono text-forest/70 dark:text-parchment/70 uppercase leading-tight">
            Data pointers mapped to 80+ metrics & KPIs across 6 capital framework & 5 strategic pillars
          </div>
        </div>
      </div>
    </section>
  )
}
