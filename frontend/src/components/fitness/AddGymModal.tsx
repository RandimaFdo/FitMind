import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { AddGymFormValues } from '../../types/fitness'

interface AddGymModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: AddGymFormValues) => void
}

const defaultValues: AddGymFormValues = {
  name: '',
  address: '',
  location: '',
  description: '',
  category: 'Full Gym',
  hours: '',
  equipment: '',
  services: '',
  phone: '',
  email: '',
  website: '',
  images: '',
}

export function AddGymModal({ open, onClose, onSubmit }: AddGymModalProps) {
  const [formValues, setFormValues] = useState<AddGymFormValues>(defaultValues)

  useEffect(() => {
    if (!open) {
      setFormValues(defaultValues)
    }
  }, [open])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(formValues)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
        <header className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Community</p>
          <h2 className="text-2xl font-semibold text-white">Add a new gym</h2>
          <p className="text-sm text-slate-400">Submit curated spaces that align with the FitMind training experience.</p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
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
              Category
              <select
                name="category"
                value={formValues.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              >
                <option>Full Gym</option>
                <option>Boxing Gym</option>
                <option>Yoga Studio</option>
                <option>Pilates Lab</option>
                <option>Recovery Studio</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Address
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Neighborhood / Location
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Opening hours
              <input
                type="text"
                name="hours"
                value={formValues.hours}
                onChange={handleChange}
                placeholder="e.g. 5:00 AM – 10:00 PM"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Website
              <input
                type="url"
                name="website"
                value={formValues.website}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Description
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Equipment (comma separated)
              <textarea
                name="equipment"
                value={formValues.equipment}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Services (comma separated)
              <textarea
                name="services"
                value={formValues.services}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-200">
              Phone
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
              Email
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Image URLs (comma separated)
            <textarea
              name="images"
              value={formValues.images}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap justify-end gap-3 pt-4">
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
              Save gym
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
