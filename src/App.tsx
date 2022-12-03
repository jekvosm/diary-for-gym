import { Route, Routes } from 'react-router-dom'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './store/redux-hooks/redux-hooks'

import { checkUserSession } from './store/slices/user/user-slice'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import PageNotFound from './routes/page-not-found/page-not-found.component'
import Workout from './routes/workout/workout.component'
import RequireAuth from './components/require-auth/require-auth.component'
import { fetchWorkoutDays } from './store/slices/workout/workout-slice'
import { selectCurrentUserEmail } from './store/slices/user/user-selectors'

const App = () => {
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(selectCurrentUserEmail)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  useEffect(() => {
    if (!userEmail) return
    dispatch(fetchWorkoutDays(userEmail))
  }, [userEmail])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path='add-workout-day/*' element={<Workout />} />
        </Route>
        <Route path='auth' element={<Authentication />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
