import { FC } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectExercises } from '../../store/slices/workout/workout-selectors'

import WorkoutExercise from '../workout-exercise/workout-exercise.component'
import ButtonSaveWorkoutDay from '../button-save-woorkout-day/button-save-workout-day.component'
import ButtonAddExercise from '../button-add-exercise/button-add-exercise.component'
import WorkoutModalAddExercise from '../workout-modal-add-exetcise/workout-modal-add-exercise.component'
import WorkoutModalEditExercise from '../workout-modal-edit-exetcise/workout-modal-edit-exercise.component'
import ButtonBackToHome from '../button-back-to-home/button-back-to-home.component'

import { Alert, Col, Row } from 'react-bootstrap'

const WorkoutExercises: FC = () => {
  const exercises = useAppSelector(selectExercises)

  return (
    <Col
      className='mb-2 d-flex flex-column gap-5 flex-grow-0'
      style={{ flexBasis: '26rem' }}
    >
      {exercises ? (
        exercises.map((exercise, index) => (
          <WorkoutExercise
            key={exercise.id}
            exercise={exercise}
            exerciseNumber={index}
          />
        ))
      ) : (
        <Alert variant='gray' className='text-center fs-5'>
          Нет упражнений
        </Alert>
      )}
      <Row className='text-nowrap justify-content-end mb-4 gap-2'>
        <ButtonBackToHome />
        <ButtonSaveWorkoutDay />
        <ButtonAddExercise />
      </Row>

      <WorkoutModalEditExercise />
      <WorkoutModalAddExercise />
    </Col>
  )
}

export default WorkoutExercises
