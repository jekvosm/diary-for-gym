import { Route, Routes } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'
import CreateTraningDay from './routes/create-traning-day/create-traning-day.component'
import PageNotFound from './routes/page-not-found/page-not-found.component'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='create-traning-day' element={<CreateTraningDay />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
