import { SetState } from '../redux/slices/workout-slice/workout-slice'

export const changeSets = (currentSets: SetState[], newSet: SetState) => {
  return currentSets.map(currentSet => {
    if (currentSet.id === newSet.id) {
      return newSet
    }
    return currentSet
  })
}
