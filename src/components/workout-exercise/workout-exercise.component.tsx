import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import {
  openModalEditExercise,
  removeExercise,
  setCurrentExercise,
} from '../../store/slices/workout/workout-slice'

import { Exercise } from '../../store/slices/workout/workout-types'

import { ReactComponent as CloseSVG } from '../../assets/delete.svg'
import { ReactComponent as EditSVG } from '../../assets/edit.svg'

import { Button, Card, Col, Image, Row, Stack } from 'react-bootstrap'

import img from '../../assets/istockphoto-475407195-1024x1024.jpg'

interface ExerciseProps {
  exercise: Exercise
  exerciseNumber: number
}

const WorkoutExercise: FC<ExerciseProps> = ({ exercise, exerciseNumber }) => {
  const { title, sets } = exercise
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToAddSets = () => {
    dispatch(setCurrentExercise(exercise))
    navigate('add-sets')
  }

  return (
    <Card className='card-exercise position-relative'>
      <Row className='m-0 justify-content-center'>
        <Col className='flex-grow-0 align-self-center p-0'>
          <div className='p-3'>
            <Image src={img} width='100' height='100' rounded alt='img' />
          </div>
        </Col>
        <Col className='p-0'>
          <Card.Body>
            <Card.Title
              onClick={goToAddSets}
              className='card-exercise-title d-inline-block'
            >
              {exerciseNumber + 1}. {title}
            </Card.Title>
            <Card.Text>
              {sets.length ? (
                sets.map(set => (
                  <span key={set.id} className='d-block text-nowrap'>
                    Подход {set.id}&#42889; {set.weight}&times;{set.reps}
                  </span>
                ))
              ) : (
                <span className='d-block text-center opacity-25'>
                  Нажмите на упражнение и добавьте подходы
                </span>
              )}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Stack
        direction='horizontal'
        gap={3}
        className='position-absolute opacity-75'
        style={{
          top: -20,
          right: 10,
        }}
      >
        <Button
          variant='info'
          className='p-1'
          onClick={() => dispatch(openModalEditExercise(exercise))}
        >
          <EditSVG width={26} height={26} />
        </Button>
        <Button variant='danger' className='p-1'>
          <CloseSVG
            width={26}
            height={26}
            onClick={() => dispatch(removeExercise(exercise.id))}
          />
        </Button>
      </Stack>
    </Card>
  )
}

export default WorkoutExercise
