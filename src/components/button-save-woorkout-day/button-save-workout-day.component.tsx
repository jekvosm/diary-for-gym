import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'
import {
  clearWorkoutDay,
  saveWorkoutDay,
} from '../../store/slices/workout/workout-slice'

import { Button, Col } from 'react-bootstrap'

const ButtonSaveWorkoutDay: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const saveHandler = () => {
    dispatch(saveWorkoutDay())
    dispatch(clearWorkoutDay())

    navigate('/')
  }

  return (
    <Col className='flex-grow-0 fs-4'>
      <Button onClick={saveHandler} variant='success'>
        Сохранить тренировку
      </Button>
    </Col>
  )
}

export default ButtonSaveWorkoutDay
