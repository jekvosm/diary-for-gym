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

export const WEEKDAYS = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
]

export enum whichMonth {
  monthBefore = 'month-before',
  monthInTable = 'month-in-table',
  monthAfter = 'month-after',
}

export const changeMonthName = (month: string): string => {
  month = month.toLowerCase()
  const lastChar = month.at(-1)

  if (lastChar === 'т') {
    return month + 'а'
  }

  return month.slice(0, -1) + 'я'
}
