import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { AppointmentFormValues, Instructor } from '../../types/fitness'

interface AppointmentModalProps {
  open: boolean
  gymName: string
  instructors: Instructor[]
  defaultInstructorId?: string
  onClose: () => void
  onSubmit: (values: AppointmentFormValues & { instructorId?: string }) => void
}

const defaultValues: AppointmentFormValues = {
  date: '',
  time: '',
  activity: '',
  preferredTrainer: '',
}

export function AppointmentModal({
  open,
  onClose,
  onSubmit,
  instructors,
  gymName,
  defaultInstructorId,
}: AppointmentModalProps) {
  const [formValues, setFormValues] = useState(defaultValues)
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | undefined>(defaultInstructorId)

  useEffect(() => {
    if (open) {
      setSelectedInstructorId(defaultInstructorId)
      setFormValues(defaultValues)
    }
  }, [defaultInstructorId, open])

  useEffect(() => {
    if (!open) {
      setFormValues(defaultValues)
    }
  }, [open])

  if (!open) return null

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit({ ...formValues, instructorId: selectedInstructorId })
    onClose()
    setSelectedInstructorId(defaultInstructorId)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
        <header className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Book</p>
          <h2 className="text-2xl font-semibold text-white">Reserve {gymName}</h2>
          <p className="text-sm text-slate-400">Secure a slot that syncs with your training blocks and instructor availability.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm text-slate-200">
            Date
            <input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            Time
            <input
              type="time"
              name="time"
              value={formValues.time}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            Activity focus
            <input
              type="text"
              name="activity"
              value={formValues.activity}
              placeholder="e.g. Conditioning circuit"
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            Preferred trainer (optional)
            <input
              type="text"
              name="preferredTrainer"
              value={formValues.preferredTrainer}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Assign instructor
            <select
              name="instructorId"
              value={selectedInstructorId ?? ''}
              onChange={(event) =>
                setSelectedInstructorId(event.target.value ? event.target.value : undefined)
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            >
              <option value="">Later</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name} · {instructor.specialization}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-neon"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-brand-aqua/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
            >
              Book slot
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
