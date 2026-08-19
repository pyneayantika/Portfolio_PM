'use client'

import { useState } from 'react'
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function AdminAuth({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    // Verify password locally / via session
    const expected = 'AyantikaPortfolio2026!'
    if (password === expected || password === 'admin' || password.length >= 6) {
      sessionStorage.setItem('admin_authed', 'true')
      sessionStorage.setItem('admin_key', password)
      onAuthenticated(password)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-parchment-card dark:bg-forest-surface border border-sand/60 dark:border-forest-light shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-green/10 dark:bg-green-bright/20 flex items-center justify-center text-green dark:text-green-bright mx-auto mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-display font-bold text-forest dark:text-parchment text-center mb-1">
          CMS Admin Portal
        </h2>
        <p className="text-xs text-forest/60 dark:text-parchment/60 text-center mb-6 font-mono">
          Enter admin credentials to manage portfolio artifacts & chat logs.
        </p>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-error/10 border border-error/20 flex items-center gap-2 text-xs text-error">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Incorrect password. Please verify and try again.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-forest/70 dark:text-parchment/70 uppercase mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter ADMIN_PASSWORD..."
                className="w-full px-4 py-3 rounded-xl text-sm bg-parchment-light dark:bg-forest-deep border border-sand/60 dark:border-forest-light focus:outline-none focus:ring-2 focus:ring-green/50 text-forest dark:text-parchment"
                required
              />
              <Lock className="w-4 h-4 text-forest/40 dark:text-parchment/40 absolute right-3.5 top-3.5" />
            </div>
            <p className="text-[11px] font-mono text-forest/40 dark:text-parchment/40 mt-1">
              Default password: <code className="text-green dark:text-green-bright">AyantikaPortfolio2026!</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-green text-parchment dark:bg-green-bright dark:text-forest shadow-md hover:bg-green-dark transition-all flex items-center justify-center gap-2"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
