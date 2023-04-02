import { FC, useState } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  closeModalEditExercise,
  removeCurrentExercise,
  saveEditedExercise,
} from '../../store/slices/workout/workout-slice'

import {
  selectCurrentExercise,
  selectShowModalEditExercise,
} from '../../store/slices/workout/workout-selectors'

import { Button, Form, Modal } from 'react-bootstrap'
import { Exercise } from '../../store/slices/workout/workout-types'

const WorkoutModalEditExercise: FC = () => {
  const [title, setTitle] = useState('')

  const showModal = useAppSelector(selectShowModalEditExercise)
  const currentExercise = useAppSelector(selectCurrentExercise) as Exercise

  const dispatch = useAppDispatch()
  const closeHandler = () => dispatch(closeModalEditExercise())

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (title.trim().length === 0) {
      console.log('Please enter valid title.')
      setTitle('')
      return
    }

    dispatch(saveEditedExercise({ id: currentExercise?.id, title }))
    setTitle('')
    removeCurrentExercise()
    dispatch(closeModalEditExercise())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setTitle(value)
  }

  return (
    <Modal centered show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать упражнение</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id='form-modal-edit-exercise'>
          <Form.Group className='mb-3'>
            <Form.Label>Редактировать наименование</Form.Label>

            <Form.Control
              onChange={handleChange}
              type='text'
              placeholder='Введите наименование упражнения'
              defaultValue={currentExercise?.title}
              autoFocus
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeHandler} variant='secondary'>
          Закрыть
        </Button>

        <Button type='submit' variant='primary' form='form-modal-edit-exercise'>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkoutModalEditExercise
