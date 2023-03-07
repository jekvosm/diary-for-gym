import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectCurrentUser } from '../../store/slices/user/user-selectors'

import { Col, Container, Row } from 'react-bootstrap'

const HomeOverlay = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.displayName}`)
    }
    // eslint-disable-next-line
  }, [currentUser])

  return (
    <Container
      style={{ minHeight: '80vh' }}
      className='d-flex align-items-center'
    >
      <Row className='align-items-center'>
        <Col>
          <h1>DFG – бесплатный дневник тренировок</h1>
          <p>
            Для тех, кто нацелен на результат и хочет повысить эффективность
            своих тренировок.
          </p>
        </Col>
      </Row>
      <div className='bg-img'></div>
    </Container>
  )
}
export default HomeOverlay
