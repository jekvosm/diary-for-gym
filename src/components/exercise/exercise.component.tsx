import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/redux-hooks/redux-hooks'
import {
  ExerciseState,
  setCurrentExercise,
} from '../../redux/slices/workout-slice/workout-slice'

interface ExerciseProps {
  exercise: ExerciseState
}

const Exercise: FC<ExerciseProps> = ({ exercise }) => {
  const { title } = exercise
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToAddSets = () => {
    dispatch(setCurrentExercise(exercise))
    navigate('add-sets')
  }

  return (
    <li
      onClick={goToAddSets}
      className='mb-2 fs-4'
      style={{ cursor: 'pointer' }}
    >
      {title}
    </li>
  )
}

export default Exercise
