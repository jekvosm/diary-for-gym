import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button, Col } from 'react-bootstrap'

const ButtonAddDay: FC = () => {
  const navigate = useNavigate()

  const goToAddWorkoutDayHandler = () => {
    navigate('/add-workout-day')
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
