import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectWorkout = (state: RootState) => state.workout

export const selectWorkoutDay = createSelector(
  [selectWorkout],
  selectWorkout => selectWorkout.workoutDay
)

export const selectShowModal = createSelector(
  [selectWorkout],
  selectWorkout => selectWorkout.showModal
)

export const selectCurrentExercise = createSelector(
  [selectWorkout],
  selectWorkout => selectWorkout.currentExercise
)
