import { Fragment } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const Navigation = () => {
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
              <Nav.Link
                as={Link}
                to='/sign-in'
                className='fs-4 text-uppercase'
                tabIndex={0}
                eventKey='2'
              >
                SIGN IN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
