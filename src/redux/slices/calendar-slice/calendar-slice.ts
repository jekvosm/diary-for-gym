import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createArrayOfWeeks,
  setInitialState,
} from '../../../utils/calendar.utils'

export interface MonthAndYear {
  month: number
  year: number
}

export interface Day {
  id: number
  dayValue: number
  whichMonth: string
  isActive: boolean
}

export interface Week {
  id: number
  weekdays: Day[]
}

export interface CalendarState {
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

  weeksTable: Week[]

  namesOfweekdays: string[]

  months: string[]
}

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState: setInitialState(),
  reducers: {
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

    setActiveDay: (state, action: PayloadAction<number>) => {
      state.weeksTable = state.weeksTable.map(week => {
        return {
          ...week,
          weekdays: week.weekdays.map(day => {
            if (day.id === action.payload) {
              return {
                ...day,
                isActive: true,
              }
            }
            return {
              ...day,
              isActive: false,
            }
          }),
        }
      })
    },
  },
})

export const { decreaseMonth, increaseMonth, setWeeksTable, setActiveDay } =
  calendarSlice.actions

export default calendarSlice.reducer
