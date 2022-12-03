import { FC } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { Button, Modal, ModalTitle } from 'react-bootstrap'
import { selectError } from '../../store/slices/user/user-selectors'
import { setErrorMessage } from '../../store/slices/user/user-slice'

const AuthErrorModal: FC = () => {
  const error = useAppSelector(selectError)

  const dispatch = useAppDispatch()

  const closeHandler = () => {
    dispatch(setErrorMessage(''))
  }

  return (
    <Modal centered show={!!error} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Auth Error</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ModalTitle>{error}</ModalTitle>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeHandler} variant='success'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthErrorModal
