import { FC } from 'react'

import WorkoutDate from '../../components/workout-date/workout-date.component'
import Exercises from '../../components/exercises/exercises.component'
import ButtonAddExercise from '../../components/button-add-exercise/button-add-exercise.component'
import ModalAddExercise from '../../components/modal-add-exetcise/modal-add-exercise.component'

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
        <Exercises />
      </Row>

      <Row className='text-nowrap justify-content-end'>
        <ButtonAddExercise />
      </Row>

      <ModalAddExercise />
    </Container>
  )
}

export default AddWorkoutDay
