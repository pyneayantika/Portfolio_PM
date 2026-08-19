'use client'

import { useState } from 'react'
import { Trash2, Edit3, Eye, Sparkles, ExternalLink, FileText, CheckCircle2, Github } from 'lucide-react'
import { STATUSES } from '@/lib/constants'
import { saveWork, deleteWork } from '@/lib/supabase'

export default function WorksManager({ works, onReload }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleStatusChange = async (work, newStatus) => {
    await saveWork({ ...work, status: newStatus })
    if (onReload) onReload()
  }

  const handleToggleFeatured = async (work) => {
    await saveWork({ ...work, featured: !work.featured })
    if (onReload) onReload()
  }

  const handleDelete = async (workId) => {
    if (window.confirm('Are you sure you want to delete this work artifact?')) {
      setDeletingId(workId)
      await deleteWork(workId)
      setDeletingId(null)
      if (onReload) onReload()
    }
  }

  return (
    <div className="bg-parchment-card dark:bg-forest-surface rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light shadow-card">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand/40 dark:border-forest-light">
        <div>
          <h3 className="text-xl font-display font-bold text-forest dark:text-parchment">
            Manage Works & Life Cycles
          </h3>
          <p className="text-xs text-forest/60 dark:text-parchment/60 font-mono">
            {works.length} total artifacts in database. Instant status updates without code rebuilds.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-sand/40 dark:border-forest-light text-forest/60 dark:text-parchment/60 font-mono uppercase text-[11px]">
              <th className="pb-3 pr-4 font-semibold">Title & Category</th>
              <th className="pb-3 px-4 font-semibold">Format</th>
              <th className="pb-3 px-4 font-semibold">Status</th>
              <th className="pb-3 px-4 font-semibold">Featured</th>
              <th className="pb-3 px-4 font-semibold">Views</th>
              <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/30 dark:divide-forest-light/60">
            {works.map((work) => (
              <tr key={work.id} className="hover:bg-sand/10 dark:hover:bg-forest-deep/40 transition-colors">
                <td className="py-4 pr-4">
                  <div className="font-semibold text-forest dark:text-parchment line-clamp-1">
                    {work.title}
                  </div>
                  <div className="text-[11px] font-mono text-teal dark:text-teal-light uppercase mt-0.5">
                    {work.category}
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-xs uppercase text-forest/70 dark:text-parchment/70">
                  {work.file_type}
                </td>

                <td className="py-4 px-4">
                  <select
                    value={work.status}
                    onChange={(e) => handleStatusChange(work, e.target.value)}
                    className="text-xs font-mono px-2 py-1 rounded-lg bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light text-forest dark:text-parchment focus:outline-none"
                  >
                    {STATUSES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </td>

                <td className="py-4 px-4">
                  <button
                    onClick={() => handleToggleFeatured(work)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      work.featured
                        ? 'bg-amber-soft dark:bg-amber-glow text-amber-dark dark:text-amber border-amber/40 font-bold'
                        : 'bg-transparent text-forest/40 dark:text-parchment/40 border-sand/40 hover:text-forest'
                    }`}
                    title="Toggle featured status"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </td>

                <td className="py-4 px-4 font-mono text-xs text-forest/80 dark:text-parchment/80">
                  {work.view_count || 0}
                </td>

                <td className="py-4 pl-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {work.github_url && (
                      <a
                        href={work.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-sand/30 hover:bg-sand/60 dark:bg-forest-light text-forest dark:text-parchment transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={work.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-sand/30 hover:bg-sand/60 dark:bg-forest-light text-forest dark:text-parchment transition-colors"
                      title="View file"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(work.id)}
                      disabled={deletingId === work.id}
                      className="p-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error transition-colors disabled:opacity-30"
                      title="Delete work"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
