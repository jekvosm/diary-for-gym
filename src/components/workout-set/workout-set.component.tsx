import React from 'react'

import { FC, useState, useEffect } from 'react'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import { changeSets } from '../../store/slices/workout/workout-slice'

import { Set } from '../../store/slices/workout/workout-types'

import { Col, Form, Row } from 'react-bootstrap'

interface SetProps {
  set: Set
}

const WorkoutSet: FC<SetProps> = ({ set }) => {
  const dispatch = useAppDispatch()
  const { weight, reps, id } = set
  const [newWeightAndReps, setNewWeightAndReps] = useState(set)

  useEffect(() => {
    dispatch(changeSets(newWeightAndReps))
  }, [newWeightAndReps, dispatch])

  const onChangeWeightAndReps = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setNewWeightAndReps({ ...newWeightAndReps, [name]: Number(value) })
  }

  return (
    <Form.Group as={Row} className='mb-3 align-items-center text-center'>
      <Col>
        <span>{id}.</span>
      </Col>
      <Col>
        <Form.Control
          onChange={onChangeWeightAndReps}
          type='text'
          value={weight}
          className='w-75 text-center'
          name='weight'
          maxLength={4}
        />
      </Col>
      <Col>
        <span>x</span>
      </Col>
      <Col>
        <Form.Control
          onChange={onChangeWeightAndReps}
          type='text'
          value={reps}
          className='w-75 text-center'
          name='reps'
          maxLength={2}
        />
      </Col>
    </Form.Group>
  )
}

export default WorkoutSet
