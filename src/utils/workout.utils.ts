import { ActiveDate } from '../redux/slices/calendar-slice/calendar-types'
import {
  SetState,
  WorkoutDayState,
} from '../redux/slices/workout-slice/workout-slice'

export const changeCurrentSets = (
  currentSets: SetState[],
  newSet: SetState
) => {
  return currentSets.map(currentSet => {
    if (currentSet.id === newSet.id) {
      return newSet
    }
    return currentSet
  })
}

export const isExistInArray = (
  workoutDays: WorkoutDayState[],
  activeDate: ActiveDate
): boolean => {
  return workoutDays.some(workoutDay => workoutDay.id === activeDate.id)
}
