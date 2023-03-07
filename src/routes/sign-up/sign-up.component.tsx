import { Link } from 'react-router-dom'

import AuthSignUpForm from '../../components/auth-sign-up-form/auth-sign-up-form.component'

import { NavLink } from 'react-bootstrap'

const SignUp = () => {
  return (
    <>
      <header className='text-center'>
        <h2>Нет аккаунта?</h2>
        <span>Регистрация</span>
      </header>

      <AuthSignUpForm />

      <span className='text-center'>
        Уже есть аккаунт?{' '}
        <NavLink
          as={Link}
          to='/auth/sign-in'
          className='d-inline text-decoration-underline'
        >
          Войти
        </NavLink>
      </span>
    </>
  )
}
export default SignUp
