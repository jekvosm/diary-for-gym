import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'
import { selectDayToday } from '../../redux/slices/calendarSlice'

import { Col } from 'react-bootstrap'

const DayToday = () => {
  const { dayNow, nameMonthNow, yearNow, nameWeekdayNow } =
    useAppSelector(selectDayToday)
  return (
    <Col>
      <h1 className=''>{`${dayNow} ${
        nameMonthNow.slice(0, -1) + 'я'
      } ${yearNow} г.`}</h1>
      <span>{`${nameWeekdayNow.toUpperCase()}`}</span>
    </Col>
  )
}

export default DayToday
