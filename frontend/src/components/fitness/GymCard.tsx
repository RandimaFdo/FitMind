import { Link } from 'react-router-dom'
import type { Gym } from '../../types/fitness'

interface GymCardProps {
  gym: Gym
  onBook?: (gymId: string) => void
}

const placeholderImg = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80'

export function GymCard({ gym, onBook }: GymCardProps) {
  const coverImage = gym.images[0] ?? placeholderImg

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 shadow-lg shadow-black/20">
      <div className="relative h-44 overflow-hidden">
        <img src={coverImage} alt={`${gym.name} cover`} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {gym.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{gym.name}</h3>
          <p className="text-sm text-slate-400">{gym.address}</p>
          <p className="text-sm text-slate-300">{gym.description}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          <div>
            <dt className="text-[0.65rem]">Location</dt>
            <dd className="text-sm text-white/90">{gym.location}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem]">Hours</dt>
            <dd className="text-sm text-white/90">{gym.hours}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem]">Equipment</dt>
            <dd className="text-sm text-white/90">{gym.equipment.slice(0, 3).join(', ')}{gym.equipment.length > 3 ? '…' : ''}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem]">Services</dt>
            <dd className="text-sm text-white/90">{gym.services.slice(0, 3).join(', ')}{gym.services.length > 3 ? '…' : ''}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-3">
          <Link
            to={`/fitness/gyms/${gym.id}`}
            className="flex-1 rounded-full bg-brand-aqua/80 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
          >
            View full details
          </Link>
          {onBook && (
            <button
              type="button"
              onClick={() => onBook(gym.id)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-neon"
            >
              Book slot
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
