import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  createArrayOfWeeks,
  MONTHS,
  setInitialState,
  updateActiveDate,
  updateActiveDay,
} from '../../../utils/calendar.utils'

import { ActiveDate, DayForActiveDate, MonthAndYear } from './calendar-types'

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState: setInitialState(),
  reducers: {
    setWeeksTable: (state, action: PayloadAction<MonthAndYear>) => {
      state.weeksTable = createArrayOfWeeks(action.payload)
    },

    setDayToday: (state, action: PayloadAction<MonthAndYear>) => {
      // state.weeksTable = createArrayOfWeeks(action.payload)
      state.dateTable.monthTable.monthTableValue = action.payload.month
      state.dateTable.yearTable = action.payload.year
    },

    decreaseMonth: state => {
      const {
        monthTable: { monthTableValue },
        yearTable,
      } = state.dateTable

      if (monthTableValue === 1) {
        state.dateTable = {
          ...state.dateTable,
          monthTable: {
            monthTableValue: 12,
            nameMonthTable: MONTHS[11],
          },
          yearTable: yearTable - 1,
        }
      } else {
        state.dateTable = {
          ...state.dateTable,
          monthTable: {
            monthTableValue: monthTableValue - 1,
            nameMonthTable: MONTHS[monthTableValue],
          },
        }
      }
    },

    increaseMonth: state => {
      const {
        monthTable: { monthTableValue },
        yearTable,
      } = state.dateTable
      if (monthTableValue === 12) {
        state.dateTable = {
          ...state.dateTable,
          monthTable: {
            monthTableValue: 1,
            nameMonthTable: MONTHS[0],
          },
          yearTable: yearTable + 1,
        }
      } else {
        state.dateTable = {
          ...state.dateTable,
          monthTable: {
            monthTableValue: monthTableValue + 1,
            nameMonthTable: MONTHS[monthTableValue],
          },
        }
      }
    },

    setActiveDate: (state, action: PayloadAction<DayForActiveDate>) => {
      state.activeDate = updateActiveDate(action.payload)
    },

    setDayIsActive: (state, action: PayloadAction<ActiveDate>) => {
      state.weeksTable = updateActiveDay(state.weeksTable, action.payload)
    },
  },
})

export const {
  decreaseMonth,
  increaseMonth,
  setWeeksTable,
  setActiveDate,
  setDayIsActive,
  setDayToday,
} = calendarSlice.actions

export default calendarSlice.reducer
