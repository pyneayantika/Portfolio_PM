'use client'

import { Sparkles } from 'lucide-react'
import { SUGGESTED_QUESTIONS } from '@/lib/constants'

export default function SuggestedQuestions({ onSelectQuestion }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-mono text-forest/60 dark:text-parchment/60 font-semibold px-1">
        <Sparkles className="w-3.5 h-3.5 text-amber" />
        <span>Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(question)}
            className="text-left text-xs px-3 py-1.5 rounded-xl bg-parchment-light dark:bg-forest-surface hover:bg-green/10 dark:hover:bg-green-bright/10 text-forest dark:text-parchment border border-sand/60 dark:border-forest-light hover:border-green/50 dark:hover:border-green-bright/50 transition-all leading-snug"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
