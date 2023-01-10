import { Form, Button } from 'react-bootstrap'

type Props = {
  title: string
  image: string
  setTitle: (value: any) => void
  setImage: (value: any) => void
  onSubmit: (event: any) => void
}

const FileInputForm = (props: Props) => {

  const handleImageChange = (e: any) => {
    props.setImage(e.target.files[0])
  }

  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>upload an image</Form.Label>
        <Form.Control
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>upload an image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
        />
      </Form.Group>
      <Button type="submit">upload</Button>
    </Form>
  )
}

export default FileInputForm
