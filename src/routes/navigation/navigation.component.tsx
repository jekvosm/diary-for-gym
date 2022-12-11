import { Fragment, useEffect } from 'react'
import { useLocation, useNavigate, Link, Outlet } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/redux-hooks/redux-hooks'
import { selectCurrentUser } from '../../store/slices/user/user-selectors'
import { signOutUser } from '../../store/slices/user/user-slice'
import { clearWorkoutDaysAfterSignout } from '../../store/slices/workout/workout-slice'

interface stateType {
  from: { pathname: string }
}

const Navigation = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      const { from } = location.state as stateType
      const { pathname } = from

      navigate(pathname, { replace: true })
    } else if (location.pathname === '/auth') {
      navigate('/')
    }
  }, [currentUser])

  const signOutHandler = () => {
    dispatch(signOutUser())
    dispatch(clearWorkoutDaysAfterSignout())
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
            HOME
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
                  SIGN OUT
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to='/auth'
                  className='fs-4 text-uppercase'
                  tabIndex={0}
                  eventKey='2'
                >
                  SIGN IN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
