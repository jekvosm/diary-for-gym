import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setInitialState } from './calendar-initial-state'

import {
  DayForActiveDate,
  MonthAndYear,
  MonthAndYearToday,
} from './calendar-types'

import {
  createArrayOfWeeks,
  getNextDateTable,
  getPreviousDateTable,
  updateActiveDate,
} from './calendar-reducers-utils'

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState: setInitialState(),
  reducers: {
    changeWeeksTable: (state, action: PayloadAction<MonthAndYear>) => {
      state.weeksTable = createArrayOfWeeks(action.payload)
    },

    setDayToday: (state, action: PayloadAction<MonthAndYearToday>) => {
      state.dateTable.monthTable.monthTableValue = action.payload.month
      state.dateTable.yearTable = action.payload.year
    },

    decreaseMonth: state => {
      state.dateTable = getPreviousDateTable(state.dateTable)
    },

    increaseMonth: state => {
      state.dateTable = getNextDateTable(state.dateTable)
    },

    setActiveDate: (state, action: PayloadAction<DayForActiveDate>) => {
      state.activeDate = updateActiveDate(action.payload)
    },
  },
})

export const {
  decreaseMonth,
  increaseMonth,
  changeWeeksTable,
  setActiveDate,
  setDayToday,
} = calendarSlice.actions

export default calendarSlice.reducer
