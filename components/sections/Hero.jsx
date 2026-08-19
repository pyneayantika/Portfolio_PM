'use client'

import Image from 'next/image'
import { ArrowDown, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react'
import TypewriterText from '@/components/ui/TypewriterText'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import DynamicHeatmapMolecule from '@/components/ui/DynamicHeatmapMolecule'
import { trackEvent } from '@/lib/analytics'

export default function Hero({ onOpenChat }) {
  const handleCtaClick = () => {
    trackEvent('hero_cta_click', {}, 'hero')
  }

  return (
    <section id="hero" className="min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (60% on desktop) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-parchment-light dark:bg-forest-surface border border-sand/60 dark:border-forest-light text-xs font-mono font-medium text-forest dark:text-parchment shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green dark:bg-green-bright animate-ping" />
            <span>Sustainability Data Architect → AI Product Builder</span>
          </div>

          {/* Typewriter Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-display font-bold text-forest dark:text-parchment leading-[1.18] tracking-tight">
            <TypewriterText 
              text="I find the gap, make sense of it, and build what people need next." 
              speed={40}
              delay={200}
            />
          </h1>

          {/* Subheadline Narrative */}
          <p className="text-base sm:text-lg text-forest/75 dark:text-parchment/75 leading-relaxed max-w-2xl">
            3.8 years of domain depth, consulting & strategy translating ambiguous regulatory chaos and complex carbon inventories into high-integrity enterprise platforms. Now building zero-to-one AI copilots and evaluation infrastructure.
          </p>

          {/* 3 Key Quantified Counters Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light shadow-card hover:border-green/40 transition-colors">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-green dark:text-green-bright mb-1">
                <AnimatedCounter value={36} suffix=" configs" />
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase tracking-wide">
                RAGBench Tested ($0 Budget)
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light shadow-card hover:border-amber/40 transition-colors">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-amber-dark dark:text-amber mb-1">
                <AnimatedCounter value={201215} suffix=" t" />
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase tracking-wide">
                CO₂e Consolidated (8 Entities)
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/50 dark:border-forest-light shadow-card hover:border-teal/40 transition-colors">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-teal dark:text-teal-light mb-1">
                <AnimatedCounter value={10} suffix="+ builds" />
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-forest/70 dark:text-parchment/70 uppercase tracking-wide">
                Zero-to-One in 60 Days
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#works"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow-md hover:bg-green-dark transition-all hover:scale-[1.02]"
            >
              <span>Explore My Works & Teardowns</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-sand/30 hover:bg-sand/60 dark:bg-forest-surface dark:hover:bg-forest-light text-forest dark:text-parchment border border-sand/60 dark:border-forest-light transition-all"
              >
                <MessageSquare className="w-4 h-4 text-green dark:text-green-bright" />
                <span>Ask My AI Twin Anything</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Professional Profile Card + Dynamic Heatmap Molecule (40% on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
          {/* Professional Headshot & Identity Card */}
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-parchment-light/90 dark:bg-forest-surface/90 border border-sand/60 dark:border-forest-light shadow-xl backdrop-blur-md flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-green/30 dark:border-green-bright/30 shadow-md">
              <Image
                src="/headshot.jpg"
                alt="Ayantika Pyne - Professional Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-display font-bold text-lg text-forest dark:text-parchment leading-tight truncate">
                Ayantika Pyne
              </h3>
              <p className="text-xs font-mono font-medium text-green dark:text-green-bright mt-0.5">
                PM Builder • ESG × AI
              </p>
              <div className="flex items-center gap-1 text-[11px] text-forest/60 dark:text-parchment/60 font-mono mt-1">
                <MapPin className="w-3 h-3 text-amber" />
                <span>Pune, India</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green/10 text-green dark:text-green-bright border border-green/20">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Open to PM Roles
                </span>
              </div>
            </div>
          </div>

          {/* Astonishing Dynamic Heatmap Molecule */}
          <DynamicHeatmapMolecule />
        </div>

      </div>
    </section>
  )
}
