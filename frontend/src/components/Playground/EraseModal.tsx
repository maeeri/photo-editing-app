import Slider from 'components/Slider'
import { Form, Modal } from 'react-bootstrap'
import { ModalProps, StrokeStyle } from 'types'

interface Props extends ModalProps {
  style: StrokeStyle
  setStrokeWidth: (value: number) => void
}

const EraseModal = (props: Props) => {
  const { show, setShow, style, setStrokeWidth } = props
  const onClose = () => {
    setShow(false)
  }
  return (
    <Modal
      className="modal"
      onHide={onClose}
      show={show}
      keyboard={true}
    >
      <Modal.Title></Modal.Title>
      <Modal.Body>
        <Form>
          <Slider
            min={1}
            max={100}
            value={style.strokeWidth}
            handleChange={({ target }) => setStrokeWidth(Number(target.value))}
          />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EraseModal
