import { FC, Fragment } from 'react'

import { useAppSelector } from '../../redux/redux-hooks/redux-hooks'

import Set from '../set/set.component'

import { Col, Row } from 'react-bootstrap'

const Sets: FC = () => {
  const { currentSets } = useAppSelector(state => state.workout)

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
      </Row>
      <Row>
        <Col>
          {currentSets.length ? (
            currentSets.map(currentSet => (
              <Set key={currentSet.id} set={currentSet} />
            ))
          ) : (
            <span>No sets</span>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}

export default Sets
