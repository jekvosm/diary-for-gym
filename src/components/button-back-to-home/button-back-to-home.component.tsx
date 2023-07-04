import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'
import { clearWorkoutDay } from '../../store/slices/workout/workout-slice'

import { ReactComponent as BackHomeSVG } from '../../assets/arrow_back_black.svg'

import { Button, Col } from 'react-bootstrap'

const ButtonBackToHome: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const backHandler = () => {
    dispatch(clearWorkoutDay())

    navigate('/')
  }

  return (
    <Col className='fs-4'>
      <Button
        onClick={backHandler}
        variant='outline-back'
        className='opacity-75'
      >
        <BackHomeSVG width={36} height={36} />
      </Button>
    </Col>
  )
}

export default ButtonBackToHome
