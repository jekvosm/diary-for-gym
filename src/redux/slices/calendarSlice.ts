import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createArrayOfWeeks,
  MonthAndYear,
  MONTHS,
  WEEKDAYS,
  Weeks,
} from '../../utils/calendar.utils'

import { RootState } from '../store/store'

interface CalendarState {
  dateNow: {
    dayNow: number
    monthNow: {
      monthNowValue: number
      nameMonthNow: string
    }
    yearNow: number
    weekdayNow: {
      weekdayNowValue: number
      nameWeekdayNow: string
    }
  }

  dateTable: {
    dayTable: number
    monthTable: number
    yearTable: number
  }

  weeksTable: Weeks

  weekdays: string[]

  months: string[]
}

const initialState: CalendarState = {
  dateNow: {
    dayNow: null!,
    monthNow: {
      monthNowValue: null!,
      nameMonthNow: '',
    },
    yearNow: null!,
    weekdayNow: {
      weekdayNowValue: null!,
      nameWeekdayNow: '',
    },
  },

  dateTable: {
    dayTable: null!,
    monthTable: null!,
    yearTable: null!,
  },

  weeksTable: [],

  weekdays: WEEKDAYS,

  months: MONTHS,
}

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    setDateNow: state => {
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
      const monthValue = date.getMonth()

      const year = date.getFullYear()

      state.dateNow = {
        dayNow: day,
        monthNow: {
          monthNowValue: monthValue + 1,
          nameMonthNow: nameMonth,
        },
        yearNow: year,
        weekdayNow: {
          weekdayNowValue: weekdayValue,
          nameWeekdayNow: nameWeekday,
        },
      }

      state.dateTable = {
        dayTable: day,
        monthTable: monthValue + 1,
        yearTable: year,
      }
    },

    setWeeksTable: (state, action: PayloadAction<MonthAndYear>) => {
      state.weeksTable = createArrayOfWeeks(action.payload)
    },

    decreaseMonth: state => {
      const { monthTable, yearTable } = state.dateTable
      if (monthTable === 1) {
        state.dateTable = {
          ...state.dateTable,
          monthTable: 12,
          yearTable: yearTable - 1,
        }
      } else {
        state.dateTable = {
          ...state.dateTable,
          monthTable: monthTable - 1,
        }
      }
    },

    increaseMonth: state => {
      const { monthTable, yearTable } = state.dateTable
      if (monthTable === 12) {
        state.dateTable = {
          ...state.dateTable,
          monthTable: 1,
          yearTable: yearTable + 1,
        }
      } else {
        state.dateTable = {
          ...state.dateTable,
          monthTable: monthTable + 1,
        }
      }
    },

    setActiveDay: (state, action: PayloadAction<number>) => {},
  },
})

export const { setDateNow, decreaseMonth, increaseMonth, setWeeksTable } =
  calendarSlice.actions

export default calendarSlice.reducer

export const selectCalendar = (state: RootState) => state.calendar

export const selectDayToday = (state: RootState) => {
  const { dayNow, yearNow } = state.calendar.dateNow
  const { nameWeekdayNow } = state.calendar.dateNow.weekdayNow
  const { nameMonthNow, monthNowValue } = state.calendar.dateNow.monthNow
  return { dayNow, nameMonthNow, yearNow, monthNowValue, nameWeekdayNow }
}

export const selectDateTable = (state: RootState) => state.calendar.dateTable
