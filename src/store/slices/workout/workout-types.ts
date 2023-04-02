export interface Set {
  id: number
  weight: number
  reps: number
}

export interface Exercise {
  id: string
  title: string
  sets: Set[]
}

export interface EditedExercise {
  id: string
  title: string
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
  showModalAddExercise: boolean
  showModalEditExercise: boolean
  statusSyncData: 'idle' | 'pending' | 'succeeded' | 'failed'
  messageSyncData: string
  statusFetchWorkoutData: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}
