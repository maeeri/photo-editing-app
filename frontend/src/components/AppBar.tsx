import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'css/appbar.css'

type Props = {
  user: {
    username: string
    id: string
    name: string
    role: string
  }
  signout: () => void
}

const AppBar = (props: Props) => {
  const { user, signout } = props

  const style = { width: window.innerWidth }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bar"
      bg="dark"
      variant="dark"
      sticky="top"
      style={style}
    >
      <Navbar.Toggle
        className="navbar-toggler"
        aria-controls="reaponsive-navbar-nav"
      />
      <div className="appbar-container">
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navitem">
            <Link className="navlink" to="/">
              home
            </Link>
          </div>

          {!user.id && (
            <div className="navitem">
              <Link className="navlink" to="/signup">
                sign in or up
              </Link>
            </div>
          )}
          {user.id && (
            <div className="navitem">
              <Link className="navlink" to="/generate">
                generate
              </Link>
            </div>
          )}
          {user.id && (
            <div className="navitem">
              <Link className="navlink" to="/edit">
                edit
              </Link>
            </div>
          )}
          {/* {user.id && (
            <div className="navitem">
              <Link className="navlink" to="/playground">
                playground
              </Link>
            </div>
          )} */}
          {user.id && (
            <div className="navitem">
              <button onClick={signout} className="nav-btn">
                sign out
              </button>
            </div>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default AppBar
