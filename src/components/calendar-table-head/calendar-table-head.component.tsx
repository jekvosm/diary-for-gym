import { FC } from 'react'

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const CalendarTableHead: FC = () => {
  return (
    <thead>
      <tr>
        {WEEKDAYS.map((nameOfweekday, index) => (
          <th key={index}>{nameOfweekday}</th>
        ))}
      </tr>
    </thead>
  )
}

export default CalendarTableHead
