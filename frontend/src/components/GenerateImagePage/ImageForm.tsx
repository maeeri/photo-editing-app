import { ImageFormValues, Size } from 'types'
import { Button, Form, Container } from 'react-bootstrap'

interface Props extends ImageFormValues {
  onSubmit: (event: any) => void
  setPrompt: (value: string) => void
  setNumber: (value: number) => void
  setSize: (value: Size) => void
}

const ImageForm = (props: Props) => {
  return (
    <Container>
      <Form>
        <Form.Group className="form-group">
          <Form.Label>describe the image you want to create</Form.Label>
          <Form.Control
            style={{ maxWidth: '50vw' }}
            type="text"
            name="prompt"
            value={props.prompt}
            onChange={({ target }) => props.setPrompt(target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <label>how many images do you want to generate?</label>
          {[1, 2, 3, 4].map((v) => (
            <Form.Check
              key={v}
              type="radio"
              name="number"
              label={v}
              checked={props.number === v}
              onChange={() => props.setNumber(v)}
            />
          ))}
        </Form.Group>
        <Form.Group className="form-group">
          <label>image size</label>{' '}
          {(Object.keys(Size) as Array<keyof typeof Size>).map((k) => (
            <Form.Check
              key={k}
              type="radio"
              name="size"
              label={k}
              checked={props.size === k}
              onChange={() => props.setSize(Size[k])}
            />
          ))}
        </Form.Group>
        <Button onClick={(event) => props.onSubmit(event)}>generate</Button>
      </Form>
    </Container>
  )
}

export default ImageForm
