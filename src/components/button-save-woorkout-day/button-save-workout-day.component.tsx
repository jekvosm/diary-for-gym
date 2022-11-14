import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import {
  clearWorkoutDay,
  saveWorkoutDay,
} from '../../store/slices/workout/workout-slice'

import { selectWorkoutDay } from '../../store/slices/workout/workout-selectors'

import { WorkoutDay } from '../../store/slices/workout/workout-types'

import { Button, Col } from 'react-bootstrap'

const ButtonSaveWorkoutDay: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const workoutDay = useAppSelector(selectWorkoutDay) as WorkoutDay

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
