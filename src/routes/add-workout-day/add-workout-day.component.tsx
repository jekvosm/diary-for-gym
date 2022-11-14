import { FC } from 'react'

import WorkoutDate from '../../components/workout-date/workout-date.component'
import WorkoutExercises from '../../components/workout-exercises/workout-exercises.component'
import ButtonAddExercise from '../../components/button-add-exercise/button-add-exercise.component'
import WorkoutModalAddExercise from '../../components/workout-modal-add-exetcise/workout-modal-add-exercise.component'
import ButtonSaveWorkoutDay from '../../components/button-save-woorkout-day/button-save-workout-day.component'

import { Container, Row, Col } from 'react-bootstrap'

const AddWorkoutDay: FC = () => {
  return (
    <Container className='w-75'>
      <Row>
        <Col>
          <h1 className='fs-3 text-center mb-4'>Add workout day</h1>
        </Col>
      </Row>

      <Row>
        <WorkoutDate />
      </Row>

      <Row>
        <WorkoutExercises />
      </Row>

      <Row className='text-nowrap justify-content-between mb-5'>
        <ButtonSaveWorkoutDay />
        <ButtonAddExercise />
      </Row>

      <WorkoutModalAddExercise />
    </Container>
  )
}

export default AddWorkoutDay
