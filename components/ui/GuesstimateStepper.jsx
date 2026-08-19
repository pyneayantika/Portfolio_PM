'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react'
import guesstimatesData from '@/data/guesstimates.json'
import { trackEvent } from '@/lib/analytics'

export default function GuesstimateStepper() {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const activeProblem = guesstimatesData[selectedProblemIndex] || guesstimatesData[0]
  const steps = activeProblem.steps
  const activeStepData = steps[currentStep]
  const isFinalStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      trackEvent('guesstimate_step', { step: next + 1, questionId: activeProblem.id }, 'product_lab')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
  }

  const handleSelectProblem = (index) => {
    setSelectedProblemIndex(index)
    setCurrentStep(0)
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-sand/60 dark:border-forest-light">
      {/* Header & Problem Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand/40 dark:border-forest-light">
        <div>
          <span className="text-xs font-mono uppercase font-semibold text-teal dark:text-teal-light tracking-wider flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Guesstimate Walkthrough
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-forest dark:text-parchment mt-0.5">
            {activeProblem.title}
          </h3>
          <p className="text-xs font-mono text-forest/60 dark:text-parchment/60 mt-0.5">
            Category: {activeProblem.category}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {guesstimatesData.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectProblem(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedProblemIndex === idx
                  ? 'bg-teal text-parchment dark:bg-teal-light dark:text-forest font-semibold'
                  : 'bg-sand/30 dark:bg-forest-light text-forest/70 dark:text-parchment/70 hover:text-forest'
              }`}
            >
              Case #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-green dark:bg-green-bright'
                  : idx < currentStep
                  ? 'w-2.5 bg-green/40 dark:bg-green-bright/40'
                  : 'w-2.5 bg-sand/60 dark:bg-forest-light'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs font-mono font-semibold text-forest/60 dark:text-parchment/60">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Active Step Content Card */}
      <div className="p-6 md:p-7 rounded-xl bg-parchment-light/80 dark:bg-forest-deep/70 border border-sand/50 dark:border-forest-light min-h-[220px] flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-display font-semibold text-forest dark:text-parchment mb-3 flex items-center gap-2">
            <span>{activeStepData.title}</span>
            {isFinalStep && (
              <CheckCircle className="w-5 h-5 text-green dark:text-green-bright inline" />
            )}
          </h4>

          <div className="text-sm md:text-base text-forest/80 dark:text-parchment/80 leading-relaxed whitespace-pre-line mb-4">
            {activeStepData.description}
          </div>
        </div>

        {activeStepData.callout && (
          <div className="p-3.5 rounded-lg bg-green/10 dark:bg-green-bright/10 border border-green/20 text-xs md:text-sm font-mono font-semibold text-green-dark dark:text-green-bright flex items-center justify-between">
            <span>{activeStepData.callout}</span>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium bg-sand/30 hover:bg-sand/60 dark:bg-forest-light dark:hover:bg-forest-light/80 text-forest dark:text-parchment disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <div className="flex items-center gap-2">
          {isFinalStep ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-green text-parchment dark:bg-green-bright dark:text-forest shadow-md hover:bg-green-dark transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review from Start</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-green text-parchment dark:bg-green-bright dark:text-forest shadow-md hover:bg-green-dark transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
