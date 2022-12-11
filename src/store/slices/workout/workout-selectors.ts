import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectWorkout = (state: RootState) => state.workout

export const selectWorkoutDay = createSelector(
  [selectWorkout],
  workout => workout.workoutDay
)

export const selectShowModal = createSelector(
  [selectWorkout],
  workout => workout.showModal
)

export const selectCurrentExercise = createSelector(
  [selectWorkout],
  workout => workout.currentExercise
)

export const selectWorkoutDays = createSelector(
  [selectWorkout],
  workout => workout.workoutDays
)

export const selectAllIdWorkoutDays = createSelector([selectWorkout], workout =>
  workout.workoutDays.map(workoutDay => workoutDay.id)
)
