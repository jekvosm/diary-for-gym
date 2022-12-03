import AuthSignInForm from '../../components/auth-sign-in-form/auth-sign-in-form.component'
import AuthSignUpForm from '../../components/auth-sign-up-form/auth-sign-up-form.component'

import { Col, Container, Row } from 'react-bootstrap'
import AuthErrorModal from '../../components/auth-error-modal/auth-error-modal.component'
import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectError } from '../../store/slices/user/user-selectors'

const Authentication = () => {
  const error = useAppSelector(selectError)

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
