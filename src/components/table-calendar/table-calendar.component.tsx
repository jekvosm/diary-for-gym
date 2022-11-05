import { FC, useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import {
  setDayIsActive,
  setWeeksTable,
} from '../../redux/slices/calendar-slice/calendar-slice'

import CellTable from '../cell-table-calendar/cell-table.component'

import { Table } from 'react-bootstrap'
import {
  selectActiveDate,
  selectCalendar,
  selectDateTable,
} from '../../redux/slices/calendar-slice/calendar-selectors'

const TableCalendar: FC = () => {
  const dispatch = useAppDispatch()

  const {
    monthTable: { monthTableValue },
    yearTable,
  } = useAppSelector(selectDateTable)
  const { namesOfweekdays, weeksTable } = useAppSelector(selectCalendar)
  const activeDate = useAppSelector(selectActiveDate)

  useEffect(() => {
    dispatch(
      setWeeksTable({
        month: monthTableValue,
        year: yearTable,
      })
    )
  }, [dispatch, monthTableValue, yearTable])

  useEffect(() => {
    dispatch(setDayIsActive(activeDate))
  }, [activeDate, dispatch])

  return (
    <Table borderless>
      <thead>
        <tr>
          {namesOfweekdays.map((nameOfweekday, index) => (
            <th key={index}>{nameOfweekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeksTable.map(({ weekdays, id }) => (
          <tr key={id}>
            {weekdays.map(day => (
              <CellTable key={day.id} day={day} />
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableCalendar
