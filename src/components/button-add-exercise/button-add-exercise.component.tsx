import { FC } from 'react'

import { useAppDispatch } from '../../redux/redux-hooks/redux-hooks'

import { openModal } from '../../redux/slices/workout-slice/workout-slice'

import { Button, Col } from 'react-bootstrap'

const ButtonAddExercise: FC = () => {
  const dispatch = useAppDispatch()

  const openModalHandler = () => {
    dispatch(openModal())
  }

  return (
    <Col className='flex-grow-0 fs-4'>
      <Button onClick={openModalHandler}>Add Exercise</Button>
    </Col>
  )
}

export default ButtonAddExercise
