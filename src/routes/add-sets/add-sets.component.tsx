import React from 'react'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import WorkoutSets from '../../components/workout-sets/workout-sets.component'

import {
  addSet,
  removeCurrentExercise,
  removeFromSets,
  saveCurrentExercise,
} from '../../store/slices/workout/workout-slice'

import { selectCurrentExercise } from '../../store/slices/workout/workout-selectors'

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const AddSets: FC = () => {
  const dispatch = useAppDispatch()
  const currentExercise = useAppSelector(selectCurrentExercise)

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentExercise) {
      navigate('/')
    }
  }, [currentExercise])

  const addSetHandler = () => {
    dispatch(addSet())
  }

  const removeSetHandler = () => {
    dispatch(removeFromSets())
  }

  const saveSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    navigate('/add-workout-day')
    dispatch(saveCurrentExercise(currentExercise))
    dispatch(removeCurrentExercise())
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col className='flex-grow-0'>
          <Card style={{ width: '32rem' }} className='mb-3'>
            <Card.Header className='text-center'>
              <h2>{currentExercise?.title}</h2>
            </Card.Header>

            <Card.Body className='text-center'>
              <Form onSubmit={saveSubmitHandler} id='sets'>
                <WorkoutSets />
              </Form>
            </Card.Body>
          </Card>
          <Row className='text-nowrap justify-content-between m-0'>
            <Col className='flex-grow-0'>
              <Button onClick={removeSetHandler} variant='danger'>
                Удалить сет
              </Button>
            </Col>
            <Col className='flex-grow-0'>
              <Button type='submit' variant='success' form='sets'>
                Сохранить упражнение
              </Button>
            </Col>
            <Col className='flex-grow-0'>
              <Button onClick={addSetHandler}>Добавить сет</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default AddSets
