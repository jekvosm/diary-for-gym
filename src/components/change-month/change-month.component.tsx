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
  const { monthTable, yearTable } = useAppSelector(selectDateTable)
  const { months } = useAppSelector(selectCalendar)

  return (
    <>
      <Col className='flex-grow-0' onClick={() => dispatch(decreaseMonth())}>
        <p>{'<'}</p>
      </Col>
      <Col>
        <p>{`${months[monthTable - 1]} ${yearTable}`}</p>
      </Col>
      <Col className='flex-grow-0' onClick={() => dispatch(increaseMonth())}>
        <p>{'>'}</p>
      </Col>
    </>
  )
}

export default ChangeMonth
