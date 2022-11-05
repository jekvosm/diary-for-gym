import { useMemo } from 'react'

import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'
import { selectActiveDate } from '../../redux/slices/calendar-slice/calendar-selectors'

import { changeMonthName } from '../../utils/calendar.utils'

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
