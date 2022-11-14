import { FC } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectCalendar } from '../../store/slices/calendar/calendar-selectors'

import CalendarTableCell from '../calendar-table-cell/calendar-table-cell.component'

const CalendarTableBody: FC = () => {
  const { weeksTable } = useAppSelector(selectCalendar)

  return (
    <tbody>
      {weeksTable.map(({ weekdays, id }) => (
        <tr key={id}>
          {weekdays.map(day => (
            <CalendarTableCell key={day.id} day={day} />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default CalendarTableBody
