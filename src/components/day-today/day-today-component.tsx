import { useMemo } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'
import { selectDayToday } from '../../redux/slices/calendar-slice/calendar-selectors'

import { setDayToday } from '../../redux/slices/calendar-slice/calendar-slice'

import { changeMonthName } from '../../utils/calendar.utils'

import { Col } from 'react-bootstrap'

const DayToday = () => {
  const { dayNow, nameMonthNow, monthNowValue, yearNow, nameWeekdayNow } =
    useAppSelector(selectDayToday)
  const dispatch = useAppDispatch()

  const monthName = useMemo(() => changeMonthName(nameMonthNow), [nameMonthNow])

  const setDayTodayHandler = () => {
    dispatch(
      setDayToday({
        month: monthNowValue,
        year: yearNow,
      })
    )
  }

  return (
    <Col>
      <h1
        onClick={setDayTodayHandler}
        className=''
      >{`${dayNow} ${monthName} ${yearNow} г.`}</h1>
      <span>{`${nameWeekdayNow.toUpperCase()}`}</span>
    </Col>
  )
}

export default DayToday
