import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import {
  selectCurrentUser,
  selectError,
} from '../../store/slices/user/user-selectors'

import AuthSignInForm from '../../components/auth-sign-in-form/auth-sign-in-form.component'
import AuthSignUpForm from '../../components/auth-sign-up-form/auth-sign-up-form.component'
import AuthErrorModal from '../../components/auth-error-modal/auth-error-modal.component'

import { Col, Container, Row } from 'react-bootstrap'

interface stateType {
  from: { pathname: string }
}

const Authentication = () => {
  const error = useAppSelector(selectError)
  const currentUser = useAppSelector(selectCurrentUser)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (currentUser) {
      const state = location.state as stateType

      if (!state) {
        navigate('/', { replace: true })
      } else {
        const { from } = state
        const { pathname } = from
        navigate(pathname, { replace: true })
      }
    }
  }, [currentUser])

  return (
    <Container>
      <Row>
        <Col>
          <AuthSignInForm />
        </Col>
        <Col>
          <AuthSignUpForm />
        </Col>
      </Row>

      {error && <AuthErrorModal />}
    </Container>
  )
}
export default Authentication
