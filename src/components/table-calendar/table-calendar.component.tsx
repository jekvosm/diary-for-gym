import { FC, useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'
import {
  selectCalendar,
  selectDateTable,
  setWeeksTable,
} from '../../redux/slices/calendarSlice'

import CellTable from '../cell-table-calendar/cell-table.component'

import { Table } from 'react-bootstrap'

const TableCalendar: FC = () => {
  const dispatch = useAppDispatch()
  const { monthTable, yearTable } = useAppSelector(selectDateTable)
  const { weekdays, weeksTable } = useAppSelector(selectCalendar)

  useEffect(() => {
    dispatch(setWeeksTable({ month: monthTable, year: yearTable }))
  }, [dispatch, monthTable, yearTable])

  return (
    <Table bordered>
      <thead>
        <tr>
          {weekdays.map((weekday, index) => (
            <th key={index}>{weekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeksTable.map((week, id) => (
          <tr key={id}>
            {week.weekdays.map(day => (
              <CellTable key={day.id} {...day} />
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableCalendar
