import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import Sets from '../../components/sets/sets.component'

import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {
  addCurrentSets,
  removeFromCurrentSets,
} from '../../redux/slices/workout-slice/workout-slice'

const AddSets: FC = () => {
  const dispatch = useAppDispatch()
  const { currentExercise } = useAppSelector(state => state.workout)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentExercise) {
      navigate('/add-workout-day')
      return
    }
  }, [navigate, currentExercise])

  const addSetHandler = () => {
    dispatch(addCurrentSets())
  }

  const removeSetHandler = () => {
    dispatch(removeFromCurrentSets())
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col className='flex-grow-0'>
          <Card style={{ width: '24rem' }} className='mb-3'>
            <Card.Header className='text-center'>
              <h2>{currentExercise?.title}</h2>
            </Card.Header>

            <Card.Body className='text-center'>
              <Sets />
            </Card.Body>
          </Card>
          <Row className='text-nowrap justify-content-between m-0'>
            <Col className='flex-grow-0'>
              <Button onClick={removeSetHandler} variant='danger'>
                Remove set
              </Button>
            </Col>
            <Col className='flex-grow-0'>
              <Button variant='success'>Save sets</Button>
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
