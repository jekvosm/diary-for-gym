import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'
import {
  clearWorkoutDay,
  saveWorkoutDay,
} from '../../store/slices/workout/workout-slice'

import { ReactComponent as SaveSVG } from '../../assets/save.svg'

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
        <SaveSVG width={36} height={36} />
      </Button>
    </Col>
  )
}

export default ButtonSaveWorkoutDay
