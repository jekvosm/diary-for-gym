import { RootState } from '../../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCalendar = (state: RootState) => state.calendar

export const selectDateTable = createSelector(
  [selectCalendar],
  calendar => calendar.dateTable
)

export const selectActiveDate = createSelector([selectCalendar], calendar => {
  return calendar.activeDate
})

export const selectDateNow = createSelector(
  [selectCalendar],
  calendar => calendar.dateNow
)

export const selectDayToday = createSelector([selectDateNow], dateNow => {
  const { dayNow, yearNow } = dateNow
  const { nameWeekdayNow } = dateNow.weekdayNow
  const { nameMonthNow, monthNowValue } = dateNow.monthNow
  return { dayNow, nameMonthNow, yearNow, monthNowValue, nameWeekdayNow }
})
