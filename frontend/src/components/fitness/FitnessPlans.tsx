import { useState } from 'react'
import type { FitnessPlan } from '../../types/fitness'

interface FitnessPlansProps {
  plans: FitnessPlan[]
  savedPlanIds: string[]
  routinePlanIds: string[]
  onSavePlan: (planId: string) => void
  onAddToRoutine: (planId: string) => void
}

export function FitnessPlans({ plans, savedPlanIds, routinePlanIds, onSavePlan, onAddToRoutine }: FitnessPlansProps) {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null)

  const toggleDetails = (planId: string) => {
    setExpandedPlanId((prev) => (prev === planId ? null : planId))
  }

  return (
    <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-lg shadow-black/20">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Programs</p>
          <h2 className="text-2xl font-semibold text-white">Fitness Plans</h2>
          <p className="text-sm text-slate-400">Curated training blocks tuned for different goals and seasons.</p>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => {
          const isSaved = savedPlanIds.includes(plan.id)
          const inRoutine = routinePlanIds.includes(plan.id)
          const isExpanded = expandedPlanId === plan.id

          return (
            <article
              key={plan.id}
              className="flex flex-col rounded-2xl border border-white/5 bg-slate-800/80 p-5 transition hover:border-brand-neon/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{plan.duration}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
                </div>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-brand-aqua">
                  {plan.intensity}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus</p>
                  <p>{plan.focusAreas.join(' · ')}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Suggested kit</p>
                  <p>{plan.equipment.join(', ')}</p>
                </div>
              </div>

              {isExpanded && (
                <p className="mt-3 text-sm text-slate-200/90">{plan.details}</p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleDetails(plan.id)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-neon"
                >
                  {isExpanded ? 'Hide details' : 'View details'}
                </button>
                <button
                  type="button"
                  onClick={() => onSavePlan(plan.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isSaved
                      ? 'bg-brand-neon/20 text-brand-neon'
                      : 'bg-white/10 text-white hover:bg-brand-neon hover:text-slate-950'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save plan'}
                </button>
                <button
                  type="button"
                  onClick={() => onAddToRoutine(plan.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    inRoutine
                      ? 'bg-brand-aqua/20 text-brand-aqua'
                      : 'bg-brand-aqua/80 text-slate-950 hover:bg-brand-aqua'
                  }`}
                >
                  {inRoutine ? 'In weekly routine' : 'Add to routine'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
