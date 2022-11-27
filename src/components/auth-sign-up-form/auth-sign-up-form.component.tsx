import React, { useState, Fragment } from 'react'
import { Button, FloatingLabel, Form, Stack } from 'react-bootstrap'
import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'
import { signUpWithEmailAndPassword } from '../../store/slices/user/user-slice'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const AuthSignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useAppDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signUpWithEmailAndPasswordHandler = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Password does not match with confirm password!')
      setFormFields({ ...formFields, password: '', confirmPassword: '' })
      return
    }

    dispatch(signUpWithEmailAndPassword({ email, password, displayName }))
    resetFormFields()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <Fragment>
      <div className='mb-2'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
      </div>
      <Form onSubmit={signUpWithEmailAndPasswordHandler}>
        <Form.Group className='d-flex flex-column gap-3 mb-3'>
          <FloatingLabel label='Display name'>
            <Form.Control
              onChange={handleChange}
              type='text'
              placeholder='Mike'
              name='displayName'
              value={displayName}
              required
            />
          </FloatingLabel>
          <FloatingLabel label='Email address'>
            <Form.Control
              onChange={handleChange}
              type='email'
              placeholder='name@example.ru'
              name='email'
              value={email}
              required
            />
          </FloatingLabel>

          <FloatingLabel label='Password'>
            <Form.Control
              onChange={handleChange}
              type='password'
              placeholder='name@example.ru'
              name='password'
              value={password}
              required
            />
          </FloatingLabel>

          <FloatingLabel label='Confirm password'>
            <Form.Control
              onChange={handleChange}
              type='password'
              placeholder='name@example.ru'
              name='confirmPassword'
              value={confirmPassword}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Stack direction='horizontal' className='justify-content-end'>
          <Button type='submit' variant='success'>
            Sign Up
          </Button>
        </Stack>
      </Form>
    </Fragment>
  )
}
export default AuthSignUpForm
