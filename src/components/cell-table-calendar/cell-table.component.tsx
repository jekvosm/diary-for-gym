import { FC, useCallback } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import {
  decreaseMonth,
  increaseMonth,
  setActiveDate,
} from '../../redux/slices/calendar-slice/calendar-slice'

import {
  selectDateTable,
  selectDayToday,
} from '../../redux/slices/calendar-slice/calendar-selectors'

import { Day } from '../../redux/slices/calendar-slice/calendar-types'

import { whichMonth } from '../../utils/calendar.utils'

interface CellTableProps {
  day: Day
}

const CellTable: FC<CellTableProps> = ({ day }) => {
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
        setActiveDate({ dayValue, monthTableValue, yearTable, nameMonthTable })
      )
      return
    }

    if (whichMonthInTable === whichMonth.monthAfter) {
      dispatch(increaseMonth())
      dispatch(
        setActiveDate({ dayValue, monthTableValue, yearTable, nameMonthTable })
      )
      return
    }

    dispatch(
      setActiveDate({ dayValue, monthTableValue, yearTable, nameMonthTable })
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

export default CellTable
