import { FC } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import {
  decreaseMonth,
  increaseMonth,
} from '../../redux/slices/calendar-slice/calendar-slice'

import {
  selectCalendar,
  selectDateTable,
} from '../../redux/slices/calendar-slice/calendar-selectors'

import { Col } from 'react-bootstrap'

const ChangeMonth: FC = () => {
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

export default ChangeMonth
