import { FC } from 'react'

import DayToday from '../day-today/day-today-component'
import ChangeMonth from '../change-month/change-month.component'
import TableCalendar from '../table-calendar/table-calendar.component'
import ButtonAddDay from '../button-add-day/button-add-day.component'

import { Container, Row } from 'react-bootstrap'

const Calendar: FC = () => {
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
        <ButtonAddDay />
      </Row>
    </Container>
  )
}

export default Calendar
