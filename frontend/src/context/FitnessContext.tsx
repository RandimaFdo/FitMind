import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type {
  AddGymFormValues,
  Appointment,
  AppointmentFormValues,
  FitnessPlan,
  Gym,
  Instructor,
  InstructorFormValues,
} from '../types/fitness'

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const initialPlans: FitnessPlan[] = [
  {
    id: 'plan-1',
    name: 'Strength Foundations',
    description: 'Full-body program for rebuilding strength and posture.',
    duration: '6 weeks',
    intensity: 'Moderate',
    details:
      'Progressive overload split combining compound lifts, tempo work, and mobility resets to steadily increase strength without overtraining.',
    focusAreas: ['Compound lifts', 'Posterior chain', 'Mobility'],
    equipment: ['Barbell', 'Dumbbells', 'Resistance bands'],
  },
  {
    id: 'plan-2',
    name: 'Metabolic Shred',
    description: 'High-energy conditioning with controlled intervals.',
    duration: '4 weeks',
    intensity: 'High',
    details:
      'Hybrid cardio-strength training alternating EMOM blocks with sprint intervals. Perfect for improving VO₂ max while preserving lean mass.',
    focusAreas: ['Conditioning', 'HIIT', 'Core stability'],
    equipment: ['Kettlebells', 'Battle ropes', 'Sled'],
  },
  {
    id: 'plan-3',
    name: 'Mindful Mobility',
    description: 'Restore balance with intelligent mobility flows.',
    duration: '3 weeks',
    intensity: 'Low',
    details:
      'Guided breathwork, fascia release, and single-leg stability drills designed for active recovery or low-impact training days.',
    focusAreas: ['Mobility', 'Balance', 'Breathwork'],
    equipment: ['Yoga blocks', 'Foam roller', 'Light bands'],
  },
]

