import { FC } from 'react'

import CalendarDayToday from '../calendar-day-today/calendar-day-today.component'
import CalendarChangeMonth from '../calendar-change-month/calendar-change-month.component'
import CalendarTable from '../calendar-table/calendar-table.component'
import CalendarActiveDate from '../calendar-active-date/calendar-active-date.component'
import ButtonAddDay from '../button-add-day/button-add-day.component'

import { Container, Row } from 'react-bootstrap'

const Calendar: FC = () => {
  return (
    <Container className='calendar user-select-none'>
      <Row className='fs-4 text-center mb-4'>
        <CalendarDayToday />
      </Row>

      <Row className='fs-4 text-center'>
        <CalendarChangeMonth />
      </Row>

      <Row className='text-center'>
        <CalendarTable />
      </Row>

      <Row className='text-nowrap'>
        <CalendarActiveDate />
        <ButtonAddDay />
      </Row>
    </Container>
  )
}

export default Calendar
