import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import { selectDayToday } from '../../store/slices/calendar/calendar-selectors'

import {
  setActiveDate,
  setDayToday,
} from '../../store/slices/calendar/calendar-slice'

import useMemoChangeMonthName from '../../custom-hooks/calendar-hooks/useMemoChangeMonthName'

import { whichMonth } from '../../utils/calendar/calendar.utils'

import { Col } from 'react-bootstrap'

const CalendarDayToday = () => {
  const { dayNow, nameMonthNow, monthNowValue, yearNow, nameWeekdayNow } =
    useAppSelector(selectDayToday)

  const dispatch = useAppDispatch()

  const monthNameNow = useMemoChangeMonthName(nameMonthNow)

  const setDayTodayHandler = () => {
    dispatch(
      setActiveDate({
        dayValue: dayNow,
        monthTableValue: monthNowValue,
        yearTable: yearNow,
        nameMonthTable: nameMonthNow,
        whichMonthInTable: whichMonth.monthInTable,
      })
    )

    dispatch(setDayToday({ month: monthNowValue, year: yearNow }))
  }

  return (
    <Col>
      <h1
        onClick={setDayTodayHandler}
        className=''
      >{`${dayNow} ${monthNameNow} ${yearNow} г.`}</h1>
      <span>{`${nameWeekdayNow.toUpperCase()}`}</span>
    </Col>
  )
}

export default CalendarDayToday
