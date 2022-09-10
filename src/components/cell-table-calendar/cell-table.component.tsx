import { FC } from 'react'
import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'
import {
  selectDateTable,
  selectDayToday,
} from '../../redux/slices/calendarSlice'

interface CellTableProps {
  dayValue: number
  whichMonth: string
  id: number
}

const CellTable: FC<CellTableProps> = ({ dayValue, whichMonth, id }) => {
  const { dayNow, monthNowValue, yearNow } = useAppSelector(selectDayToday)
  const { monthTable, yearTable } = useAppSelector(selectDateTable)

  return (
    <td
      // onClick={setActiveDayHandler}
      className={`${whichMonth} ${
        dayValue === dayNow &&
        monthTable === monthNowValue &&
        yearNow === yearTable &&
        whichMonth === 'month-in-table'
          ? 'active'
          : ''
      }`}
    >
      {dayValue}
    </td>
  )
}

export default CellTable
