import { FC } from 'react'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import { openModalAddExercise } from '../../store/slices/workout/workout-slice'

import { ReactComponent as AddSVG } from '../../assets/add.svg'

import { Button, Col } from 'react-bootstrap'

const ButtonAddExercise: FC = () => {
  const dispatch = useAppDispatch()

  const openModalHandler = () => {
    dispatch(openModalAddExercise())
  }

  return (
    <Col className='flex-grow-0 fs-4'>
      <Button onClick={openModalHandler} variant='secondary'>
        <AddSVG width={36} height={36} />
      </Button>
    </Col>
  )
}

export default ButtonAddExercise
