import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ButtonCreate = () => {
  const navigate = useNavigate()

  const goToCreateTraningDayHandler = () => {
    navigate('/create-traning-day')
  }
  return (
    <Button variant='success' onClick={goToCreateTraningDayHandler}>
      Create Traning Day
    </Button>
  )
}

export default ButtonCreate
