import { FC, useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { setWorkoutDay } from '../../store/slices/workout/workout-slice'

import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'

import WorkoutDate from '../../components/workout-date/workout-date.component'
import WorkoutExercises from '../../components/workout-exercises/workout-exercises.component'

import { Container, Row } from 'react-bootstrap'

const AddWorkoutDay: FC = () => {
  const dispatch = useAppDispatch()
  const activeDate = useAppSelector(selectActiveDate)

  useEffect(() => {
    dispatch(setWorkoutDay(activeDate))
    //eslint-disable-next-line
  }, [])

  return (
    <Container className='add-workout-day'>
      <Row className='justify-content-center mb-3'>
        <WorkoutDate />
      </Row>

      <Row className='justify-content-center'>
        <WorkoutExercises />
      </Row>
    </Container>
  )
}

export default AddWorkoutDay
