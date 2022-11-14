import { FC, useCallback } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  decreaseMonth,
  increaseMonth,
  setActiveDate,
} from '../../store/slices/calendar/calendar-slice'

import {
  selectDateTable,
  selectDayToday,
} from '../../store/slices/calendar/calendar-selectors'

import { Day } from '../../store/slices/calendar/calendar-types'

import { whichMonth } from '../../utils/calendar.utils'

interface CellTableProps {
  day: Day
}

const CalendarTableCell: FC<CellTableProps> = ({ day }) => {
  const { dayValue, whichMonthInTable, isActive } = day

  const dispatch = useAppDispatch()

  const { dayNow, monthNowValue, yearNow } = useAppSelector(selectDayToday)

  const {
    monthTable: { monthTableValue, nameMonthTable },
    yearTable,
  } = useAppSelector(selectDateTable)

  const setActiveDayHandler = useCallback(() => {
    if (whichMonthInTable === whichMonth.monthBefore) {
      dispatch(decreaseMonth())
      dispatch(
        setActiveDate({
          dayValue,
          monthTableValue,
          yearTable,
          nameMonthTable,
          whichMonthInTable,
        })
      )
      return
    }

    if (whichMonthInTable === whichMonth.monthAfter) {
      dispatch(increaseMonth())
      dispatch(
        setActiveDate({
          dayValue,
          monthTableValue,
          yearTable,
          nameMonthTable,
          whichMonthInTable,
        })
      )
      return
    }

    dispatch(
      setActiveDate({
        dayValue,
        monthTableValue,
        yearTable,
        nameMonthTable,
        whichMonthInTable,
      })
    )
  }, [
    dayValue,
    monthTableValue,
    yearTable,
    dispatch,
    whichMonthInTable,
    nameMonthTable,
  ])

  return (
    <td
      onClick={setActiveDayHandler}
      className={`${whichMonthInTable} ${
        dayValue === dayNow &&
        monthTableValue === monthNowValue &&
        yearNow === yearTable &&
        whichMonthInTable === whichMonth.monthInTable &&
        !isActive
          ? 'today-cell'
          : ''
      } ${isActive ? 'active-cell' : ''}`}
    >
      {dayValue}
    </td>
  )
}

export default CalendarTableCell
