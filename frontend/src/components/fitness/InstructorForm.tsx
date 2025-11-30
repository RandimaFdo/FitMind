import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { InstructorFormValues } from '../../types/fitness'

interface InstructorFormProps {
  open: boolean
  mode: 'create' | 'edit'
  title?: string
  initialValues?: InstructorFormValues
  onClose: () => void
  onSubmit: (values: InstructorFormValues) => void
}

const defaultValues: InstructorFormValues = {
  name: '',
  specialization: '',
  experience: '',
  contact: '',
}

export function InstructorForm({ open, onClose, onSubmit, initialValues, mode, title }: InstructorFormProps) {
  const [formValues, setFormValues] = useState<InstructorFormValues>(initialValues ?? defaultValues)

  useEffect(() => {
    if (open) {
      setFormValues(initialValues ?? defaultValues)
    }
  }, [initialValues, open])

  if (!open) return null

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(formValues)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
        <header className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">{mode === 'create' ? 'Add' : 'Update'}</p>
          <h2 className="text-2xl font-semibold text-white">{title ?? 'Instructor'}</h2>
          <p className="text-sm text-slate-400">Curate coaching talent aligned with the gym's focus.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm text-slate-200">
            Name
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Specialization
            <input
              type="text"
              name="specialization"
              value={formValues.specialization}
              onChange={handleChange}
              placeholder="e.g. Conditioning, Mobility"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Experience
            <input
              type="text"
              name="experience"
              value={formValues.experience}
              onChange={handleChange}
              placeholder="e.g. 5 yrs coaching athletes"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Contact
            <input
              type="text"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              placeholder="Phone, email, or handle"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
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
              {mode === 'create' ? 'Save instructor' : 'Update' }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
