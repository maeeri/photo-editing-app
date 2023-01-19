import { useState } from 'react'
import 'css/playground.css'
import Sidebar from 'components/Sidebar'
import ColourModal from './ColourModal'
import EraseModal from './EraseModal'
import { EditMode, StrokeStyle } from 'types'
import DrawingApp from './DrawingApp'

const STROKE_STYLE: StrokeStyle = {
  colour: '#000000',
  strokeWidth: 5,
  mode: EditMode.Draw,
}

const OPTIONS = ['Draw', 'Erase', 'Select']

const Playground = () => {
  const [style, setStyle] = useState(STROKE_STYLE)
  const [showColourSelectModal, setShowColourSelectModal] = useState(false)
  const [showEraseModal, setShowEraseModal] = useState(false)
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0)

  const setColour = (value: string) => setStyle({ ...style, colour: value })
  const setStrokeWidth = (value: number) =>
    setStyle({ ...style, strokeWidth: value })
  const setMode = (value: EditMode) => {
    setStyle({ ...style, mode: value })
  }

  const setSelected = (value: number) => {
    setSelectedOptionsIndex(value)
    switch (value) {
      case 0:
        setShowColourSelectModal(true)
        setMode(EditMode.Draw)
        break
      case 1:
        setShowEraseModal(true)
        setMode(EditMode.Erase)
        break
      case 2:
        setMode(EditMode.Select)
        break
      case 3:
        break
      case 4:
        break
      default:
        break
    }
  }

  return (
    <div className="container playground-container">
      <div className="canvas-container">
        <DrawingApp strokeStyle={style} />
      </div>

      <div className="playground-sidebar sidebar">
        <Sidebar
          options={OPTIONS}
          selectedOptionsIndex={selectedOptionsIndex}
          setSelectedOptionsIndex={(n) => setSelected(n)}
        />
      </div>

      <ColourModal
        show={showColourSelectModal}
        setShow={setShowColourSelectModal}
        style={style}
        setColour={setColour}
        setStrokeWidth={setStrokeWidth}
      />
      <EraseModal
        show={showEraseModal}
        setShow={setShowEraseModal}
        setStrokeWidth={setStrokeWidth}
        style={style}
      />
    </div>
  )
}

export default Playground
