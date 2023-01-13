import { User } from 'types'
import SignIn from './SignIn'
import SignUp from './SignUp'
import 'css/forms.css'
import 'css/signup.css'

type Props = {
  user: User
  setUser: (values: any) => void
}

const SignUpSignInPage = (props: Props) => {
  const toggleVisibility = (element: any) => {
    if (element && element.classList.value.includes('hide')) {
      element.classList.remove('hide')
      element.classList.add('show')
    } else if (element) {
      element.classList.remove('show')
      element.classList.add('hide')
    }
  }

  return (
    <div className="container signup-container">
      <div className="buttons">
        <button
          onClick={() => toggleVisibility(document.getElementById('signin'))}
          id="signin-button"
          className="button"
        >
          sign in
        </button>
        <button
          onClick={() => toggleVisibility(document.getElementById('signup'))}
          id="signup-button"
          className="button"
        >
          sign up
        </button>
      </div>
      <div className="box signin hide" id="signin">
        <SignIn setUser={props.setUser} />
      </div>
      <div className="box signup hide" id="signup">
        <SignUp setUser={props.setUser} />
      </div>
    </div>
  )
}

export default SignUpSignInPage
