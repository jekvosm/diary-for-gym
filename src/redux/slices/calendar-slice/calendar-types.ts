export interface MonthAndYear {
  month: number
  year: number
}

export interface Day {
  id: number
  dayValue: number
  whichMonthInTable: string
  isActive: boolean
}

export interface ActiveDate {
  id: string
  activeDay: number
  activeMonthValue: number
  activeMonthName: string
  activeYear: number
}

export interface DayForActiveDate {
  dayValue: number
  monthTableValue: number
  nameMonthTable: string
  yearTable: number
}

export interface Week {
  id: number
  weekdays: Day[]
}

export interface CalendarState {
  dateNow: {
    dayNow: number
    monthNow: {
      monthNowValue: number
      nameMonthNow: string
    }
    yearNow: number
    weekdayNow: {
      weekdayNowValue: number
      nameWeekdayNow: string
    }
  }

  dateTable: {
    dayTable: number
    monthTable: {
      monthTableValue: number
      nameMonthTable: string
    }
    yearTable: number
  }

  weeksTable: Week[]

  namesOfweekdays: string[]

  months: string[]

  activeDate: ActiveDate
}
