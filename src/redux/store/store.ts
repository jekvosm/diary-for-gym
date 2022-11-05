import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import calendarReducer from '../slices/calendar-slice/calendar-slice'
import workoutReducer from '../slices/workout-slice/workout-slice'

const reducers = combineReducers({
  calendar: calendarReducer,
  workout: workoutReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['calendar'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [process.env.NODE_ENV === `development` && logger].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
})

export const persistor = persistStore(store)

export type Appdispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
