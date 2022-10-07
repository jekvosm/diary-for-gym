import { FC } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import { setActiveDay } from '../../redux/slices/calendar-slice/calendar-slice'

import {
  selectDateTable,
  selectDayToday,
} from '../../redux/slices/calendar-slice/calendar-selectors'

interface CellTableProps {
  dayValue: number
  whichMonth: string
  id: number
  isActive: boolean
}

const CellTable: FC<CellTableProps> = ({
  dayValue,
  whichMonth,
  id,
  isActive,
}) => {
  const dispatch = useAppDispatch()
  const { dayNow, monthNowValue, yearNow } = useAppSelector(selectDayToday)
  const { monthTable, yearTable } = useAppSelector(selectDateTable)

  const setActiveDayHandler = () => dispatch(setActiveDay(id))

  return (
    <td
      onClick={setActiveDayHandler}
      className={`${whichMonth} ${
        dayValue === dayNow &&
        monthTable === monthNowValue &&
        yearNow === yearTable &&
        whichMonth === 'month-in-table'
          ? 'active'
          : ''
      } ${isActive ? 'active' : ''}`}
    >
      {dayValue}
    </td>
  )
}

export default CellTable
