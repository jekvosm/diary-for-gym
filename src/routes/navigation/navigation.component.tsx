import { Fragment } from 'react'

import { useNavigate, Link, Outlet } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'

import { signOutUser } from '../../store/slices/user/user-slice'
import { clearWorkoutDaysAfterSignOut } from '../../store/slices/workout/workout-slice'

import { selectCurrentUser } from '../../store/slices/user/user-selectors'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { ReactComponent as Logo } from '../../assets/new-logo-color.svg'

import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const OutletWithSpinner = WithSpinner(Outlet)

const Navigation = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const navigate = useNavigate()

  const signOutHandler = () => {
    dispatch(signOutUser())
    dispatch(clearWorkoutDaysAfterSignOut())
    navigate('/')
  }

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand='sm'
        style={{
          boxShadow: '#094242 0px 1px 14px 0px',
        }}
      >
        <Container className='gap-3 h-auto'>
          <Nav.Link
            as={Link}
            to={currentUser ? `${currentUser.displayName}` : '/'}
            className=''
            tabIndex={0}
            eventKey='1'
          >
            <Logo className='logo' />
          </Nav.Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
            <Nav className='me-auto gap-3'>
              {currentUser ? (
                <Nav.Link
                  as={Button}
                  onClick={signOutHandler}
                  className='fs-4 text-uppercase accent-button'
                  tabIndex={0}
                  eventKey='2'
                >
                  Выйти
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link
                    as={Button}
                    onClick={() => navigate('/auth')}
                    className='fs-4 accent-button'
                    tabIndex={0}
                    eventKey='2'
                  >
                    Войти
                  </Nav.Link>
                  <Nav.Link
                    as={Button}
                    onClick={() => navigate('/auth/sign-up')}
                    className='fs-4 accent-button'
                    tabIndex={0}
                    eventKey='2'
                  >
                    Зарегистрироваться
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <OutletWithSpinner />
    </Fragment>
  )
}

export default Navigation
