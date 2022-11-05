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
  const { title, sets } = exercise
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
      <h3>
        {exercise.id}. {title}
      </h3>
      {sets.map(set => (
        <div key={set.id}>
          {set.weight}x{set.reps}
        </div>
      ))}
    </li>
  )
}

export default Exercise
