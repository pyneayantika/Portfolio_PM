'use client'

import { useState } from 'react'
import { UploadCloud, CheckCircle, FileText, Sparkles, Calendar, Tag } from 'lucide-react'
import { CATEGORIES, STATUSES } from '@/lib/constants'
import { saveWork, supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function UploadForm({ onWorkSaved }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('teardown')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [fileType, setFileType] = useState('pdf')
  const [fileUrl, setFileUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [status, setStatus] = useState('draft')
  const [revealDate, setRevealDate] = useState('')
  const [featured, setFeatured] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const ext = selectedFile.name.split('.').pop().toLowerCase()
      if (['pdf', 'pptx', 'docx'].includes(ext)) {
        setFileType(ext)
      }
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setSuccess(false)

    let finalFileUrl = fileUrl

    // 1. Upload to Supabase Storage if file is attached and Supabase is configured
    if (file && isSupabaseConfigured && supabase) {
      try {
        const timestamp = Date.now()
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase()
        const storagePath = `works/${timestamp}-${cleanName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio-works')
          .upload(storagePath, file)

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('portfolio-works')
            .getPublicUrl(storagePath)
          
          finalFileUrl = publicUrlData?.publicUrl || finalFileUrl
        }
      } catch (err) {
        console.warn('Storage upload error, using raw file simulation:', err)
      }
    }

    if (!finalFileUrl) {
      finalFileUrl = file ? URL.createObjectURL(file) : 'https://raw.githubusercontent.com/ayantikadas/assets/main/demo.pdf'
    }

    const payload = {
      title,
      category,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      github_url: githubUrl,
      file_url: finalFileUrl,
      file_name: file?.name || `${title.toLowerCase().replace(/\s+/g, '-')}.${fileType}`,
      file_type: fileType,
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
      status,
      reveal_date: revealDate ? new Date(revealDate).toISOString() : null,
      featured,
      sort_order: 1,
      view_count: 0,
    }

    await saveWork(payload)
    setUploading(false)
    setSuccess(true)
    
    // Reset fields
    setTitle('')
    setDescription('')
    setTags('')
    setGithubUrl('')
    setFileUrl('')
    setFile(null)

    if (onWorkSaved) onWorkSaved()
  }

  return (
    <div className="bg-parchment-card dark:bg-forest-surface rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light shadow-card">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand/40 dark:border-forest-light">
        <div>
          <h3 className="text-xl font-display font-bold text-forest dark:text-parchment">
            Upload & Publish Work Deliverable
          </h3>
          <p className="text-xs text-forest/60 dark:text-parchment/60 font-mono">
            Drag & drop PPTX / PDF artifacts with instant real-time sync.
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green/10 border border-green/30 text-xs text-green-dark dark:text-green-bright flex items-center gap-2 font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Artifact successfully uploaded and synchronized!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Dropzone */}
        <div className="border-2 border-dashed border-sand hover:border-green dark:border-forest-light dark:hover:border-green-bright rounded-2xl p-6 text-center bg-sand/10 dark:bg-forest-deep/40 transition-colors">
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.pptx,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <UploadCloud className="w-10 h-10 mx-auto text-forest/40 dark:text-parchment/40 mb-2" />
            <div className="text-sm font-semibold text-forest dark:text-parchment">
              {file ? file.name : 'Click to select or drag & drop PDF / PPTX / DOCX'}
            </div>
            <div className="text-xs text-forest/50 dark:text-parchment/50 font-mono mt-1">
              Supports up to 50MB per file
            </div>
          </label>
        </div>

        {/* Title & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              Artifact Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Myntra Maya Agentic Teardown"
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
            Executive Summary / Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Key problem, methodology, and PM takeaways..."
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
          />
        </div>

        {/* Tags, GitHub URL & File URL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Agentic AI, User Research, E-Commerce"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/pyneayantika/..."
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              External File URL (Optional fallback)
            </label>
            <input
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            />
          </div>
        </div>

        {/* Status, Reveal Date & Featured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            >
              {STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1">
              Reveal Date (for Coming Soon)
            </label>
            <input
              type="datetime-local"
              value={revealDate}
              onChange={(e) => setRevealDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-green focus:ring-green"
            />
            <label htmlFor="featured-toggle" className="text-xs font-semibold text-forest dark:text-parchment cursor-pointer flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              <span>Feature on Hero / Top of Grid</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-sand/40 dark:border-forest-light">
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-green text-parchment dark:bg-green-bright dark:text-forest shadow-md hover:bg-green-dark transition-all disabled:opacity-50"
          >
            {uploading ? 'Processing & Syncing...' : 'Save & Publish Artifact'}
          </button>
        </div>
      </form>
    </div>
  )
}
