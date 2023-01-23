import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useLoginService } from 'hooks/useServer'
import { useNavigate } from 'react-router'

type Props = {
  setUser: (values: any) => void
}

const SignIn = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loginService] = useLoginService()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const res = await loginService.login({ username, password })

    props.setUser(res)
    window.localStorage.setItem('openaiuser', JSON.stringify(res))

    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h3>Sign in</h3>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button className="submit-btn" type="submit">
          sign in
        </button>
      </Form>
    </div>
  )
}

export default SignIn
