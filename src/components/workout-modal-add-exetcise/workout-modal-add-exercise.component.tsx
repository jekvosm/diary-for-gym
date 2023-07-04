import { FC, useState } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import {
  addExercise,
  closeModalAddExercise,
} from '../../store/slices/workout/workout-slice'

import { selectShowModalAddExercise } from '../../store/slices/workout/workout-selectors'

import { Button, Form, Modal } from 'react-bootstrap'

const WorkoutModalAddExercise: FC = () => {
  const [title, setTitle] = useState('')
  const [imageUpload, setImageUpload] = useState<File>()

  const showModal = useAppSelector(selectShowModalAddExercise)

  const dispatch = useAppDispatch()
  const closeHandler = () => dispatch(closeModalAddExercise())

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (title.trim().length === 0) {
      console.log('Please enter valid title.')
      setTitle('')
      return
    }

    dispatch(addExercise(title))
    setTitle('')
    dispatch(closeModalAddExercise())
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitle(value)
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files

    console.log(value)

    if (value) {
      setImageUpload(value[0])
    }
  }

  return (
    <Modal centered show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить упражнение</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id='form-modal-add-exercise'>
          <Form.Group className='mb-3'>
            <Form.Label>Добавить изображение упражнения</Form.Label>
            <Form.Control
              onChange={handleChangeImage}
              type='file'
              autoFocus
              required
            />

            <Form.Label>Наименование упражнения</Form.Label>
            <Form.Control
              onChange={handleChangeTitle}
              type='text'
              placeholder='Введите наименование упражнения'
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
