import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button, Col } from 'react-bootstrap'
import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectCurrentUser } from '../../store/slices/user/user-selectors'

const ButtonAddDay: FC = () => {
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)

  const goToAddWorkoutDayHandler = () => {
    navigate(`/${currentUser?.displayName}/add-workout-day`)
  }

  return (
    <Col className='flex-grow-0'>
      <Button variant='success' onClick={goToAddWorkoutDayHandler}>
        Тренировка
      </Button>
    </Col>
  )
}

export default ButtonAddDay
