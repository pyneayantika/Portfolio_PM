'use client'

import { useEffect } from 'react'
import { X, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function FileViewer({ work, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    if (work) {
      trackEvent('file_view', { workId: work.id, title: work.title, fileType: work.file_type }, 'works')
      
      // Attempt view count increment
      try {
        fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workId: work.id }),
        }).catch(() => {})
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [work, onClose])

  if (!work) return null

  const isPdf = work.file_type === 'pdf'
  const isPptx = work.file_type === 'pptx' || work.file_type === 'docx'

  // Office Online Embed URL
  const encodedUrl = encodeURIComponent(work.file_url)
  const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-forest-deep/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] bg-parchment-card dark:bg-forest-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-sand/60 dark:border-forest-light">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-sand/40 dark:border-forest-light flex items-center justify-between gap-4 bg-parchment-light/50 dark:bg-forest-surface">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-2 rounded-lg bg-green/10 dark:bg-green-bright/10 text-green dark:text-green-bright">
              <FileText className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base md:text-lg font-display font-semibold text-forest dark:text-parchment truncate">
                {work.title}
              </h3>
              <p className="text-xs text-forest/60 dark:text-parchment/60 font-mono">
                {work.file_name} • {work.file_type?.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {work.github_url && (
              <a
                href={work.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment transition-colors"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={work.file_url}
              download={work.file_name}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={work.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green/10 hover:bg-green/20 dark:bg-green-bright/10 text-green dark:text-green-bright transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Raw File</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-forest/60 hover:text-forest dark:text-parchment/60 dark:hover:text-parchment hover:bg-sand/40 dark:hover:bg-forest-light transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Embed Body */}
        <div className="flex-1 w-full bg-sand/20 dark:bg-forest-deep relative overflow-hidden flex items-center justify-center">
          {isPdf ? (
            <iframe
              src={`${work.file_url}#toolbar=0`}
              title={work.title}
              className="w-full h-full border-none"
            />
          ) : isPptx ? (
            <iframe
              src={officeOnlineUrl}
              title={work.title}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="text-center p-8 max-w-md">
              <AlertCircle className="w-12 h-12 mx-auto text-amber mb-3" />
              <h4 className="text-lg font-semibold text-forest dark:text-parchment mb-2">
                Viewer Preview Unavailable
              </h4>
              <p className="text-sm text-forest/70 dark:text-parchment/70 mb-4">
                This format is best viewed downloaded or opened in your native application.
              </p>
              <a
                href={work.file_url}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-green text-parchment rounded-lg text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
