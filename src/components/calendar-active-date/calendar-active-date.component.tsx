import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'

import useMemoChangeMonthName from '../../custom-hooks/calendar-hooks/useMemoChangeMonthName'

import { Col } from 'react-bootstrap'

const CalendarActiveDate = () => {
  const { activeDay, activeMonthName, activeYear } =
    useAppSelector(selectActiveDate)

  const monthName = useMemoChangeMonthName(activeMonthName)

  return (
    <Col className='text-center border border-1 border-dark'>
      <span className='fs-4'>{`${activeDay} ${monthName} ${activeYear}`}</span>
    </Col>
  )
}
export default CalendarActiveDate
