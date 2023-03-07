import { RootState } from '../../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectUser = (state: RootState) => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)

export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  currentUser => currentUser?.email
)

export const selectIsLoadingUser = createSelector(
  [selectUser],
  user => user.statusLoadingUser === 'pending'
)

export const selectIsLoadingSignOut = createSelector(
  [selectUser],
  user => user.statusSignOutUser === 'pending'
)

export const selectError = createSelector([selectUser], user => user.error)
