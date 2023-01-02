import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectWorkout = (state: RootState) => state.workout

export const selectWorkoutDay = createSelector(
  [selectWorkout],
  workout => workout.workoutDay
)

export const selectExercises = createSelector([selectWorkoutDay], workout => {
  if (!workout) return null

  if (!workout.exercises.length) return null

  return workout.exercises
})

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

export const selectIsLoadingWorkoutDays = createSelector(
  [selectWorkout],
  workout => workout.statusFetchWorkoutData === 'pending'
)

export const selectIsLoadingWorkoutDay = createSelector(
  [selectWorkout],
  workout => !workout.workoutDay
)

export const selectAllIdWorkoutDays = createSelector([selectWorkout], workout =>
  workout.workoutDays.map(workoutDay => workoutDay.id)
)

export const selectMessageSyncData = createSelector(
  [selectWorkout],
  workout => workout.messageSyncData
)
