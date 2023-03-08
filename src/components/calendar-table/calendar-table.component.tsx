import { FC, useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  changeWeeksTable,
  decreaseMonth,
  increaseMonth,
} from '../../store/slices/calendar/calendar-slice'

import {
  selectActiveDate,
  selectDateTable,
} from '../../store/slices/calendar/calendar-selectors'
import { selectAllIdWorkoutDays } from '../../store/slices/workout/workout-selectors'

import CalendarTableHead from '../calendar-table-head/calendar-table-head.component'
import CalendarTableBody from '../calendar-table-body/calendar-table-body.component'

import useSwipe from '../../custom-hooks/swip-hook/use-swipe'

import { Table } from 'react-bootstrap'

const CalendarTable: FC = () => {
  const dispatch = useAppDispatch()

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => dispatch(decreaseMonth()),
    onSwipedRight: () => dispatch(increaseMonth()),
  })

  const {
    monthTable: { monthTableValue },
    yearTable,
  } = useAppSelector(selectDateTable)

  const { activeDay, activeMonthValue, activeYear } =
    useAppSelector(selectActiveDate)

  const allIdWorkoutDays = useAppSelector(selectAllIdWorkoutDays)

  useEffect(() => {
    dispatch(
      changeWeeksTable({
        month: monthTableValue,
        year: yearTable,
        activeDateForChange: {
          dayActive: activeDay,
          monthActive: activeMonthValue,
          yearActive: activeYear,
        },
        allIdWorkoutDays,
      })
    )
  }, [
    dispatch,
    monthTableValue,
    yearTable,
    activeDay,
    activeMonthValue,
    activeYear,
    allIdWorkoutDays,
  ])

  return (
    <Table borderless {...swipeHandlers}>
      <CalendarTableHead />
      <CalendarTableBody />
    </Table>
  )
}

export default CalendarTable
