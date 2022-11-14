import { FC } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  selectCalendar,
  selectDateTable,
} from '../../store/slices/calendar/calendar-selectors'

import {
  decreaseMonth,
  increaseMonth,
} from '../../store/slices/calendar/calendar-slice'

import { Col } from 'react-bootstrap'

const CalendarChangeMonth: FC = () => {
  const dispatch = useAppDispatch()
  const {
    monthTable: { monthTableValue },
    yearTable,
  } = useAppSelector(selectDateTable)
  const { months } = useAppSelector(selectCalendar)

  const decreaseHandler = () => {
    dispatch(decreaseMonth())
  }

  const increaseHandler = () => {
    dispatch(increaseMonth())
  }

  return (
    <>
      <Col className='flex-grow-0' onClick={decreaseHandler}>
        <p>{'<'}</p>
      </Col>
      <Col>
        <p>{`${months[monthTableValue - 1]} 
        ${yearTable}`}</p>
      </Col>
      <Col className='flex-grow-0' onClick={increaseHandler}>
        <p>{'>'}</p>
      </Col>
    </>
  )
}

export default CalendarChangeMonth
