import { Route, Routes } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'
import PageNotFound from './routes/page-not-found/page-not-found.component'
import Workout from './routes/workout/workout.component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='add-workout-day/*' element={<Workout />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
