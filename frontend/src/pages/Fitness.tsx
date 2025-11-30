import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck2, MapPin, Plus, Zap } from 'lucide-react'
import { FitnessPlans } from '../components/fitness/FitnessPlans'
import { GymCard } from '../components/fitness/GymCard'
import { AddGymModal } from '../components/fitness/AddGymModal'
import { AppointmentModal } from '../components/fitness/AppointmentModal'
import { useFitness } from '../context/FitnessContext'

export function Fitness() {
  const {
    plans,
    gyms,
    appointments,
    instructors,
    savedPlanIds,
    routinePlanIds,
    savePlan,
    addPlanToRoutine,
    addGym,
    addAppointment,
    updateAppointmentInstructor,
  } = useFitness()

  const [isAddGymOpen, setIsAddGymOpen] = useState(false)
  const [bookingGymId, setBookingGymId] = useState<string | null>(null)

  const bookingGym = useMemo(() => gyms.find((gym) => gym.id === bookingGymId), [bookingGymId, gyms])

  const appointmentRows = useMemo(() => {
    return [...appointments].sort((a, b) => a.date.localeCompare(b.date))
  }, [appointments])

  const handleAssignInstructor = (appointmentId: string, instructorId?: string) => {
    updateAppointmentInstructor(appointmentId, instructorId)
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-slate-900 to-slate-950 p-8 text-white shadow-glow">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Fitness OS</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-semibold">Fitness hub for plans, spaces, and coaches</h1>
            <p className="text-base text-white/80">
              Curate weekly training flows, discover vetted gyms, and sync instructors with every appointment—all inside one
              structured workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddGymOpen(true)}
            className="flex items-center gap-2 rounded-full bg-brand-aqua/80 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
          >
            <Plus className="h-4 w-4" /> Add new gym
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Plans</p>
            <p className="mt-2 text-3xl font-semibold">{plans.length}</p>
            <p className="text-sm text-white/70">Structured programs live</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Spaces</p>
            <p className="mt-2 text-3xl font-semibold">{gyms.length}</p>
            <p className="text-sm text-white/70">Gyms & studios curated</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Appointments</p>
            <p className="mt-2 text-3xl font-semibold">{appointments.length}</p>
            <p className="text-sm text-white/70">Upcoming sessions</p>
          </div>
        </div>
      </section>

      <FitnessPlans
        plans={plans}
        savedPlanIds={savedPlanIds}
        routinePlanIds={routinePlanIds}
        onSavePlan={savePlan}
        onAddToRoutine={addPlanToRoutine}
      />

      <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-10 w-10 rounded-2xl border border-white/10 p-2 text-brand-aqua" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Nearby</p>
              <h2 className="text-2xl font-semibold text-white">Gyms & boutique studios</h2>
            </div>
          </div>
          <Link
            to="/fitness/gyms"
            className="ml-auto text-sm font-medium text-brand-aqua transition hover:text-white"
          >
            View all gyms
          </Link>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} onBook={(id) => setBookingGymId(id)} />
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <CalendarCheck2 className="h-10 w-10 rounded-2xl border border-white/10 p-2 text-brand-aqua" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Appointments</p>
              <h2 className="text-2xl font-semibold text-white">Bookings & instructor assignment</h2>
            </div>
          </div>
        </header>

        {appointmentRows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
            No appointments yet. Book a gym to start stitching your week.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5 text-sm text-white">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                  <th className="px-4 py-3">Gym</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Activity</th>
                  <th className="px-4 py-3">Instructor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {appointmentRows.map((appointment) => {
                  const gym = gyms.find((item) => item.id === appointment.gymId)
                  const gymInstructors = instructors.filter((instructor) => instructor.gymId === appointment.gymId)

                  return (
                    <tr key={appointment.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{gym?.name ?? 'Unknown gym'}</div>
                        <p className="text-xs text-slate-400">{gym?.location}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{appointment.date}</td>
                      <td className="px-4 py-3 text-slate-200">{appointment.time}</td>
                      <td className="px-4 py-3 text-slate-200">{appointment.activity}</td>
                      <td className="px-4 py-3">
                        <select
                          value={appointment.instructorId ?? ''}
                          onChange={(event) => handleAssignInstructor(appointment.id, event.target.value || undefined)}
                          className="w-full rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white focus:border-brand-aqua focus:outline-none"
                        >
                          <option value="">Assign later</option>
                          {gymInstructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                              {instructor.name} · {instructor.specialization}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/70 p-6">
        <header className="flex items-center gap-3">
          <Zap className="h-10 w-10 rounded-2xl border border-white/10 p-2 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Workflow</p>
            <h2 className="text-2xl font-semibold text-white">Add a gym shortcut</h2>
          </div>
        </header>
        <p className="text-sm text-slate-300">
          Keep your network fresh by logging new gyms, pop-up studios, or speciality labs that match your training culture.
          Each new entry becomes immediately bookable.
        </p>
        <button
          type="button"
          onClick={() => setIsAddGymOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-aqua/40 px-6 py-3 text-sm font-semibold text-brand-aqua transition hover:border-brand-aqua"
        >
          <Plus className="h-4 w-4" /> Add new gym
        </button>
      </section>

      <AddGymModal open={isAddGymOpen} onClose={() => setIsAddGymOpen(false)} onSubmit={addGym} />

      <AppointmentModal
        open={Boolean(bookingGym)}
        onClose={() => setBookingGymId(null)}
        onSubmit={(values) => {
          if (!bookingGymId) return
          addAppointment(bookingGymId, values)
          setBookingGymId(null)
        }}
        instructors={instructors.filter((instructor) => instructor.gymId === bookingGymId)}
        gymName={bookingGym?.name ?? 'Gym'}
      />
    </div>
  )
}
