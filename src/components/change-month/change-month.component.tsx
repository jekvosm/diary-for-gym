import { FC } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'
import {
  decreaseMonth,
  increaseMonth,
  selectDateTable,
  selectCalendar,
} from '../../redux/slices/calendarSlice'

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
