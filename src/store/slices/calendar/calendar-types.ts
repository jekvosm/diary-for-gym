export interface MonthAndYear {
  month: number
  year: number
  activeDateForChange: ActiveDateForChange
}

export interface MonthAndYearToday {
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
  whichMonthInTable: string
}

export interface ActiveDateForChange {
  dayActive: number
  monthActive: number
  yearActive: number
}

export interface Week {
  id: number
  weekdays: Day[]
}

export interface DateTable {
  monthTable: {
    monthTableValue: number
    nameMonthTable: string
  }
  yearTable: number
}

export interface DateNow {
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

export interface CalendarState {
  dateNow: DateNow

  dateTable: DateTable

  weeksTable: Week[]

  months: string[]

  activeDate: ActiveDate
}
