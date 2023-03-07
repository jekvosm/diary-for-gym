import React from 'react'

import { FC, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  addSet,
  removeCurrentExercise,
  removeFromSets,
  saveCurrentExercise,
} from '../../store/slices/workout/workout-slice'

import { selectCurrentExercise } from '../../store/slices/workout/workout-selectors'

import { selectCurrentUser } from '../../store/slices/user/user-selectors'

import WorkoutSets from '../../components/workout-sets/workout-sets.component'

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const AddSets: FC = () => {
  const dispatch = useAppDispatch()
  const currentExercise = useAppSelector(selectCurrentExercise)
  const currentUser = useAppSelector(selectCurrentUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentExercise) {
      navigate('/')
    }
    //eslint-disable-next-line
  }, [currentExercise])

  const addSetHandler = () => {
    dispatch(addSet())
  }

  const removeSetHandler = () => {
    dispatch(removeFromSets())
  }

  const saveSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(`/${currentUser?.displayName}/add-workout-day`)
    dispatch(saveCurrentExercise(currentExercise))
    dispatch(removeCurrentExercise())
  }

  return (
    <Container className='add-sets'>
      <Row className='justify-content-center'>
        <Col>
          <Card className='mb-3'>
            <Card.Header className='text-center'>
              <h2>{currentExercise?.title}</h2>
            </Card.Header>

            <Card.Body className='text-center'>
              <Form onSubmit={saveSubmitHandler} id='sets'>
                <WorkoutSets />
              </Form>
            </Card.Body>
          </Card>
          <Row className='text-nowrap justify-content-center m-0 gap-2'>
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
