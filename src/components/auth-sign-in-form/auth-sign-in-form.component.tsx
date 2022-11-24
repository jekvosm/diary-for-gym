import { useState, Fragment } from 'react'
import { Button, Col, FloatingLabel, Form, Stack } from 'react-bootstrap'
import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'
import { signInWithGoogle } from '../../store/slices/user/user-slice'

const defaultFormFields = {
  email: '',
  password: '',
}

const AuthSignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useAppDispatch()

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields)
  // }

  const signInWithGoogleHandler = async () => await dispatch(signInWithGoogle())

  // const handleSubmit = async event => {
  //   event.preventDefault()

  //   try {
  //     await signInAuthUserWithEmailAndPassword(email, password)
  //     resetFormFields()
  //   } catch (error) {
  //     console.log('user sign in failed', error)
  //   }
  // }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <Fragment>
      <div className='mb-2'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
      </div>
      <Form>
        <Form.Group className='d-flex flex-column gap-3 mb-3'>
          <FloatingLabel label='Email address'>
            <Form.Control
              onChange={handlerChange}
              type='email'
              placeholder='name@example.ru'
              name='email'
              value={email}
            />
          </FloatingLabel>

          <FloatingLabel label='Password'>
            <Form.Control
              onChange={handlerChange}
              type='password'
              placeholder='name@example.ru'
              name='password'
              value={password}
            />
          </FloatingLabel>
        </Form.Group>
        <Stack direction='horizontal' className='justify-content-between'>
          <Button onClick={signInWithGoogleHandler}>Sign In With Google</Button>

          <Button variant='success'>Sign In</Button>
        </Stack>
      </Form>
    </Fragment>
  )
}
export default AuthSignInForm
