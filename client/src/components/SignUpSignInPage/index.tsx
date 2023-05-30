import { User } from 'types'
import SignIn from './SignIn'
import SignUp from './SignUp'
import 'css/forms.css'
import 'css/signup.css'
import VisibilityToggler from 'components/VisibilityToggler'
import { useEffect } from 'react'

type Props = {
  user: User
  setUser: (values: any) => void
}

const SignUpSignInPage = (props: Props) => {
  useEffect(() => {}, [])

  const signinElement = document.getElementById('signin') as HTMLElement
  const signupElement = document.getElementById('signup') as HTMLElement

  return (
    <div className="container signup-container">
      <div className="buttons">
        <VisibilityToggler
          elementToShow={signinElement}
          elementToHide={signupElement}
          id="signin-button"
          label="sign in"
        />
        <VisibilityToggler
          elementToShow={signupElement}
          elementToHide={signinElement}
          id="signup-button"
          label="sign up"
        />
      </div>
      <div className="form-container">
        <div className="box signin show" id="signin">
          <SignIn setUser={props.setUser} />
        </div>
        <div className="box signup show" id="signup">
          <SignUp setUser={props.setUser} />
        </div>
      </div>
    </div>
  )
}

export default SignUpSignInPage
