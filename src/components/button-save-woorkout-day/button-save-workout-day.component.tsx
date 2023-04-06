import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import {
  clearWorkoutDay,
  deleteWorkoutDay,
  saveWorkoutDay,
} from '../../store/slices/workout/workout-slice'

import { ReactComponent as SaveSVG } from '../../assets/save.svg'

import { Button, Col } from 'react-bootstrap'
import {
  selectExercises,
  selectWorkoutDay,
} from '../../store/slices/workout/workout-selectors'
import { selectCurrentUserEmail } from '../../store/slices/user/user-selectors'

const ButtonSaveWorkoutDay: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const exercises = useAppSelector(selectExercises)
  const email = useAppSelector(selectCurrentUserEmail)
  const workoutDay = useAppSelector(selectWorkoutDay)

  const saveHandler = () => {
    if (!exercises && email && workoutDay) {
      dispatch(
        deleteWorkoutDay({ collectionKey: email, documentKey: workoutDay.id })
      )
    }

    dispatch(saveWorkoutDay())
    dispatch(clearWorkoutDay())

    navigate('/')
  }

  return (
    <Col className='flex-grow-0 fs-4'>
      <Button onClick={saveHandler} variant='success'>
        <SaveSVG width={36} height={36} />
      </Button>
    </Col>
  )
}

export default ButtonSaveWorkoutDay
