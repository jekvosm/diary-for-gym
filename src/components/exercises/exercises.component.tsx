import { FC } from 'react'

import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'

import Exercise from '../exercise/exercise.component'

import { Col } from 'react-bootstrap'

const Exercises: FC = () => {
  const { exercises } = useAppSelector(state => state.workout)

  return (
    <Col className='text-center border-bottom border-secondary mb-2'>
      {exercises.length ? (
        <ol className='d-inline-block mb-0'>
          {exercises.map(exercise => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </ol>
      ) : (
        <p className='fs-4 mb-2'>No exercise</p>
      )}
    </Col>
  )
}

export default Exercises
