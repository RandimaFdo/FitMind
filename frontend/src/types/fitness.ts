export type IntensityLevel = 'Low' | 'Moderate' | 'High'

export type FitnessPlan = {
  id: string
  name: string
  description: string
  duration: string
  intensity: IntensityLevel
  details: string
  focusAreas: string[]
  equipment: string[]
}

export type GymContact = {
  phone: string
  email: string
  website?: string
}

export type Gym = {
  id: string
  name: string
  address: string
  location: string
  hours: string
  category: string
  description: string
  equipment: string[]
  services: string[]
  contact: GymContact
  images: string[]
}

export type Appointment = {
  id: string
  gymId: string
  date: string
  time: string
  activity: string
  preferredTrainer?: string
  instructorId?: string
}

export type Instructor = {
  id: string
  gymId: string
  name: string
  specialization: string
  experience: string
  contact: string
}

export type AddGymFormValues = {
  name: string
  address: string
  location: string
  description: string
  category: string
  hours: string
  equipment: string
  services: string
  phone: string
  email: string
  website?: string
  images?: string
}

export type AppointmentFormValues = {
  date: string
  time: string
  activity: string
  preferredTrainer?: string
}

export type InstructorFormValues = {
  name: string
  specialization: string
  experience: string
  contact: string
}
