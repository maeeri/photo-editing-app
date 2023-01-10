import { Container, Form } from 'react-bootstrap'

const SignUp = () => {
  return (
    <div>
      <h3>Sign up</h3>
      <Form>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignUp
