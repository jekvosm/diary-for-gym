import { FC, useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { changeWeeksTable } from '../../store/slices/calendar/calendar-slice'

import {
  selectActiveDate,
  selectDateTable,
} from '../../store/slices/calendar/calendar-selectors'
import { selectAllIdWorkoutDays } from '../../store/slices/workout/workout-selectors'

import CalendarTableHead from '../calendar-table-head/calendar-table-head.component'
import CalendarTableBody from '../calendar-table-body/calendar-table-body.component'

import { Table } from 'react-bootstrap'

const CalendarTable: FC = () => {
  const dispatch = useAppDispatch()

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
    <Table borderless>
      <CalendarTableHead />
      <CalendarTableBody />
    </Table>
  )
}

export default CalendarTable
