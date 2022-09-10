import { FC, useEffect } from 'react'

import { useAppDispatch } from '../../redux/redux-hooks/redux-hooks'
import { setDateNow } from '../../redux/slices/calendarSlice'

import DayToday from '../day-today/day-today-component'
import ChangeMonth from '../change-month/change-month.component'
import TableCalendar from '../table-calendar/table-calendar.component'

import { Container, Row, Col } from 'react-bootstrap'
import ButtonCreate from '../button-create/button-create.component'

const Calendar: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setDateNow())
  }, [dispatch])

  return (
    <Container className='calendar user-select-none'>
      <Row className='fs-4 text-center mb-4'>
        <DayToday />
      </Row>
      <Row className='fs-4 text-center'>
        <ChangeMonth />
      </Row>
      <Row className='text-center'>
        <TableCalendar />
      </Row>
      <Row className='justify-content-end text-nowrap'>
        <Col className='flex-grow-0'>
          <ButtonCreate />
        </Col>
      </Row>
    </Container>
  )
}

export default Calendar
