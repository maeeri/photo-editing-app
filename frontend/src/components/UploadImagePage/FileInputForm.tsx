import { Form, Button } from 'react-bootstrap'

type Props = {
  image: any
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
        <Form.Label><h4 className='title'>upload an image</h4></Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      <Button type="submit">upload</Button>
    </Form>
  )
}

export default FileInputForm
