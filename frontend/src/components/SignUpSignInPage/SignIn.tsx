import { Container, Form } from 'react-bootstrap'

const SignIn = () => {
  return (
    <div>
      <Form>
        <h3>Sign in</h3>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignIn
