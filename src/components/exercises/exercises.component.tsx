import { FC } from 'react'

import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'

import Exercise from '../exercise/exercise.component'

import { Col } from 'react-bootstrap'
import { WorkoutDayState } from '../../redux/slices/workout-slice/workout-slice'

const Exercises: FC = () => {
  const { exercises } = useAppSelector(
    state => state.workout.workoutDay
  ) as WorkoutDayState

  return (
    <Col className='text-center border-bottom border-secondary mb-2'>
      {exercises.length ? (
        <ul className='d-inline-block mb-0 list-unstyled'>
          {exercises.map(exercise => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </ul>
      ) : (
        <p className='fs-4 mb-2'>No exercise</p>
      )}
    </Col>
  )
}

export default Exercises
