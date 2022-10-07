import { Col } from 'react-bootstrap'
import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'
import { selectDayToday } from '../../redux/slices/calendar-slice/calendar-selectors'

const WorkoutDate = () => {
  const { dayNow, nameMonthNow, yearNow } = useAppSelector(selectDayToday)

  return (
    <Col className='mb-4'>
      <h3 className='text-center'>{`${dayNow} ${
        nameMonthNow.slice(0, -1) + 'я'
      } ${yearNow} г.`}</h3>
    </Col>
  )
}

export default WorkoutDate
