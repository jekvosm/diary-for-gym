import { MONTHS, whichMonth } from '../../../utils/calendar/calendar.utils'

import {
  ActiveDate,
  ActiveDateForChange,
  DateTable,
  Day,
  DayForActiveDate,
  MonthAndYear,
  Week,
} from './calendar-types'

export function createArrayOfWeeks({
  year,
  month,
  activeDateForChange,
}: MonthAndYear): Week[] {
  const daysForTable = createDaysForTable(year, month, activeDateForChange)

  let week: Week = {
    id: null!,
    weekdays: [],
  }

  const arrayOfWeeks = daysForTable.reduce(
    (acc: Week[], day, index): Week[] => {
      if (!(index % 7) && index) {
        week = {
          id: null!,
          weekdays: [],
        }
        week.weekdays.push(day)
        return acc
      } else {
        week.weekdays.push(day)
      }
      week.id = (index + 1) / 7
      acc.push(week)
      return acc
    },
    []
  )

  return Array.from(new Set(arrayOfWeeks))
}

function createDaysForTable(
  year: number,
  month: number,
  activeDateForChange: ActiveDateForChange
): Day[] {
  const daysForTable = [] as Day[]
  const { dayActive, monthActive, yearActive } = activeDateForChange

  const dateNow = new Date(year, month - 1)
  const monthNow = new Date(dateNow.getFullYear(), dateNow.getMonth())
  let weekdayStartMonth = monthNow.getDay() - 1
  if (weekdayStartMonth === -1) weekdayStartMonth = 6

  const dayBefore = new Date(year, month - 1, 0).getDate()

  for (let i = 0; i < weekdayStartMonth; i++) {
    const dayTable: Day = {
      id: i + 1,
      dayValue: dayBefore - weekdayStartMonth + i + 1,
      whichMonthInTable: whichMonth.monthBefore,
      isActive: false,
    }

    daysForTable.push(dayTable)
  }

  const dayEndMonth = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    0
  ).getDate()

  let isActive = monthActive === month && yearActive === year

  for (let i = 1; i <= 42 - weekdayStartMonth; i++) {
    const dayTable: Day = {
      id: i + weekdayStartMonth,
      dayValue: i,
      whichMonthInTable: whichMonth.monthInTable,
      isActive: isActive && i === dayActive,
    }

    i <= dayEndMonth
      ? daysForTable.push(dayTable)
      : daysForTable.push({
          ...dayTable,
          dayValue: i - dayEndMonth,
          whichMonthInTable: whichMonth.monthAfter,
          isActive: false,
        })
  }

  return daysForTable
}

export const updateActiveDate = (date: DayForActiveDate): ActiveDate => {
  let { dayValue, monthTableValue, yearTable, whichMonthInTable } = date

  if (whichMonthInTable === whichMonth.monthBefore) {
    monthTableValue = monthTableValue - 1

    if (monthTableValue === 0) {
      monthTableValue = 12
      yearTable = yearTable - 1
    }
  }

  if (date.whichMonthInTable === whichMonth.monthAfter) {
    monthTableValue = monthTableValue + 1

    if (monthTableValue === 13) {
      monthTableValue = 1
      yearTable = yearTable + 1
    }
  }

  return {
    id: `${yearTable}-${monthTableValue}-${date.dayValue}`,
    activeDay: dayValue,
    activeMonthValue: monthTableValue,
    activeMonthName: MONTHS[monthTableValue - 1],
    activeYear: yearTable,
  }
}

export const getPreviousDateTable = (dateTable: DateTable): DateTable => {
  const {
    monthTable: { monthTableValue },
    yearTable,
  } = dateTable

  if (monthTableValue === 1) {
    return {
      ...dateTable,
      monthTable: {
        monthTableValue: 12,
        nameMonthTable: MONTHS[11],
      },
      yearTable: yearTable - 1,
    }
  } else {
    return {
      ...dateTable,
      monthTable: {
        monthTableValue: monthTableValue - 1,
        nameMonthTable: MONTHS[monthTableValue],
      },
    }
  }
}

export const getNextDateTable = (dateTable: DateTable): DateTable => {
  const {
    monthTable: { monthTableValue },
    yearTable,
  } = dateTable
  if (monthTableValue === 12) {
    return {
      ...dateTable,
      monthTable: {
        monthTableValue: 1,
        nameMonthTable: MONTHS[0],
      },
      yearTable: yearTable + 1,
    }
  } else {
    return {
      ...dateTable,
      monthTable: {
        monthTableValue: monthTableValue + 1,
        nameMonthTable: MONTHS[monthTableValue],
      },
    }
  }
}
