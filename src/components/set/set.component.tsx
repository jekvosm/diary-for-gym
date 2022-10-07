import { FC, useState, useEffect } from 'react'

import { useAppDispatch } from '../../redux/redux-hooks/redux-hooks'

import {
  changeCurrentSets,
  SetState,
} from '../../redux/slices/workout-slice/workout-slice'

import { Col, Row } from 'react-bootstrap'

interface SetProps {
  set: SetState
}

const Set: FC<SetProps> = ({ set }) => {
  const dispatch = useAppDispatch()
  const { weight, reps, id } = set
  const [newWeight, setNewWeight] = useState(weight)
  const [newReps, setNewReps] = useState(reps)

  useEffect(() => {
    dispatch(changeCurrentSets({ ...set, reps: newReps }))
  }, [newReps, dispatch])

  useEffect(() => {
    dispatch(changeCurrentSets({ ...set, weight: newWeight }))
  }, [newWeight, dispatch])

  const onChangeReps = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReps(Number(event.target.value))
  }

  const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(Number(event.target.value))
  }

  return (
    <Row className='mb-3'>
      <Col>
        <span>{id}.</span>
      </Col>
      <Col>
        <input
          onChange={onChangeWeight}
          type='text'
          defaultValue={`${weight}`}
          className='w-75 text-center'
          readOnly={false}
          maxLength={4}
        />
      </Col>
      <Col>
        <span>x</span>
      </Col>
      <Col>
        <input
          onChange={onChangeReps}
          type='text'
          defaultValue={`${reps}`}
          className='w-75 text-center'
          readOnly={false}
          maxLength={2}
        />
      </Col>
    </Row>
  )
}

export default Set
