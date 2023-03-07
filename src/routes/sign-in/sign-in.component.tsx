import { Link } from 'react-router-dom'

import AuthSignInForm from '../../components/auth-sign-in-form/auth-sign-in-form.component'

import { NavLink } from 'react-bootstrap'

const SignIn = () => {
  return (
    <>
      <header className='text-center'>
        <h2>Уже есть аккаут?</h2>
        <span>Войти с помощью почты и пароля</span>
      </header>

      <AuthSignInForm />

      <span className='text-center'>
        Ещё нет аккаунта?{' '}
        <NavLink
          as={Link}
          to='/auth/sign-up'
          className='d-inline text-decoration-underline'
        >
          Зарегистрироваться
        </NavLink>
      </span>
    </>
  )
}
export default SignIn
