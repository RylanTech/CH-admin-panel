import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

function NavigationBar() {

    return (
        <>
            <div>
                <Navbar className="nav-color" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">
    
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/churches">Churches</Link>
                                <Link className="nav-link" to="/events">Events</Link>
                                <Link className="nav-link" to="/users">Users</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <Outlet />
        </>
    )
}
export default NavigationBar