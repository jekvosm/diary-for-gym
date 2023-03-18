import {
  MONTHS,
  WEEKDAYS,
  whichMonth,
} from '../../../utils/calendar/calendar.utils'

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
  allIdWorkoutDays,
}: MonthAndYear): Week[] {
  const daysForTable = createDaysForTable(
    year,
    month,
    activeDateForChange,
    allIdWorkoutDays
  )

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
  activeDateForChange: ActiveDateForChange,
  allIdWorkoutDays: string[]
): Day[] {
  const daysForTable = [] as Day[]
  const { dayActive, monthActive, yearActive } = activeDateForChange

  const dateNow = new Date(year, month - 1)
  const monthNow = new Date(dateNow.getFullYear(), dateNow.getMonth())
  let weekdayStartMonth = monthNow.getDay() - 1
  if (weekdayStartMonth === -1) weekdayStartMonth = 6

  const dayBefore = new Date(year, month - 1, 0).getDate()

  let monthBeforeInTable = month - 1
  let yearBeforeInTable = year

  if (!monthBeforeInTable) {
    yearBeforeInTable = year - 1
    monthBeforeInTable = 12
  }

  for (let i = 0; i < weekdayStartMonth; i++) {
    const id = `${yearBeforeInTable}-${monthBeforeInTable}-${
      dayBefore - weekdayStartMonth + i + 1
    }`

    const dayValue = dayBefore - weekdayStartMonth + i + 1

    const weekday = new Date(id).getDay()

    const dayTable: Day = {
      id,
      nameWeekDay: WEEKDAYS[weekday],
      dayValue,
      whichMonthInTable: whichMonth.monthBefore,
      isActive: false,
      isTrainingDay: allIdWorkoutDays.includes(id),
    }

    daysForTable.push(dayTable)
  }

  const dayEndMonth = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    0
  ).getDate()

  let isActive = monthActive === month && yearActive === year

  let monthAfterInTable = month + 1
  let yearAfterInTable = year

  if (monthAfterInTable === 13) {
    yearAfterInTable = year + 1
    monthAfterInTable = 1
  }

  for (let i = 1; i <= 42 - weekdayStartMonth; i++) {
    const dayValue = i <= dayEndMonth ? i : i - dayEndMonth

    const id =
      i <= dayEndMonth
        ? `${year}-${month}-${dayValue}`
        : `${yearAfterInTable}-${monthAfterInTable}-${dayValue}`

    const weekday = new Date(id).getDay()

    const dayTable: Day = {
      id,
      dayValue,
      nameWeekDay: WEEKDAYS[weekday],
      whichMonthInTable: whichMonth.monthInTable,
      isActive: isActive && i === dayActive,
      isTrainingDay: allIdWorkoutDays.includes(id),
    }

    i <= dayEndMonth
      ? daysForTable.push(dayTable)
      : daysForTable.push({
          ...dayTable,
          whichMonthInTable: whichMonth.monthAfter,
          isActive: false,
        })
  }

  return daysForTable
}

export const updateActiveDate = (date: DayForActiveDate): ActiveDate => {
  let { dayValue, monthTableValue, yearTable, whichMonthInTable, nameWeekDay } =
    date

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
    activeWeekDayName: nameWeekDay,
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
