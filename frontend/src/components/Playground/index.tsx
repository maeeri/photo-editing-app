import { useState } from 'react'
import 'css/playground.css'
import Sidebar from 'components/Sidebar'
import ColourModal from './ColourModal'
import EraseModal from './EraseModal'
import { EditMode, StrokeStyle } from 'types'
import DrawingApp from './DrawingApp'

const STROKE_STYLE: StrokeStyle = {
  draw: {
    colour: '#000000',
    strokeWidth: 5,
  },
  erase: {
    strokeWidth: 5,
  },
  mode: EditMode.Draw,
}

const OPTIONS = ['Draw', 'Erase', 'Select']

const Playground = () => {
  const [style, setStyle] = useState(STROKE_STYLE)
  const [showColourSelectModal, setShowColourSelectModal] = useState(false)
  const [showEraseModal, setShowEraseModal] = useState(false)
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0)

  const setColour = (value: string) =>
    setStyle({ ...style, draw: { ...style.draw, colour: value } })
  const setStrokeWidth = (value: number) => {
    if (style.mode === EditMode.Draw)
      setStyle({ ...style, draw: { ...style.draw, strokeWidth: value } })
    else if (style.mode === EditMode.Erase)
      setStyle({ ...style, erase: { strokeWidth: value } })
  }
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
        style={style.draw}
        setColour={setColour}
        setStrokeWidth={setStrokeWidth}
      />
      <EraseModal
        show={showEraseModal}
        setShow={setShowEraseModal}
        setStrokeWidth={setStrokeWidth}
        style={style.erase}
      />
    </div>
  )
}

export default Playground
