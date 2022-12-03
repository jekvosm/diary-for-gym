export interface Set {
  id: number
  weight: number
  reps: number
}

export interface Exercise {
  id: number
  title: string
  sets: Set[]
}

export interface WorkoutDay {
  id: string
  year: number
  month: number
  day: number
  exercises: Exercise[]
}

export interface WorkoutState {
  currentExercise: Exercise | null
  workoutDay: WorkoutDay | null
  workoutDays: WorkoutDay[]
  showModal: boolean
  statusSync: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
  statusFetchWorkoutData: 'idle' | 'pending' | 'succeeded' | 'failed'
}
