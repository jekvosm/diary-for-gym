import { RootState } from '../../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCalendar = (state: RootState) => state.calendar

export const selectDayToday = createSelector([selectCalendar], calendar => {
  const { dayNow, yearNow } = calendar.dateNow
  const { nameWeekdayNow } = calendar.dateNow.weekdayNow
  const { nameMonthNow, monthNowValue } = calendar.dateNow.monthNow
  return { dayNow, nameMonthNow, yearNow, monthNowValue, nameWeekdayNow }
})

export const selectDateTable = createSelector(
  [selectCalendar],
  calendar => calendar.dateTable
)

export const selectActiveDate = createSelector([selectCalendar], calendar => {
  return calendar.activeDate
})
