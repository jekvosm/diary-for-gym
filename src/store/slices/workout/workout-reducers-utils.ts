import { v4 as uuidv4 } from 'uuid'
import { ActiveDate } from '../calendar/calendar-types'
import { Exercise, Set, WorkoutDay } from './workout-types'

export const createExercise = (title: string): Exercise => {
  return {
    id: uuidv4(),
    title: title,
    sets: [] as Set[],
  }
}

export const createSet = (currentExercise: Exercise): Set => {
  return {
    id: currentExercise.sets.length + 1,
    weight: 10,
    reps: 10,
  }
}

export const changeCurrentSets = (currentSets: Set[], newSet: Set) => {
  return currentSets.map(currentSet => {
    if (currentSet.id === newSet.id) {
      return newSet
    }
    return currentSet
  })
}

export const saveExerciseInWorkoutDay = (
  workoutDay: WorkoutDay,
  currentExercise: Exercise
): Exercise[] => {
  return workoutDay.exercises.map(exercise => {
    if (exercise.id === currentExercise.id) {
      return currentExercise
    }
    return exercise
  })
}

export const getWorkoutDay = (
  workoutDays: WorkoutDay[],
  activeDate: ActiveDate
) => {
  const workoutDay = workoutDays.find(
    workoutDay => workoutDay.id === activeDate.id
  )

  if (workoutDay) return workoutDay

  return {
    id: `${activeDate.activeYear}-${activeDate.activeMonthValue}-${activeDate.activeDay}`,
    year: activeDate.activeYear,
    month: activeDate.activeMonthValue,
    day: activeDate.activeDay,
    exercises: [],
  }
}

export const updateWorkoutDays = (
  workoutDays: WorkoutDay[],
  workoutDay: WorkoutDay
) => {
  if (!workoutDay.exercises.length) {
    return workoutDays.filter(day => day.id !== workoutDay.id)
  }

  const isExistWorkoutDay = workoutDays.some(day => day.id === workoutDay.id)

  if (isExistWorkoutDay) {
    workoutDays = workoutDays.map(day =>
      day.id === workoutDay.id ? workoutDay : day
    )
  } else {
    workoutDays.push(workoutDay)
  }
  return workoutDays
}
