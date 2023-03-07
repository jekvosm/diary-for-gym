import { useState } from 'react'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import { signInWithEmailAndPassword } from '../../store/slices/user/user-slice'

import { Button, FloatingLabel, Form } from 'react-bootstrap'

const defaultFormFields = {
  email: '',
  password: '',
}

const AuthSignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useAppDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithEmailAndPasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    dispatch(signInWithEmailAndPassword({ email, password }))

    resetFormFields()
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <Form
      onSubmit={signInWithEmailAndPasswordHandler}
      className='d-flex flex-column gap-4'
    >
      <Form.Group className='d-flex flex-column gap-3'>
        <FloatingLabel label='Email'>
          <Form.Control
            onChange={handlerChange}
            type='email'
            placeholder='name@example.ru'
            name='email'
            value={email}
            required
          />
        </FloatingLabel>

        <FloatingLabel label='Пароль'>
          <Form.Control
            onChange={handlerChange}
            type='password'
            placeholder='name@example.ru'
            name='password'
            value={password}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Button type='submit' className='accent-button'>
        Войти
      </Button>
    </Form>
  )
}
export default AuthSignInForm
