import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeCurrentSets, isExistInArray } from '../../../utils/workout.utils'
import { ActiveDate } from '../calendar-slice/calendar-types'

export interface SetState {
  id: number
  weight: number
  reps: number
}

export interface ExerciseState {
  id: number
  title: string
  sets: SetState[]
}

export interface WorkoutDayState {
  id: string
  year: number
  month: number
  day: number
  exercises: ExerciseState[]
}

export interface WorkoutState {
  currentExercise: ExerciseState | null
  showModal: boolean
  workoutDay: WorkoutDayState | null
  workoutDays: WorkoutDayState[]
}

const initialState: WorkoutState = {
  currentExercise: null,
  showModal: false,
  workoutDays: [],
  workoutDay: null,
}

export const workoutSlice = createSlice({
  name: 'workoutSlice',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<string>) => {
      if (state.workoutDay) {
        const exercise = {
          id: state.workoutDay.exercises.length + 1,
          title: action.payload,
          sets: [] as SetState[],
        }

        state.workoutDay.exercises.push(exercise)
      }
    },

    setCurrentExercise: (
      state,
      action: PayloadAction<ExerciseState | null>
    ) => {
      state.currentExercise = action.payload
    },

    removeCurrentExercise: state => {
      state.currentExercise = null
    },

    addSet: state => {
      if (state.currentExercise) {
        const set = {
          id: state.currentExercise.sets.length + 1,
          weight: 0,
          reps: 0,
        }
        state.currentExercise.sets.push(set)
      }
    },

    removeFromSets: state => {
      state.currentExercise?.sets.pop()
    },

    changeSets: (state, action: PayloadAction<SetState>) => {
      if (state.currentExercise) {
        state.currentExercise.sets = changeCurrentSets(
          state.currentExercise.sets,
          action.payload
        )
      }
    },

    saveSets: state => {
      if (state.workoutDay) {
        state.workoutDay.exercises = state.workoutDay.exercises.map(
          exercise => {
            if (exercise.id === state.currentExercise?.id) {
              return state.currentExercise
            }
            return exercise
          }
        )
      }
    },

    setWorkoutDay: (state, action: PayloadAction<ActiveDate>) => {
      const workoutDay = state.workoutDays.find(
        workoutDay => workoutDay.id === action.payload.id
      )

      if (workoutDay) {
        state.workoutDay = workoutDay
      } else {
        state.workoutDay = {
          id: `${action.payload.activeYear}-${action.payload.activeMonthValue}-${action.payload.activeDay}`,
          year: action.payload.activeYear,
          month: action.payload.activeMonthValue,
          day: action.payload.activeDay,
          exercises: [],
        }
      }
    },

    saveWorkoutDay: (state, action: PayloadAction<WorkoutDayState>) => {
      const isExistWorkoutDay = state.workoutDays.some(
        workoutDay => workoutDay.id === action.payload.id
      )

      if (isExistWorkoutDay) {
        state.workoutDays = state.workoutDays.map(workoutDay =>
          workoutDay.id === action.payload.id ? action.payload : workoutDay
        )
      } else {
        state.workoutDays.push(action.payload)
      }
    },

    clearWorkoutDay: state => {
      state.workoutDay = null
    },

    openModal: state => {
      state.showModal = true
    },

    closeModal: state => {
      state.showModal = false
    },
  },
})

export const {
  addExercise,
  setCurrentExercise,
  setWorkoutDay,
  removeCurrentExercise,
  addSet,
  removeFromSets,
  changeSets,
  saveSets,
  saveWorkoutDay,
  clearWorkoutDay,
  openModal,
  closeModal,
} = workoutSlice.actions

export default workoutSlice.reducer
