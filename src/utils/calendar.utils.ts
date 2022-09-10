export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export interface MonthAndYear {
  month: number
  year: number
}

export interface Day {
  id: number
  dayValue: number
  whichMonth: string
}

export interface Week {
  id: number
  weekdays: Day[]
}

export type Weeks = Week[]

export const createArrayOfWeeks = ({ year, month }: MonthAndYear) => {
  const daysForTable = createDaysForTable(year, month)

  let week: Week = {
    id: null!,
    weekdays: [],
  }

  const arrayOfWeeks = daysForTable.reduce((acc: Weeks, day, index): Weeks => {
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
  }, [])

  return Array.from(new Set(arrayOfWeeks))
}

export function createDaysForTable(year: number, month: number) {
  const daysForTable: Day[] = []

  const dateNow = new Date(year, month - 1)
  const monthNow = new Date(dateNow.getFullYear(), dateNow.getMonth())
  let weekdayStartMonth = monthNow.getDay() - 1
  if (weekdayStartMonth === -1) weekdayStartMonth = 6

  const dayBefore = new Date(year, month - 1, 0).getDate()

  for (let i = 0; i < weekdayStartMonth; i++) {
    const dayTable: Day = {
      id: i + 1,
      dayValue: dayBefore - weekdayStartMonth + i + 1,
      whichMonth: 'month-before',
    }

    daysForTable.push(dayTable)
  }

  const dayEndMonth = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    0
  ).getDate()

  for (let i = 1; i <= 42 - weekdayStartMonth; i++) {
    const dayTable: Day = {
      id: i + weekdayStartMonth,
      dayValue: i,
      whichMonth: 'month-in-table',
    }

    i <= dayEndMonth
      ? daysForTable.push(dayTable)
      : daysForTable.push({
          ...dayTable,
          dayValue: i - dayEndMonth,
          whichMonth: 'month-after',
        })
  }

  return daysForTable
}
