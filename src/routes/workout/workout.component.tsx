import { FC } from 'react'

import { Route, Routes } from 'react-router-dom'

import AddSets from '../add-sets/add-sets.component'
import AddWorkoutDay from '../add-workout-day/add-workout-day.component'

const Workout: FC = () => {
  return (
    <Routes>
      <Route index element={<AddWorkoutDay />} />
      <Route path='add-sets' element={<AddSets />} />
    </Routes>
  )
}

export default Workout
