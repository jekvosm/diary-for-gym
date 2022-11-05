import React from 'react'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import Sets from '../../components/sets/sets.component'

import {
  addSet,
  removeCurrentExercise,
  removeFromSets,
  saveSets,
} from '../../redux/slices/workout-slice/workout-slice'

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const AddSets: FC = () => {
  const dispatch = useAppDispatch()
  const { currentExercise } = useAppSelector(state => state.workout)

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentExercise) {
      navigate('/add-workout-day')
    }
  }, [navigate, currentExercise])

  const addSetHandler = () => {
    dispatch(addSet())
  }

  const removeSetHandler = () => {
    dispatch(removeFromSets())
  }

  const saveSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    navigate('/add-workout-day')
    dispatch(saveSets())
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
                <Sets />
              </Form>
            </Card.Body>
          </Card>
          <Row className='text-nowrap justify-content-between m-0'>
            <Col className='flex-grow-0'>
              <Button onClick={removeSetHandler} variant='danger'>
                Remove set
              </Button>
            </Col>
            <Col className='flex-grow-0'>
              <Button type='submit' variant='success' form='sets'>
                Save sets
              </Button>
            </Col>
            <Col className='flex-grow-0'>
              <Button onClick={addSetHandler}>Add set</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default AddSets
