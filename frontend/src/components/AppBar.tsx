import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/appbar.css'

const AppBar = () => {
  return (
    <Navbar className='bar' bg="dark">
      <Container>
        <Container><Link className='navlink' to="/">home</Link></Container>
        <Container><Link className='navlink' to="/generate">generate</Link></Container>
      </Container>
    </Navbar>
  )
}

export default AppBar
