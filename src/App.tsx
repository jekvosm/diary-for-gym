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
import HomeOverlay from './routes/home-overlay/home-overlay.component'
import SignIn from './routes/sign-in/sign-in.component'
import SignUp from './routes/sign-up/sign-up.component'
import SignInMenu from './routes/sign-in-menu/sign-in-menu.component'

const App = () => {
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(selectCurrentUserEmail)

  useEffect(() => {
    dispatch(checkUserSession())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    // if (!userEmail) return
    dispatch(fetchWorkoutDays(userEmail))
    //eslint-disable-next-line
  }, [userEmail])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<HomeOverlay />} />

        <Route element={<RequireAuth />}>
          <Route path='/:userId' element={<Home />} />
          <Route path='/:userId/add-workout-day/*' element={<Workout />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Route>

      <Route path='/auth' element={<Authentication />}>
        <Route index element={<SignInMenu />} />
        <Route path='/auth/sign-in' element={<SignIn />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
