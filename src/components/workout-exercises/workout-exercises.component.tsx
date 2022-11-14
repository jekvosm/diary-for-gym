import { FC } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectWorkoutDay } from '../../store/slices/workout/workout-selectors'

import { WorkoutDay } from '../../store/slices/workout/workout-types'

import WorkoutExercise from '../workout-exercise/workout-exercise.component'

import { Col } from 'react-bootstrap'

const WorkoutExercises: FC = () => {
  const { exercises } = useAppSelector(selectWorkoutDay) as WorkoutDay

  return (
    <Col className='text-center border-bottom border-secondary mb-2'>
      {exercises.length ? (
        <ul className='d-inline-block mb-0 list-unstyled'>
          {exercises.map(exercise => (
            <WorkoutExercise key={exercise.id} exercise={exercise} />
          ))}
        </ul>
      ) : (
        <p className='fs-4 mb-2'>No exercise</p>
      )}
    </Col>
  )
}

export default WorkoutExercises
