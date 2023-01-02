import { FC, useState } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  addExercise,
  closeModal,
} from '../../store/slices/workout/workout-slice'

import { selectShowModal } from '../../store/slices/workout/workout-selectors'

import { Button, Form, Modal } from 'react-bootstrap'

const WorkoutModalAddExercise: FC = () => {
  const [title, setTitle] = useState('')

  const showModal = useAppSelector(selectShowModal)

  const dispatch = useAppDispatch()
  const closeHandler = () => dispatch(closeModal())

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (title.trim().length === 0) {
      console.log('Please enter valid title.')
      setTitle('')
      return
    }

    dispatch(addExercise(title))
    setTitle('')
    dispatch(closeModal())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitle(value)
  }

  return (
    <Modal centered show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить упражнение</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id='form-modal-add-exercise'>
          <Form.Group className='mb-3'>
            <Form.Label>Наименование упражнения</Form.Label>

            <Form.Control
              onChange={handleChange}
              type='text'
              placeholder='Введите наименование упражнения'
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

        <Button type='submit' variant='primary' form='form-modal-add-exercise'>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkoutModalAddExercise
