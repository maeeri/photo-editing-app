import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'css/appbar.css'

const AppBar = () => {
  return (
    <Navbar className="bar" bg="dark">
      <div className='appbar-container'>
        <div className='navitem'>
          <Link className="navlink" to="/">
            home
          </Link>
        </div>
        <div className='navitem'>
          <Link className="navlink" to="/generate">
            generate
          </Link>
        </div>
        <div className='navitem'>
          <Link className="navlink" to="/edit">
            edit
          </Link>
        </div>
        <div className='navitem'>
          <Link className="navlink" to="/signup">
            sign in or up
          </Link>
        </div>
      </div>
    </Navbar>
  )
}

export default AppBar
