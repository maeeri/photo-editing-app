import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function ColourPicker() {
  const body = document.getElementById('body')
  const bg = window.localStorage.getItem('openaibg') || '#808080'
  const text = window.localStorage.getItem('openaitext') || '#000000'

  const setBgColour = (colour: string) => {
    if (body) body.style.backgroundColor = colour
    window.localStorage.setItem('openaibg', colour)
  }

  const setTextColour = (colour: string) => {
    if (body) body.style.color = colour
    window.localStorage.setItem('openaitext', colour)
  }

  const resetColours = () => {
    window.localStorage.removeItem('openaibg')
    window.localStorage.removeItem('openaitext')
    if (body) {
      console.log(body.style.color)
      body.style.backgroundColor = 'grey'
      body.style.color = 'black'
    }
  }

  return (
    <>
      <Form className="box colour-picker">
        <Form.Group>
          <Form.Label htmlFor="bg-input">Choose a background colour</Form.Label>
          <Form.Control
            type="color"
            id="bg-input"
            defaultValue={bg}
            title="Choose your color"
            onChange={({ target }) => setBgColour(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="text-input">Choose a text colour</Form.Label>
          <Form.Control
            type="color"
            id="text-input"
            defaultValue={text}
            title="Choose your color"
            onChange={({ target }) => setTextColour(target.value)}
          />
        </Form.Group>
        <br />
        <Button onClick={() => resetColours()}>reset colours</Button>
      </Form>
    </>
  )
}

export default ColourPicker
