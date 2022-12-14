import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'

import { Col } from 'react-bootstrap'
import useMemoChangeMonthName from '../../custom-hooks/calendar-hooks/useMemoChangeMonthName'

const WorkoutDate = () => {
  const { activeDay, activeMonthName, activeYear } =
    useAppSelector(selectActiveDate)

  const monthName = useMemoChangeMonthName(activeMonthName)

  return (
    <Col className='mb-4'>
      <h3 className='text-center'>{`${activeDay} ${monthName} ${activeYear} г.`}</h3>
    </Col>
  )
}

export default WorkoutDate
