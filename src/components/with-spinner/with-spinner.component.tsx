import { FC } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectIsLoadingUser } from '../../store/slices/user/user-selectors'
import { selectIsLoadingWorkoutDays } from '../../store/slices/workout/workout-selectors'

const WithSpinner = (Component: FC): React.FC => {
  const SpinnerComponent = ({ ...props }) => {
    const isLoadingCheckUser = useAppSelector(selectIsLoadingUser)
    const isLoadingWorkoutDays = useAppSelector(selectIsLoadingWorkoutDays)

    return isLoadingCheckUser || isLoadingWorkoutDays ? (
      <Container>
        <Row
          style={{ height: '90vh' }}
          className='justify-content-center align-content-center'
        >
          <Col className='flex-grow-0'>
            <Spinner animation='border' />
          </Col>
        </Row>
      </Container>
    ) : (
      <Component {...props} />
    )
  }
  return SpinnerComponent
}

export default WithSpinner
