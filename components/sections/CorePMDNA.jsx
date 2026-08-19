'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { 
  BarChart3, 
  Database, 
  Filter, 
  CheckSquare, 
  Users, 
  Search, 
  Cpu, 
  Layers, 
  Code2, 
  Laptop, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Dna,
  Compass
} from 'lucide-react'
import PM_DNA from '@/data/pm-dna.json'

const ICON_MAP = {
  BarChart3,
  Database,
  Filter,
  CheckSquare,
  Users,
  Search,
  Cpu,
  Layers,
  Code2,
  Laptop,
  Zap,
  ShieldCheck,
}

const CATEGORIES = [
  { id: 'all', label: 'All PM DNA' },
  { id: 'metrics', label: 'Metrics & Analytics' },
  { id: 'prioritization', label: 'Prioritization & Scoping' },
  { id: 'strategy', label: 'Strategy & Discovery' },
  { id: 'ai-systems', label: 'AI-Native & Systems' },
  { id: 'execution', label: 'Execution & GTM' },
]

// Marquee items for top infinite velocity ticker
const MARQUEE_ITEMS = [
  { icon: '📈', text: 'North Star & Counter-Metrics' },
  { icon: '🎯', text: 'RICE & 80/20 Prioritization' },
  { icon: '👥', text: 'Behavioral User Segmentation' },
  { icon: '⚡', text: 'Hybrid RAG & ChromaDB' },
  { icon: '🤖', text: '5-Agent Copilot Orchestration' },
  { icon: '📊', text: '726+ KPI Variance Modeling' },
  { icon: '🛡️', text: 'SEBI BRSR & Regulatory Scoping' },
  { icon: '💻', text: 'Enterprise SaaS Backlog Ownership' },
  { icon: '🔍', text: 'Primary User Research (43+ surveyed)' },
  { icon: '⏱️', text: '40% Documentation Cycle Reduction' },
  { icon: '🧩', text: 'Jobs-to-be-Done (JTBD)' },
  { icon: '🧠', text: 'Token-Level LLM Evaluation' },
]

