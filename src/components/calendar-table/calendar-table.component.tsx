import { FC, useEffect } from 'react'

import CalendarTableHead from '../calendar-table-head/calendar-table-head.component'
import CalendarTableBody from '../calendar-table-body/calendar-table-body.component'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  selectActiveDate,
  selectDateTable,
} from '../../store/slices/calendar/calendar-selectors'

import { changeWeeksTable } from '../../store/slices/calendar/calendar-slice'

import { Table } from 'react-bootstrap'

const CalendarTable: FC = () => {
  const dispatch = useAppDispatch()

  const {
    monthTable: { monthTableValue },
    yearTable,
  } = useAppSelector(selectDateTable)

  const { activeDay, activeMonthValue, activeYear } =
    useAppSelector(selectActiveDate)

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
      })
    )
  }, [
    dispatch,
    monthTableValue,
    yearTable,
    activeDay,
    activeMonthValue,
    activeYear,
  ])

  return (
    <Table borderless>
      <CalendarTableHead />
      <CalendarTableBody />
    </Table>
  )
}

export default CalendarTable
