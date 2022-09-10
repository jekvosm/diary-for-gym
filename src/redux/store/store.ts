import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from '../slices/calendarSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
})

export type Appdispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
