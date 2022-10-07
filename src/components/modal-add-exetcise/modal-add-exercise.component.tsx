import { FC, useState } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/redux-hooks/redux-hooks'

import {
  addExercise,
  closeModal,
} from '../../redux/slices/workout-slice/workout-slice'

import { Button, Form, Modal } from 'react-bootstrap'

const ModalAddExercise: FC = () => {
  const [title, setTitle] = useState('')

  const { showModal } = useAppSelector(state => state.workout)

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
        <Modal.Title>Add Exercise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id='form-modal-add-exercise'>
          <Form.Group className='mb-3'>
            <Form.Label>Exercise Title</Form.Label>

            <Form.Control
              onChange={handleChange}
              type='text'
              placeholder='Entrer exercise title'
              autoFocus
              required
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeHandler} variant='secondary'>
          Close
        </Button>

        <Button type='submit' variant='primary' form='form-modal-add-exercise'>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddExercise
