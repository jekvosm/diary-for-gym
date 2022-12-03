import { Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from '../../components/calendar/calendar.component'
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import { selectCurrentUserEmail } from '../../store/slices/user/user-selectors'
import { selectWorkoutDays } from '../../store/slices/workout/workout-selectors'
import { syncWorkout } from '../../store/slices/workout/workout-slice'

const Home = () => {
  const dispatch = useAppDispatch()
  const workoutDays = useAppSelector(selectWorkoutDays)
  const userEmail = useAppSelector(selectCurrentUserEmail)

  const syncHandler = () => {
    dispatch(syncWorkout({ collectionKey: userEmail, workoutDays }))
  }
  return (
    <Container>
      <Row className='mb-3'>
        <Col>
          <Calendar />
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          {userEmail && (
            <Button size='lg' onClick={syncHandler}>
              Data synchronization after making changes
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home
