import { useMemo } from 'react'

import { changeMonthName } from '../../utils/calendar/calendar.utils'

const useMemoChangeMonthName = (nameMonth: string) => {
  const monthName = useMemo(() => changeMonthName(nameMonth), [nameMonth])

  return monthName
}
export default useMemoChangeMonthName
