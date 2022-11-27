import AuthSignInForm from '../../components/auth-sign-in-form/auth-sign-in-form.component'
import AuthSignUpForm from '../../components/auth-sign-up-form/auth-sign-up-form.component'

import { Col, Container, Row } from 'react-bootstrap'

const Authentication = () => {
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
    </Container>
  )
}
export default Authentication
