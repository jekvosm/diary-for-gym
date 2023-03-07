import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/redux-hooks/redux-hooks'

import { signInWithGoogle } from '../../store/slices/user/user-slice'

import { Button } from 'react-bootstrap'

const SignInMenu = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const signInWithGoogleHandler = async () => await dispatch(signInWithGoogle())

  return (
    <>
      <header className='text-center'>
        <h2>Войти</h2>
        <span>с помощью:</span>
      </header>
      <Button onClick={signInWithGoogleHandler}>Google</Button>
      <Button variant='secondary' onClick={() => navigate('/auth/sign-in')}>
        Email
      </Button>
    </>
  )
}
export default SignInMenu
