import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Col } from 'react-bootstrap'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'
import {
  clearWorkoutDay,
  saveWorkoutDay,
  WorkoutDayState,
} from '../../redux/slices/workout-slice/workout-slice'

const ButtonSaveWorkoutDay: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const workoutDay = useAppSelector(
    state => state.workout.workoutDay
  ) as WorkoutDayState

  const saveHandler = () => {
    dispatch(saveWorkoutDay(workoutDay))
    dispatch(clearWorkoutDay())

    navigate('/')
  }

  return (
    <Col className='flex-grow-0 fs-4'>
      <Button onClick={saveHandler} variant='success'>
        Save Workout Day
      </Button>
    </Col>
  )
}

export default ButtonSaveWorkoutDay
