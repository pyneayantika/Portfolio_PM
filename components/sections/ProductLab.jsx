'use client'

import { FlaskConical, Sparkles, ArrowRight, Github, Brain, Zap, CheckCircle2 } from 'lucide-react'
import FrameworkExplorer from '@/components/ui/FrameworkExplorer'
import GuesstimateStepper from '@/components/ui/GuesstimateStepper'

export default function ProductLab() {
  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-soft dark:bg-amber-glow text-amber-dark dark:text-amber text-xs font-mono font-semibold mb-3">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Proof-of-Thinking Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-forest dark:text-parchment tracking-tight">
          Product Lab: How I Think & Scrutinize Problems
        </h2>
        <p className="text-sm sm:text-base text-forest/70 dark:text-parchment/70 mt-3 leading-relaxed">
          Not just polished slides — here is my working method. Explore my structured product design frameworks, estimation logic, and quantitative teardown workflows.
        </p>
      </div>

      {/* 1. Framework Explorer Widget */}
      <div>
        <FrameworkExplorer />
      </div>

      {/* 2. Guesstimate Stepper Widget */}
      <div>
        <GuesstimateStepper />
      </div>

      {/* 3. Featured Repositories Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/60 dark:border-forest-light hover:border-teal/50 transition-all flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-teal dark:text-teal-light mb-1">
              Insurance Comprehension Engine
            </div>
            <h4 className="text-lg font-display font-bold text-forest dark:text-parchment mb-2">
              PolicyLens
            </h4>
            <p className="text-xs text-forest/70 dark:text-parchment/70 leading-relaxed mb-4">
              Hybrid RAG and deterministic rules engine translating 40-page policy PDFs into personalized family protection insights.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-sand/30 dark:border-forest-light">
            <a 
              href="https://github.com/pyneayantika/Policylense" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal dark:text-teal-light hover:underline"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <a href="#works" className="inline-flex items-center gap-1 text-xs font-semibold text-forest/70 hover:text-forest dark:text-parchment/70 dark:hover:text-parchment">
              <span>In Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/60 dark:border-forest-light hover:border-green/50 transition-all flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-green dark:text-green-bright mb-1">
              36 Pipeline Benchmark ($0 Budget)
            </div>
            <h4 className="text-lg font-display font-bold text-forest dark:text-parchment mb-2">
              RAGBench
            </h4>
            <p className="text-xs text-forest/70 dark:text-parchment/70 leading-relaxed mb-4">
              Benchmarking 36 retrieval pipeline configurations evaluated on complex multi-table GHG Protocol PDFs with ChromaDB and Groq.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-sand/30 dark:border-forest-light">
            <a 
              href="https://github.com/pyneayantika/Rag_Chatbot" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-green dark:text-green-bright hover:underline"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <a href="#works" className="inline-flex items-center gap-1 text-xs font-semibold text-forest/70 hover:text-forest dark:text-parchment/70 dark:hover:text-parchment">
              <span>In Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-parchment-light/80 dark:bg-forest-surface border border-sand/60 dark:border-forest-light hover:border-amber/50 transition-all flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-amber-dark dark:text-amber mb-1">
              AI Output Confidence Evaluator
            </div>
            <h4 className="text-lg font-display font-bold text-forest dark:text-parchment mb-2">
              Claude Prism
            </h4>
            <p className="text-xs text-forest/70 dark:text-parchment/70 leading-relaxed mb-4">
              Token-level evaluation layer classifying output into Fact, Assumption, Inference, and Uncertain backed by 43 user surveys.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-sand/30 dark:border-forest-light">
            <a 
              href="https://github.com/pyneayantika/claude-prism" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-dark dark:text-amber hover:underline"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <a href="#works" className="inline-flex items-center gap-1 text-xs font-semibold text-forest/70 hover:text-forest dark:text-parchment/70 dark:hover:text-parchment">
              <span>In Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
