'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, UploadCloud, FolderKanban, MessageSquare, BarChart3, ShieldCheck, LogOut } from 'lucide-react'
import AdminAuth from '@/components/admin/AdminAuth'
import UploadForm from '@/components/admin/UploadForm'
import WorksManager from '@/components/admin/WorksManager'
import ChatLogsViewer from '@/components/admin/ChatLogsViewer'
import AnalyticsViewer from '@/components/admin/AnalyticsViewer'
import { fetchAllWorksForAdmin } from '@/lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [activeTab, setActiveTab] = useState('works')
  const [works, setWorks] = useState([])
  const [loadingWorks, setLoadingWorks] = useState(false)

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_authed') === 'true'
    const savedKey = sessionStorage.getItem('admin_key') || ''
    if (isAuthed) {
      setIsAuthenticated(true)
      setAdminKey(savedKey)
      loadWorks()
    }
  }, [])

  const loadWorks = async () => {
    setLoadingWorks(true)
    const data = await fetchAllWorksForAdmin()
    setWorks(data || [])
    setLoadingWorks(false)
  }

  const handleAuthenticated = (key) => {
    setIsAuthenticated(true)
    setAdminKey(key)
    loadWorks()
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed')
    sessionStorage.removeItem('admin_key')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-parchment dark:bg-forest-deep text-forest dark:text-parchment pb-16">
      {/* Admin Top Navigation */}
      <header className="glass-nav sticky top-0 z-30 py-4 px-4 sm:px-6 lg:px-8 border-b border-sand/40 dark:border-forest-light">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="p-2 rounded-xl bg-sand/30 hover:bg-sand/60 dark:bg-forest-light text-forest dark:text-parchment transition-colors"
              title="Return to public portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green dark:text-green-bright" />
                <h1 className="font-display font-bold text-base sm:text-lg text-forest dark:text-parchment leading-none">
                  Ayantika's Portfolio CMS
                </h1>
              </div>
              <span className="text-[10px] font-mono text-green dark:text-green-bright">
                Live Supabase Connected • Zero-Downtime Updates
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-error hover:bg-error/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Exit</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sand/40 dark:border-forest-light">
          <button
            onClick={() => setActiveTab('works')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'works'
                ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest shadow'
                : 'text-forest/70 dark:text-parchment/70 hover:bg-sand/30'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Works Manager ({works.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest shadow'
                : 'text-forest/70 dark:text-parchment/70 hover:bg-sand/30'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Deliverable</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest shadow'
                : 'text-forest/70 dark:text-parchment/70 hover:bg-sand/30'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Moderation</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest shadow'
                : 'text-forest/70 dark:text-parchment/70 hover:bg-sand/30'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Active Tab Views */}
        {activeTab === 'works' && (
          <WorksManager
            works={works}
            onReload={loadWorks}
          />
        )}

        {activeTab === 'upload' && (
          <UploadForm
            onWorkSaved={() => {
              loadWorks()
              setActiveTab('works')
            }}
          />
        )}

        {activeTab === 'chat' && (
          <ChatLogsViewer adminKey={adminKey} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsViewer works={works} />
        )}
      </main>
    </div>
  )
}
