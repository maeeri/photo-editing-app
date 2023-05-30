import Slider from 'components/Slider'
import { Form, Modal } from 'react-bootstrap'
import { ModalProps, Style } from 'types'

interface Props extends ModalProps {
  style: Style
  setStrokeWidth: (value: number) => void
}

const EraseModal = (props: Props) => {
  const { show, setShow, style, setStrokeWidth } = props
  const onClose = () => {
    setShow(false)
  }

  return (
    <Modal className="modal" onHide={onClose} show={show} keyboard={true}>
      <Modal.Title></Modal.Title>
      <Modal.Body>
        <Form>
          <div>set width</div>
          <Slider
            min={1}
            max={100}
            value={style.strokeWidth}
            handleChange={({ target }) => {
              setStrokeWidth(Number(target.value))
            }}
          />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EraseModal
