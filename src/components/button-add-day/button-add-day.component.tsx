import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'
import { setWorkoutDay } from '../../store/slices/workout/workout-slice'

import { Button, Col } from 'react-bootstrap'

const ButtonAddDay: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const activeDate = useAppSelector(selectActiveDate)

  const goToAddWorkoutDayHandler = () => {
    navigate('/add-workout-day')
    dispatch(setWorkoutDay(activeDate))
  }

  return (
    <Col className='flex-grow-0'>
      <Button variant='success' onClick={goToAddWorkoutDayHandler}>
        Add Workout Day
      </Button>
    </Col>
  )
}

export default ButtonAddDay
