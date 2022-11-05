import {
  ActiveDate,
  CalendarState,
  Day,
  DayForActiveDate,
  MonthAndYear,
  Week,
} from '../redux/slices/calendar-slice/calendar-types'

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

export enum whichMonth {
  monthBefore = 'month-before',
  monthInTable = 'month-in-table',
  monthAfter = 'month-after',
}

export const createArrayOfWeeks = ({ year, month }: MonthAndYear): Week[] => {
  const daysForTable = createDaysForTable(year, month)

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

export function createDaysForTable(year: number, month: number): Day[] {
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

  for (let i = 1; i <= 42 - weekdayStartMonth; i++) {
    const dayTable: Day = {
      id: i + weekdayStartMonth,
      dayValue: i,
      whichMonthInTable: whichMonth.monthInTable,
      isActive: false,
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

export const changeMonthName = (month: string): string => {
  const lastChar = month.at(-1)

  if (lastChar === 'т') {
    return month + 'а'
  }

  return month.slice(0, -1) + 'я'
}

export const setInitialState = (): CalendarState => {
  const date = new Date()
  const formaterWeekday = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
  })
  const formaterMonth = new Intl.DateTimeFormat('ru', {
    month: 'long',
  })

  const nameWeekday = formaterWeekday.format(date)
  const weekdayValue = date.getDay()

  const day = date.getDate()

  const nameMonth = formaterMonth.format(date)
  const monthValue = date.getMonth()

  const year = date.getFullYear()

  return {
    dateNow: {
      dayNow: day,
      monthNow: {
        monthNowValue: monthValue + 1,
        nameMonthNow: nameMonth,
      },

      yearNow: year,
      weekdayNow: {
        weekdayNowValue: weekdayValue,
        nameWeekdayNow: nameWeekday,
      },
    },

    dateTable: {
      dayTable: day,
      monthTable: {
        monthTableValue: monthValue + 1,
        nameMonthTable: nameMonth,
      },
      yearTable: year,
    },

    weeksTable: [],

    namesOfweekdays: WEEKDAYS,

    months: MONTHS,

    activeDate: {
      id: `${year}-${monthValue + 1}-${day}`,
      activeDay: day,
      activeMonthValue: monthValue + 1,
      activeMonthName: MONTHS[monthValue],
      activeYear: year,
    },
  }
}

export const updateActiveDate = (date: DayForActiveDate): ActiveDate => {
  return {
    id: `${date.yearTable}-${date.monthTableValue}-${date.dayValue}`,
    activeDay: date.dayValue,
    activeMonthValue: date.monthTableValue,
    activeMonthName: MONTHS[date.monthTableValue - 1],
    activeYear: date.yearTable,
  }
}

export const updateActiveDay = (
  weeksTable: Week[],
  activeDate: ActiveDate
): Week[] => {
  return weeksTable.map(week => {
    return {
      ...week,
      weekdays: week.weekdays.map(day => {
        if (
          day.dayValue === activeDate.activeDay &&
          day.whichMonthInTable === whichMonth.monthInTable
        ) {
          return {
            ...day,
            isActive: true,
          }
        }
        return {
          ...day,
          isActive: false,
        }
      }),
    }
  })
}
