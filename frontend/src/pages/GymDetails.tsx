import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Camera, MapPin, Phone, Users } from 'lucide-react'
import { AppointmentModal } from '../components/fitness/AppointmentModal'
import { InstructorForm } from '../components/fitness/InstructorForm'
import { useFitness } from '../context/FitnessContext'
import type { InstructorFormValues } from '../types/fitness'

export function GymDetails() {
  const { gymId } = useParams()
  const navigate = useNavigate()
  const {
    gyms,
    appointments,
    instructors,
    addAppointment,
    addInstructor,
    updateInstructor,
    addGymImage,
    updateAppointmentInstructor,
  } = useFitness()

  const gym = gyms.find((item) => item.id === gymId)

  const gymAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.gymId === gymId),
    [appointments, gymId],
  )

  const gymInstructors = useMemo(
    () => instructors.filter((instructor) => instructor.gymId === gymId),
    [instructors, gymId],
  )

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [instructorModal, setInstructorModal] = useState<
    | {
        mode: 'create'
        initialValues?: InstructorFormValues
        instructorId?: string
      }
    | {
        mode: 'edit'
        initialValues: InstructorFormValues
        instructorId: string
      }
    | null
  >(null)
  const [imageUrl, setImageUrl] = useState('')

  if (!gym) {
    return (
      <div className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/70 p-8 text-white">
        <p className="text-sm text-slate-300">We couldn't find that gym.</p>
        <button
          type="button"
          onClick={() => navigate('/fitness')}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-brand-aqua"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Fitness
        </button>
      </div>
    )
  }

  const handleSaveInstructor = (values: InstructorFormValues) => {
    if (instructorModal?.mode === 'edit' && instructorModal.instructorId) {
      updateInstructor(instructorModal.instructorId, values)
    } else {
      addInstructor(gym.id, values)
    }
    setInstructorModal(null)
  }

  const handleAddImage = () => {
    if (!imageUrl.trim()) return
    addGymImage(gym.id, imageUrl.trim())
    setImageUrl('')
  }

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-brand-aqua"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <Link to="/fitness" className="text-sm text-slate-400 transition hover:text-white">
          Fitness overview
        </Link>
      </div>

      <header className="space-y-4 rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-slate-900 to-slate-950 p-8 shadow-glow">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Featured gym</p>
            <h1 className="text-4xl font-semibold">{gym.name}</h1>
            <p className="text-base text-white/80">{gym.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-aqua" /> {gym.address} · {gym.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-aqua" /> {gym.hours}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-aqua" /> {gym.contact.phone}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-brand-aqua/80 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
            >
              Book appointment
            </button>
            <button
              type="button"
              onClick={() =>
                setInstructorModal({ mode: 'create', initialValues: { name: '', specialization: '', experience: '', contact: '' } })
              }
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-aqua"
            >
              Assign new instructor
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="space-y-5 rounded-3xl border border-white/5 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Equipment</h2>
          <ul className="grid grid-cols-2 gap-3 text-sm text-slate-300 md:grid-cols-3">
            {gym.equipment.map((item) => (
              <li key={item} className="rounded-2xl border border-white/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="space-y-5 rounded-3xl border border-white/5 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Services & activities</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {gym.services.map((service) => (
              <li key={service} className="rounded-2xl border border-white/5 px-3 py-2">
                {service}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Camera className="h-6 w-6 text-brand-aqua" />
            <h2 className="text-xl font-semibold">Gallery</h2>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Paste an image URL"
              className="w-64 flex-1 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-white focus:border-brand-aqua focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-brand-aqua"
            >
              Add photo
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {gym.images.map((image) => (
            <figure key={image} className="overflow-hidden rounded-2xl border border-white/5">
              <img src={image} alt={`${gym.name} gallery`} className="h-48 w-full object-cover" loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Appointments</p>
            <h2 className="text-xl font-semibold">Schedule & instructors</h2>
          </div>
        </header>

        {gymAppointments.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
            No appointments booked yet. Tap "Book appointment" to create one.
          </p>
        ) : (
          <div className="space-y-3">
            {gymAppointments.map((appointment) => (
              <article key={appointment.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{appointment.date} · {appointment.time}</p>
                  <p className="text-lg font-semibold">{appointment.activity}</p>
                  {appointment.preferredTrainer && (
                    <p className="text-sm text-slate-400">Preferred: {appointment.preferredTrainer}</p>
                  )}
                </div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Instructor
                  <select
                    value={appointment.instructorId ?? ''}
                    onChange={(event) =>
                      updateAppointmentInstructor(appointment.id, event.target.value || undefined)
                    }
                    className="mt-1 rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-white focus:border-brand-aqua focus:outline-none"
                  >
                    <option value="">Assign later</option>
                    {gymInstructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
                </label>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex items-center gap-3">
          <Users className="h-8 w-8 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Instructors</p>
            <h2 className="text-xl font-semibold">Assigned coaching talent</h2>
          </div>
        </header>

        {gymInstructors.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
            No instructors assigned yet. Add one to start routing bookings.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {gymInstructors.map((instructor) => (
              <article key={instructor.id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{instructor.name}</h3>
                    <p className="text-sm text-slate-400">{instructor.specialization}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setInstructorModal({
                        mode: 'edit',
                        instructorId: instructor.id,
                        initialValues: {
                          name: instructor.name,
                          specialization: instructor.specialization,
                          experience: instructor.experience,
                          contact: instructor.contact,
                        },
                      })
                    }
                    className="text-xs text-brand-aqua"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-300">{instructor.experience}</p>
                <p className="text-sm text-slate-400">{instructor.contact}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <AppointmentModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={(values) => {
          if (!gymId) return
          addAppointment(gymId, values)
          setIsBookingOpen(false)
        }}
        instructors={gymInstructors}
        gymName={gym.name}
        defaultInstructorId={gymInstructors[0]?.id}
      />

      <InstructorForm
        open={Boolean(instructorModal)}
        mode={instructorModal?.mode ?? 'create'}
        title={`${gym.name} instructor`}
        initialValues={instructorModal?.initialValues}
        onClose={() => setInstructorModal(null)}
        onSubmit={handleSaveInstructor}
      />
    </div>
  )
}
