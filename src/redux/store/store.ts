import { configureStore } from '@reduxjs/toolkit'

import calendarReducer from '../slices/calendar-slice/calendar-slice'
import workoutSlice from '../slices/workout-slice/workout-slice'

const middleware = []

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)

  middleware.push(logger)
}

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workout: workoutSlice,
  },
  middleware,
})

export type Appdispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
