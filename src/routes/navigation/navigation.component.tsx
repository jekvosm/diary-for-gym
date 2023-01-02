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
      <Navbar collapseOnSelect expand='sm' style={{ height: '10vh' }}>
        <Container>
          <Nav.Link
            as={Link}
            to='/'
            className='fs-3 text text-uppercase'
            tabIndex={0}
            eventKey='1'
          >
            DFG
          </Nav.Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
            <Nav className='me-auto '>
              {currentUser ? (
                <Nav.Link
                  as={Button}
                  variant=''
                  onClick={signOutHandler}
                  className='fs-4 text-uppercase'
                  tabIndex={0}
                  eventKey='2'
                >
                  Выйти
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to='/auth'
                  className='fs-4 text-uppercase'
                  tabIndex={0}
                  eventKey='2'
                >
                  Войти
                </Nav.Link>
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
