import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { ArrowLeft, RefreshCcw, Route } from 'lucide-react'

export function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const title = isNotFound ? 'Route not found' : 'Something went wrong'
  const description = isNotFound
    ? 'We couldn’t locate that experience. Use the nav to get back on track.'
    : 'An unexpected issue popped up. You can retry or head back to the dashboard.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <div className="max-w-xl space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center shadow-glow">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80">
          {isNotFound ? <Route className="h-7 w-7 text-brand-aqua" /> : <RefreshCcw className="h-7 w-7 text-brand-aqua" />}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Fitness OS</p>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-slate-300">{description}</p>
          {import.meta.env.DEV && error instanceof Error && (
            <p className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-xs text-left text-rose-200">
              {error.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-brand-aqua"
          >
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full bg-brand-aqua/80 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
