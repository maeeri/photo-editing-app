import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useUserService } from 'hooks/useServer'

type Props = {
  setUser: (values: any) => void
}

const SignUp = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userService] = useUserService()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const res = await userService.createUser(username, password, name)

    props.setUser(res)
    window.localStorage.setItem('openaiuser', JSON.stringify(res))

    setName('')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h3>Sign up</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <button className="submit-btn" type="submit">
          sign up
        </button>
      </Form>
    </div>
  )
}

export default SignUp
