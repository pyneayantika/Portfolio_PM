'use client'

import { useState, useEffect } from 'react'
import { FolderGit2, Sparkles, RefreshCw } from 'lucide-react'
import FilterTabs from '@/components/ui/FilterTabs'
import ProjectCard from '@/components/ui/ProjectCard'
import FileViewer from '@/components/ui/FileViewer'
import { CATEGORIES } from '@/lib/constants'
import { fetchPublishedWorks } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

export default function WorksShowcase() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedWork, setSelectedWork] = useState(null)

  useEffect(() => {
    loadWorks()
  }, [])

  const loadWorks = async () => {
    setLoading(true)
    const data = await fetchPublishedWorks()
    setWorks(data || [])
    setLoading(false)
  }

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    trackEvent('filter_used', { category: catId }, 'works')
  }

  // Calculate available categories that actually have works
  const filteredWorks = works.filter((work) => {
    if (activeCategory === 'all') return true
    return work.category === activeCategory
  })

  // Dynamic category pills with counts
  const availableCategories = CATEGORIES.filter(cat => {
    if (cat.id === 'all') return true
    return works.some(w => w.category === cat.id)
  }).map(cat => ({
    ...cat,
    count: cat.id === 'all' ? works.length : works.filter(w => w.category === cat.id).length
  }))

  return (
    <section id="works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green/10 dark:bg-green-bright/10 text-green dark:text-green-bright text-xs font-mono font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>CMS-Powered Artifacts & Live Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-forest dark:text-parchment tracking-tight">
            Works, Teardowns & PRDs
          </h2>
          <p className="text-sm sm:text-base text-forest/70 dark:text-parchment/70 mt-2 max-w-2xl">
            Real product artifacts including agentic copilot redesigns, technical PRDs, user research surveys, and guesstimates. Filter by artifact category below.
          </p>
        </div>

        {/* Refresh / Real-Time indicator */}
        <button
          onClick={loadWorks}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-forest/60 dark:text-parchment/60 hover:text-forest dark:hover:text-parchment hover:bg-sand/30 transition-colors self-start md:self-auto"
          title="Refresh works from Supabase"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-green' : ''}`} />
          <span>Real-time Sync</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <FilterTabs
          categories={availableCategories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />
      </div>

      {/* Works Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-sand/20 dark:bg-forest-surface animate-pulse" />
          ))}
        </div>
      ) : filteredWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <ProjectCard
              key={work.id}
              work={work}
              onOpenViewer={(w) => setSelectedWork(w)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-parchment-light/60 dark:bg-forest-surface border border-dashed border-sand/60">
          <p className="text-forest/60 dark:text-parchment/60 text-sm font-mono">
            No published works in this category yet. Check back soon or view "All Works".
          </p>
        </div>
      )}

      {/* Fullscreen Document Viewer Modal */}
      {selectedWork && (
        <FileViewer
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      )}
    </section>
  )
}