const initialGyms: Gym[] = [
  {
    id: 'gym-1',
    name: 'Pulse Performance Hub',
    address: '102 Aurora Street',
    location: 'Colombo 05',
    hours: '5:30 AM – 10:00 PM',
    category: 'Full Gym',
    description:
      'A performance-forward space blending functional zones, cold plunge recovery, and expert coaching for athletes and professionals.',
    equipment: ['Platforms', 'Assault runners', 'Pilates reformers'],
    services: ['Personal training', 'Infrared sauna', 'Recovery lab'],
    contact: { phone: '+94 77 120 4578', email: 'hello@pulsehub.fit', website: 'https://pulsehub.fit' },
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'gym-2',
    name: 'Studio Flow',
    address: '18 Temple Lane',
    location: 'Mount Lavinia',
    hours: '6:00 AM – 9:00 PM',
    category: 'Yoga Studio',
    description:
      'Boutique studio with immersive lighting, aroma therapy, and curated playlists for mindful movement and low-impact sculpt.',
    equipment: ['Reformer beds', 'Aerial silks', 'Yoga props'],
    services: ['Hot yoga', 'Sound baths', 'Prenatal flow'],
    contact: { phone: '+94 77 892 1182', email: 'namaste@studioflow.lk' },
    images: [
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1468645547353-56d4150fbf01?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

const initialInstructors: Instructor[] = [
  {
    id: 'inst-1',
    gymId: 'gym-1',
    name: 'Maya Rodrigo',
    specialization: 'Strength & Hybrid Conditioning',
    experience: '8 yrs coaching athletes & founders',
    contact: '+94 71 660 4421',
  },
  {
    id: 'inst-2',
    gymId: 'gym-2',
    name: 'Dev Jain',
    specialization: 'Mobility & Breathwork',
    experience: '500+ hrs RYT | Neuro mobility certified',
    contact: '+94 77 211 9810',
  },
]

const initialAppointments: Appointment[] = [
  {
    id: 'appt-1',
    gymId: 'gym-1',
    date: '2025-12-02',
    time: '07:30',
    activity: 'Strength assessment',
    preferredTrainer: 'Coach Maya',
    instructorId: 'inst-1',
  },
]

type FitnessContextValue = {
  plans: FitnessPlan[]
  gyms: Gym[]
  instructors: Instructor[]
  appointments: Appointment[]
  savedPlanIds: string[]
  routinePlanIds: string[]
  savePlan: (planId: string) => void
  addPlanToRoutine: (planId: string) => void
  addGym: (values: AddGymFormValues) => void
  addAppointment: (gymId: string, values: AppointmentFormValues & { instructorId?: string }) => void
  addInstructor: (gymId: string, values: InstructorFormValues) => void
  updateInstructor: (instructorId: string, values: InstructorFormValues) => void
  updateAppointmentInstructor: (appointmentId: string, instructorId?: string) => void
  addGymImage: (gymId: string, imageUrl: string) => void
}

const FitnessContext = createContext<FitnessContextValue | undefined>(undefined)

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [plans] = useState(initialPlans)
  const [gyms, setGyms] = useState(initialGyms)
  const [instructors, setInstructors] = useState(initialInstructors)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [savedPlanIds, setSavedPlanIds] = useState<string[]>([])
  const [routinePlanIds, setRoutinePlanIds] = useState<string[]>([])

  const savePlan = useCallback((planId: string) => {
    setSavedPlanIds((prev) => (prev.includes(planId) ? prev : [...prev, planId]))
  }, [])

  const addPlanToRoutine = useCallback((planId: string) => {
    setRoutinePlanIds((prev) => (prev.includes(planId) ? prev : [...prev, planId]))
  }, [])

  const addGym = useCallback((values: AddGymFormValues) => {
    const newGym: Gym = {
      id: generateId(),
      name: values.name,
      address: values.address,
      location: values.location,
      hours: values.hours,
      category: values.category,
      description: values.description,
      equipment: values.equipment.split(',').map((item) => item.trim()).filter(Boolean),
      services: values.services.split(',').map((item) => item.trim()).filter(Boolean),
      contact: {
        phone: values.phone,
        email: values.email,
        website: values.website,
      },
      images:
        values.images?.split(',').map((url) => url.trim()).filter(Boolean) ?? [
          'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=80',
        ],
    }

    setGyms((prev) => [...prev, newGym])
  }, [])

  const addAppointment = useCallback(
    (gymId: string, values: AppointmentFormValues & { instructorId?: string }) => {
      const appointment: Appointment = {
        id: generateId(),
        gymId,
        date: values.date,
        time: values.time,
        activity: values.activity,
        preferredTrainer: values.preferredTrainer,
        instructorId: values.instructorId,
      }

      setAppointments((prev) => [...prev, appointment])
    },
    [],
  )

  const addInstructor = useCallback((gymId: string, values: InstructorFormValues) => {
    const instructor: Instructor = {
      id: generateId(),
      gymId,
      name: values.name,
      specialization: values.specialization,
      experience: values.experience,
      contact: values.contact,
    }

    setInstructors((prev) => [...prev, instructor])
  }, [])

  const updateInstructor = useCallback((instructorId: string, values: InstructorFormValues) => {
    setInstructors((prev) =>
      prev.map((instructor) =>
        instructor.id === instructorId ? { ...instructor, ...values } : instructor,
      ),
    )
  }, [])

  const updateAppointmentInstructor = useCallback((appointmentId: string, instructorId?: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, instructorId } : appointment,
      ),
    )
  }, [])

  const addGymImage = useCallback((gymId: string, imageUrl: string) => {
    if (!imageUrl.trim()) return
    setGyms((prev) =>
      prev.map((gym) =>
        gym.id === gymId ? { ...gym, images: [...gym.images, imageUrl.trim()] } : gym,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      plans,
      gyms,
      instructors,
      appointments,
      savedPlanIds,
      routinePlanIds,
      savePlan,
      addPlanToRoutine,
      addGym,
      addAppointment,
      addInstructor,
      updateInstructor,
      updateAppointmentInstructor,
      addGymImage,
    }),
    [
      plans,
      gyms,
      instructors,
      appointments,
      savedPlanIds,
      routinePlanIds,
      savePlan,
      addPlanToRoutine,
      addGym,
      addAppointment,
      addInstructor,
      updateInstructor,
      updateAppointmentInstructor,
      addGymImage,
    ],
  )

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
}

export function useFitness() {
  const context = useContext(FitnessContext)
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider')
  }

  return context
}
