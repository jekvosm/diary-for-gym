import { FC, Fragment } from 'react'

import { useAppSelector } from '../../store/redux-hooks/redux-hooks'

import { selectCurrentExercise } from '../../store/slices/workout/workout-selectors'

import WorkoutSet from '../workout-set/workout-set.component'

import { Col, Row } from 'react-bootstrap'

const WorkoutSets: FC = () => {
  const currentExercise = useAppSelector(selectCurrentExercise)

  return (
    <Fragment>
      <Row className='mb-3'>
        <Col>
          <span>Set</span>
        </Col>
        <Col>
          <span>Weight</span>
        </Col>
        <Col>
          <span>x</span>
        </Col>
        <Col>
          <span>Reps</span>
        </Col>
        {/* <Col>
          <span>Edit</span>
        </Col> */}
      </Row>
      <Row>
        <Col>
          {currentExercise?.sets.length ? (
            currentExercise.sets.map(currentSet => (
              <WorkoutSet key={currentSet.id} set={currentSet} />
            ))
          ) : (
            <span>No sets</span>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}

export default WorkoutSets
