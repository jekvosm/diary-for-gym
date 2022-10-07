import { RootState } from '../../store/store'

export const selectCalendar = (state: RootState) => state.calendar

export const selectDayToday = (state: RootState) => {
  const { dayNow, yearNow } = state.calendar.dateNow
  const { nameWeekdayNow } = state.calendar.dateNow.weekdayNow
  const { nameMonthNow, monthNowValue } = state.calendar.dateNow.monthNow
  return { dayNow, nameMonthNow, yearNow, monthNowValue, nameWeekdayNow }
}

export const selectDateTable = (state: RootState) => state.calendar.dateTable
