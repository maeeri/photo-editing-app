import { User } from 'types'
import SignIn from './SignIn'
import SignUp from './SignUp'
import 'css/forms.css'
import 'css/signup.css'
import VisibilityToggler from 'components/VisibilityToggler'

type Props = {
  user: User
  setUser: (values: any) => void
}

const SignUpSignInPage = (props: Props) => {
  return (
    <div className="container signup-container">
      <div className="buttons">
        <VisibilityToggler
          elementToShow={document.getElementById('signin') as HTMLElement}
          elementToHide={document.getElementById('signup') as HTMLElement}
          id="signin-button"
          label="sign in"
        />
        <VisibilityToggler
          elementToShow={document.getElementById('signup') as HTMLElement}
          elementToHide={document.getElementById('signin') as HTMLElement}
          id="signup-button"
          label="sign up"
        />
      </div>
      <div className="form-container">
        <div className="box signin hide" id="signin">
          <SignIn setUser={props.setUser} />
        </div>
        <div className="box signup hide" id="signup">
          <SignUp setUser={props.setUser} />
        </div>
      </div>
    </div>
  )
}

export default SignUpSignInPage
