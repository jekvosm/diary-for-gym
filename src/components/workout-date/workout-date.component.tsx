import { useMemo } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'

import { changeMonthName } from '../../utils/calendar/calendar.utils'

import { Col } from 'react-bootstrap'

const WorkoutDate = () => {
  const { activeDay, activeMonthName, activeYear } =
    useAppSelector(selectActiveDate)

  const monthName = useMemo(
    () => changeMonthName(activeMonthName),
    [activeMonthName]
  )

  return (
    <Col className='mb-4'>
      <h3 className='text-center'>{`${activeDay} ${monthName.toLowerCase()} ${activeYear} г.`}</h3>
    </Col>
  )
}

export default WorkoutDate
