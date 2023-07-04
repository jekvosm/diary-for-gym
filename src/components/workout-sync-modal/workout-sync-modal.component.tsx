import { FC } from 'react'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { Button, Modal, ModalTitle } from 'react-bootstrap'
// import { selectMessageSyncData } from '../../store/slices/workout/workout-selectors'
// import { setSyncMessage } from '../../store/slices/workout/workout-slice'

const WorkoutSyncModal: FC = () => {
  // const messageSyncData = useAppSelector(selectMessageSyncData)

  const dispatch = useAppDispatch()

  // const closeHandler = () => {
  //   dispatch(setSyncMessage(''))
  // }

  return (
    <Modal centered>
      <Modal.Header closeButton>
        <Modal.Title>Сохранение данных на сервере.</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <ModalTitle>{messageSyncData}</ModalTitle> */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant='success'>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkoutSyncModal
