import React from 'react'
import { FC, useState, useEffect } from 'react'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import { changeSets } from '../../store/slices/workout/workout-slice'

import { Set } from '../../store/slices/workout/workout-types'

import { ReactComponent as CheckSvg } from '../../assets/check.svg'
import { ReactComponent as EditSvg } from '../../assets/pencil.svg'

import { Col, Form, Row } from 'react-bootstrap'

interface SetProps {
  set: Set
}

const WorkoutSet: FC<SetProps> = ({ set }) => {
  const dispatch = useAppDispatch()
  const { weight, reps, id } = set
  const [newWeight, setNewWeight] = useState(weight)
  const [newReps, setNewReps] = useState(reps)
  const [readOnly, setReadOnly] = useState(true)

  useEffect(() => {
    dispatch(changeSets({ ...set, reps: newReps }))
  }, [newReps, dispatch])

  useEffect(() => {
    dispatch(changeSets({ ...set, weight: newWeight }))
  }, [newWeight, dispatch])

  const onChangeReps = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReps(Number(event.target.value))
  }

  const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(Number(event.target.value))
  }

  const readOnlyHandler = () => {
    setReadOnly(prev => !prev)
  }

  return (
    <Form.Group as={Row} className='mb-3 align-items-center text-center'>
      <Col>
        <span>{id}.</span>
      </Col>
      <Col>
        <Form.Control
          onChange={onChangeWeight}
          type='text'
          defaultValue={`${weight}`}
          className='w-75 text-center'
          plaintext={readOnly}
          readOnly={readOnly}
          maxLength={4}
        />
      </Col>
      <Col>
        <span>x</span>
      </Col>
      <Col>
        <Form.Control
          onChange={onChangeReps}
          type='text'
          defaultValue={`${reps}`}
          className='w-75 text-center'
          plaintext={readOnly}
          readOnly={readOnly}
          maxLength={2}
        />
      </Col>
      <Col onClick={readOnlyHandler}>
        {readOnly ? (
          <EditSvg style={{ width: '30px', height: '30px' }} />
        ) : (
          <CheckSvg style={{ width: '30px', height: '30px' }} />
        )}
      </Col>
    </Form.Group>
  )
}

export default WorkoutSet
