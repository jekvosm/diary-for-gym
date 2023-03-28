import { FC } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectExercises } from '../../store/slices/workout/workout-selectors'

import WorkoutExercise from '../workout-exercise/workout-exercise.component'
import ButtonSaveWorkoutDay from '../button-save-woorkout-day/button-save-workout-day.component'
import ButtonAddExercise from '../button-add-exercise/button-add-exercise.component'

import { Col, Row } from 'react-bootstrap'

const WorkoutExercises: FC = () => {
  const exercises = useAppSelector(selectExercises)

  return (
    <Col
      className='mb-2 d-flex flex-column gap-5 flex-grow-0'
      style={{ flexBasis: '26rem' }}
    >
      {exercises ? (
        exercises.map(exercise => (
          <WorkoutExercise key={exercise.id} exercise={exercise} />
        ))
      ) : (
        <p className='fs-4 mb-2 border-bottom border-secondary'>
          Нет упражнений
        </p>
      )}
      <Row className='text-nowrap justify-content-end mb-4 gap-2'>
        <ButtonSaveWorkoutDay />
        <ButtonAddExercise />
      </Row>
    </Col>
  )
}

export default WorkoutExercises
