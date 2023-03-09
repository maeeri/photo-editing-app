import Slider from 'components/Slider'
import { Modal, Form } from 'react-bootstrap'
import { ModalProps, Style } from 'types'

interface Props extends ModalProps {
  style: Style
  setColour: (value: string) => void
  setStrokeWidth: (value: number) => void
}

const ColourModal = (props: Props) => {
  const { show, setShow, setColour, setStrokeWidth, style } = props

  const onClose = () => {
    setShow(false)
  }

  return (
    <Modal className="modal" onHide={onClose} show={show} keyboard={true}>
      <div className="modal-content">
        <Modal.Title>select draw style</Modal.Title>
        <Modal.Body>
          <Form.Group>
            <Form.Label>set colour</Form.Label>
            <Form.Control
              type="color"
              defaultValue={style.colour}
              title="Choose your color"
              onChange={({ target }) => setColour(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>set width</Form.Label>
            <Slider
              min={2}
              max={100}
              value={style.strokeWidth}
              handleChange={({ target }) =>
                setStrokeWidth(Number(target.value))
              }
            />
          </Form.Group>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default ColourModal
