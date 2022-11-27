import { RootState } from '../../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectUser = (state: RootState) => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)
