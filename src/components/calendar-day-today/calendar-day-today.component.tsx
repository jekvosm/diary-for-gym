import { useMemo } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import { selectDayToday } from '../../store/slices/calendar/calendar-selectors'

import {
  setActiveDate,
  setDayToday,
} from '../../store/slices/calendar/calendar-slice'

import {
  changeMonthName,
  whichMonth,
} from '../../utils/calendar/calendar.utils'

import { Col } from 'react-bootstrap'

const DayToday = () => {
  const { dayNow, nameMonthNow, monthNowValue, yearNow, nameWeekdayNow } =
    useAppSelector(selectDayToday)

  const dispatch = useAppDispatch()

  const monthName = useMemo(() => changeMonthName(nameMonthNow), [nameMonthNow])

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
      >{`${dayNow} ${monthName} ${yearNow} г.`}</h1>
      <span>{`${nameWeekdayNow.toUpperCase()}`}</span>
    </Col>
  )
}

export default DayToday
