import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ActiveDate } from '../calendar/calendar-types'
import { Exercise, Set, WorkoutDay, WorkoutState } from './workout-types'

import {
  changeCurrentSets,
  createExercise,
  createSet,
  getWorkoutDay,
  saveExerciseInWorkoutDay,
  updateWorkoutDays,
} from './workout-reducers-utils'

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
        const exercise = createExercise(state.workoutDay, action.payload)
        state.workoutDay.exercises.push(exercise)
      }
    },

    setCurrentExercise: (state, action: PayloadAction<Exercise | null>) => {
      state.currentExercise = action.payload
    },

    removeCurrentExercise: state => {
      state.currentExercise = null
    },

    addSet: state => {
      if (state.currentExercise) {
        const set = createSet(state.currentExercise)
        state.currentExercise.sets.push(set)
      }
    },

    removeFromSets: state => {
      state.currentExercise?.sets.pop()
    },

    changeSets: (state, action: PayloadAction<Set>) => {
      if (state.currentExercise) {
        state.currentExercise.sets = changeCurrentSets(
          state.currentExercise.sets,
          action.payload
        )
      }
    },

    saveCurrentExercise: state => {
      const { currentExercise } = state

      if (state.workoutDay && currentExercise) {
        state.workoutDay.exercises = saveExerciseInWorkoutDay(
          state.workoutDay,
          currentExercise
        )
      }
    },

    setWorkoutDay: (state, action: PayloadAction<ActiveDate>) => {
      state.workoutDay = getWorkoutDay(state.workoutDays, action.payload)
    },

    saveWorkoutDay: (state, action: PayloadAction<WorkoutDay>) => {
      if (state.workoutDay) {
        state.workoutDays = updateWorkoutDays(
          state.workoutDays,
          state.workoutDay
        )
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
  saveCurrentExercise,
  saveWorkoutDay,
  clearWorkoutDay,
  openModal,
  closeModal,
} = workoutSlice.actions

export default workoutSlice.reducer
