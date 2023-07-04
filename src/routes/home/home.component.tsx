import { Container, Row, Col } from 'react-bootstrap'
import Calendar from '../../components/calendar/calendar.component'

const Home = () => {
  return (
    <Container>
      <Row className='mb-3'>
        <Col>
          <Calendar />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
