import { MONTHS } from '../../../utils/calendar/calendar.utils'
import { CalendarState } from './calendar-types'

export const setInitialState = (): CalendarState => {
  const date = new Date()
  const formaterWeekday = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
  })
  const formaterMonth = new Intl.DateTimeFormat('ru', {
    month: 'long',
  })

  const nameWeekday = formaterWeekday.format(date)
  const weekdayValue = date.getDay()

  const day = date.getDate()

  const nameMonth = formaterMonth.format(date)
  const monthTableValue = date.getMonth()

  const year = date.getFullYear()

  return {
    dateNow: {
      dayNow: day,
      monthNow: {
        monthNowValue: monthTableValue + 1,
        nameMonthNow: nameMonth,
      },

      yearNow: year,
      weekdayNow: {
        weekdayNowValue: weekdayValue,
        nameWeekdayNow: nameWeekday,
      },
    },

    dateTable: {
      monthTable: {
        monthTableValue: monthTableValue + 1,
        nameMonthTable: nameMonth,
      },
      yearTable: year,
    },

    weeksTable: [],

    months: MONTHS,

    activeDate: {
      id: `${year}-${monthTableValue + 1}-${day}`,
      activeDay: day,
      activeWeekDayName: nameWeekday,
      activeMonthValue: monthTableValue + 1,
      activeMonthName: MONTHS[monthTableValue],
      activeYear: year,
    },
  }
}