export default function CorePMDNA() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState(null)
  
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const filteredSkills = useMemo(() => {
    return PM_DNA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesQuery = 
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.frameworks.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.evidence.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  // Update scroll state and percentage
  const checkScrollState = useCallback(() => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
    
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) {
      setScrollPercentage(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)))
    } else {
      setScrollPercentage(0)
    }
  }, [])

  useEffect(() => {
    checkScrollState()
    const container = carouselRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollState)
      window.addEventListener('resize', checkScrollState)
      return () => {
        container.removeEventListener('scroll', checkScrollState)
        window.removeEventListener('resize', checkScrollState)
      }
    }
  }, [checkScrollState, filteredSkills])

  // Reset scroll on filter or search change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeCategory, searchQuery])

  const handleScroll = (direction) => {
    if (!carouselRef.current) return
    const scrollAmount = carouselRef.current.clientWidth * 0.75
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="dna" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 relative">
      {/* 1. Dynamic Infinite Skill Marquee (Tech Stack Velocity Ticker) */}
      <div className="relative overflow-hidden w-full py-3 bg-parchment-light/60 dark:bg-forest-surface/60 border-y border-sand/60 dark:border-forest-light rounded-3xl backdrop-blur-md">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-parchment dark:from-forest-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-parchment dark:from-forest-deep to-transparent z-10 pointer-events-none" />

        {/* Marquee Track 1 */}
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div 
              key={`marquee-1-${idx}`}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sand/30 dark:bg-forest-light/60 border border-sand/40 dark:border-forest-light/60 text-xs font-mono font-medium text-forest dark:text-parchment shrink-0 shadow-sm"
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green/10 dark:bg-green-bright/10 text-green-dark dark:text-green-bright text-xs font-mono font-semibold">
          <Dna className="w-3.5 h-3.5 animate-pulse" />
          <span>Core Product DNA & Execution Stack</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-forest dark:text-parchment tracking-tight">
          The Product Builder DNA
        </h2>
        <p className="text-sm sm:text-base text-forest/75 dark:text-parchment/75 leading-relaxed">
          From rigorous data aggregation and ruthless prioritization matrices to production hybrid RAG and enterprise backlog ownership — slide through the foundational capabilities that power every product I ship.
        </p>
      </div>

      {/* 3. Category Filter Tabs & Live Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-parchment-light/80 dark:bg-forest-surface rounded-2xl border border-sand/50 dark:border-forest-light w-full md:w-auto overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? PM_DNA.length 
              : PM_DNA.filter(i => i.category === cat.id).length
            const isActive = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow font-semibold'
                    : 'text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment hover:bg-sand/30 dark:hover:bg-forest-light/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-parchment/20 dark:bg-forest-deep/20' : 'bg-sand/40 dark:bg-forest-light'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-forest/40 dark:text-parchment/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, frameworks, metrics..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-parchment-light/80 dark:bg-forest-surface border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 dark:focus:ring-green-bright/50 text-forest dark:text-parchment placeholder:text-forest/40 dark:placeholder:text-parchment/40 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-forest/40 dark:text-parchment/40 hover:text-forest"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Sliding Carousel Track */}
      <div className="relative group">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredSkills.map((skill) => {
            const Icon = ICON_MAP[skill.icon] || Sparkles
            const isMastery = skill.level === 'Mastery'

            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                className={`w-[320px] sm:w-[360px] lg:w-[390px] shrink-0 snap-start p-6 rounded-3xl bg-parchment-light/90 dark:bg-forest-surface/90 border transition-all duration-300 shadow-card hover:shadow-xl cursor-pointer flex flex-col justify-between select-none ${
                  selectedSkill?.id === skill.id
                    ? 'border-green dark:border-green-bright ring-2 ring-green/20 scale-[1.01]'
                    : 'border-sand/60 dark:border-forest-light hover:border-green/50 dark:hover:border-green-bright/50 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Card Header: Icon + Category + Level Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-sand/30 dark:bg-forest-light/60 flex items-center justify-center text-green dark:text-green-bright shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-forest/60 dark:text-parchment/60 uppercase">
                        {skill.categoryLabel}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isMastery 
                          ? 'bg-green/15 text-green dark:text-green-bright border border-green/30' 
                          : 'bg-amber/15 text-amber-dark dark:text-amber border border-amber/30'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  {/* Skill Title & Tagline */}
                  <h3 className="font-display font-bold text-lg text-forest dark:text-parchment group-hover:text-green dark:group-hover:text-green-bright transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs font-mono text-forest/80 dark:text-parchment/80 mt-1 leading-snug font-medium">
                    {skill.tagline}
                  </p>

                  {/* Description Body */}
                  <p className="text-xs text-forest/70 dark:text-parchment/70 mt-2.5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer: Real-world Evidence & Frameworks */}
                <div className="mt-5 pt-4 border-t border-sand/40 dark:border-forest-light/40 space-y-3">
                  {/* Evidence Callout */}
                  <div className="p-2.5 rounded-xl bg-sand/20 dark:bg-forest-deep/60 border border-sand/40 dark:border-forest-light/60">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal dark:text-teal-light block mb-0.5">
                      Applied Evidence:
                    </span>
                    <span className="text-[11px] text-forest/80 dark:text-parchment/80 leading-tight block">
                      {skill.evidence}
                    </span>
                  </div>

                  {/* Framework Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {skill.frameworks.map((fw, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sand/30 dark:bg-forest-light/50 text-forest/75 dark:text-parchment/75 border border-sand/20"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-parchment-light/60 dark:bg-forest-surface border border-dashed border-sand dark:border-forest-light">
            <p className="text-sm font-mono text-forest/60 dark:text-parchment/60">
              No PM DNA skills matched "{searchQuery}". Try searching for "RAG", "Metrics", "RICE", or "SaaS".
            </p>
          </div>
        )}
      </div>

      {/* 5. Sleek Carousel Navigation & Neon Progress Bar */}
      {filteredSkills.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Glowing Track Progress Indicator */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-48 sm:w-64 h-1.5 bg-sand/40 dark:bg-forest-light/50 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-green to-amber dark:from-green-bright dark:to-amber rounded-full transition-all duration-300 shadow-glow-green"
                style={{ width: `${Math.max(15, scrollPercentage)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-forest/60 dark:text-parchment/60">
              {filteredSkills.length} skills in stack
            </span>
          </div>

          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 shadow-sm ${
                canScrollLeft
                  ? 'border-sand/70 dark:border-forest-light bg-parchment-light dark:bg-forest-surface text-forest dark:text-parchment hover:bg-green hover:text-parchment dark:hover:bg-green-bright dark:hover:text-forest-deep hover:scale-105 active:scale-95'
                  : 'border-sand/30 dark:border-forest-light/30 text-forest/30 dark:text-parchment/30 cursor-not-allowed'
              }`}
              aria-label="Previous skills"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 shadow-sm ${
                canScrollRight
                  ? 'border-sand/70 dark:border-forest-light bg-parchment-light dark:bg-forest-surface text-forest dark:text-parchment hover:bg-green hover:text-parchment dark:hover:bg-green-bright dark:hover:text-forest-deep hover:scale-105 active:scale-95 ring-2 ring-green/20'
                  : 'border-sand/30 dark:border-forest-light/30 text-forest/30 dark:text-parchment/30 cursor-not-allowed'
              }`}
              aria-label="Next skills"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. PM Superpower Synthesis Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-forest via-forest-surface to-forest-deep text-parchment border border-green/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-green/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-green-bright uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Synthesis Advantage</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-parchment leading-snug">
              Why this DNA matters for early-stage & enterprise PM roles
            </h3>
            <p className="text-xs sm:text-sm text-parchment/80 leading-relaxed max-w-2xl">
              Most PMs are either purely analytical or purely design-oriented. My 3.8 years in rigorous sustainability consulting combined with hands-on AI copilot engineering gives me the rare ability to solve ambiguous data architecture while delivering intuitive, high-velocity user interfaces.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-green-bright text-forest-deep hover:bg-green shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Inspect Works & Teardowns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#lab"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-forest-light text-parchment hover:bg-forest-light/80 border border-sand/20 transition-all"
            >
              <span>Explore Interactive Product Lab</span>
              <Compass className="w-3.5 h-3.5 text-amber" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
