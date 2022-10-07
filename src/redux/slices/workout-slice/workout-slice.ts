import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeSets } from '../../../utils/workout.utils'

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

interface WorkoutState {
  exercises: ExerciseState[]
  currentSets: SetState[]
  currentExercise: ExerciseState | null
  showModal: boolean
}

const initialState: WorkoutState = {
  exercises: [{ id: Date.now(), title: 'gym', sets: [] }],
  currentExercise: { id: Date.now(), title: 'gym', sets: [] },
  currentSets: [],
  showModal: false,
}

export const workoutSlice = createSlice({
  name: 'workoutSlice',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<string>) => {
      const exercise = {
        id: state.exercises.length + 1,
        title: action.payload,
        sets: [],
      }

      state.exercises.push(exercise)
    },

    addCurrentSets: state => {
      const set = {
        id: state.currentSets.length + 1,
        weight: 0,
        reps: 0,
      }

      state.currentSets.push(set)
    },

    removeFromCurrentSets: state => {
      state.currentSets.pop()
    },

    changeCurrentSets: (state, action: PayloadAction<SetState>) => {
      state.currentSets = changeSets(state.currentSets, action.payload)
    },

    saveCurrentSets: state => {
      state.currentExercise?.sets.push(...state.currentSets)
    },

    setCurrentExercise: (
      state,
      action: PayloadAction<ExerciseState | null>
    ) => {
      state.currentExercise = action.payload
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
  addCurrentSets,
  removeFromCurrentSets,
  changeCurrentSets,
  saveCurrentSets,
  openModal,
  closeModal,
} = workoutSlice.actions

export default workoutSlice.reducer
