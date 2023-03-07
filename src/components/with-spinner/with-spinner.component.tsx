import { FC } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import {
  selectIsLoadingSignOut,
  selectIsLoadingUser,
} from '../../store/slices/user/user-selectors'

import { selectIsLoadingWorkoutDays } from '../../store/slices/workout/workout-selectors'

import { Col, Container, Row, Spinner } from 'react-bootstrap'

const WithSpinner = (Component: FC): React.FC => {
  const SpinnerComponent = ({ ...props }) => {
    const isLoadingCheckUser = useAppSelector(selectIsLoadingUser)
    const isLoadingWorkoutDays = useAppSelector(selectIsLoadingWorkoutDays)
    const isLoadingSignOut = useAppSelector(selectIsLoadingSignOut)

    return isLoadingCheckUser || isLoadingWorkoutDays || isLoadingSignOut ? (
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
