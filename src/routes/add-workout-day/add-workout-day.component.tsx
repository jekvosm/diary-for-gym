import { FC, useEffect } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import WorkoutDate from '../../components/workout-date/workout-date.component'
import WorkoutExercises from '../../components/workout-exercises/workout-exercises.component'
import WorkoutModalAddExercise from '../../components/workout-modal-add-exetcise/workout-modal-add-exercise.component'
import ButtonAddExercise from '../../components/button-add-exercise/button-add-exercise.component'
import ButtonSaveWorkoutDay from '../../components/button-save-woorkout-day/button-save-workout-day.component'

import { selectActiveDate } from '../../store/slices/calendar/calendar-selectors'

import { setWorkoutDay } from '../../store/slices/workout/workout-slice'

import { Container, Row } from 'react-bootstrap'

const AddWorkoutDay: FC = () => {
  const dispatch = useAppDispatch()
  const activeDate = useAppSelector(selectActiveDate)

  useEffect(() => {
    dispatch(setWorkoutDay(activeDate))
    //eslint-disable-next-line
  }, [])

  return (
    <Container className='w-75'>
      <Row>
        <WorkoutDate />
      </Row>

      <Row>
        <WorkoutExercises />
      </Row>

      <Row className='text-nowrap justify-content-between mb-5 gap-2'>
        <ButtonSaveWorkoutDay />
        <ButtonAddExercise />
      </Row>

      <WorkoutModalAddExercise />
    </Container>
  )
}

export default AddWorkoutDay
