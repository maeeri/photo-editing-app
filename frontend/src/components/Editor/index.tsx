import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Slider from 'components/Slider'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import ImageArea from './ImageArea'
import { useItemService } from 'hooks/useServer'
import { StrokeStyle, Style, EditMode } from 'types'
import EraseModal from './EraseModal'
import ColourModal from './ColourModal'

type Props = {
  token: string
}

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: '%',
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Hue rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: 'deg',
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: 'px',
  },
]

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

const DRAW_OPTIONS = ['Draw', 'Erase', 'Select']

const Editor = (props: Props) => {
  const [item, setItem] = useState({ id: '', image: '' })
  const [editOptions, setEditOptions] = useState(DEFAULT_OPTIONS)
  const [drawOptions, setDrawOptions] = useState(DRAW_OPTIONS)
  const [selectedEditOptionsIndex, setSelectedEditOptionsIndex] = useState(0)
  const [selectedDrawOptionsIndex, setSelectedDrawOptionsIndex] = useState(0)
  const [showColourSelectModal, setShowColourSelectModal] = useState(false)
  const [showEraseModal, setShowEraseModal] = useState(false)
  const [drawStyle, setDrawStyle] = useState(STROKE_STYLE)
  const { id } = useParams()

  const [itemService] = useItemService()

  const selectedOption = editOptions[selectedEditOptionsIndex]
  const setColour = (value: string) =>
    setDrawStyle({ ...drawStyle, draw: { ...drawStyle.draw, colour: value } })
  const setStrokeWidth = (value: number) => {
    if (drawStyle.mode === EditMode.Draw)
      setDrawStyle({
        ...drawStyle,
        draw: { ...drawStyle.draw, strokeWidth: value },
      })
    else if (drawStyle.mode === EditMode.Erase)
      setDrawStyle({ ...drawStyle, erase: { strokeWidth: value } })
  }
  const setMode = (value: EditMode) => {
    setDrawStyle({ ...drawStyle, mode: value })
  }

  const setSelectedDrawOption = (value: number) => {
    setSelectedDrawOptionsIndex(value)
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

  useEffect(() => {
    const getItem = async () => {
      if (typeof id === 'string' && id !== '1') {
        const response = await itemService.getOneItem(id, props.token)
        setItem(response)
      } else {
        setItem({
          id: '1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Blank_Square.svg/768px-Blank_Square.svg.png',
        })
      }
    }
    getItem()
  }, [id, item.image, props.token])

  const resetOptions = () => {
    setEditOptions(DEFAULT_OPTIONS)
  }

  const handleSliderChange = ({ target }: any) => {
    setEditOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedEditOptionsIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  const getImageStyle = () => {
    const filters = editOptions.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  return (
    <div className="container editor-container">
      {!item.image && <Loader show={true} />}
      {item.image && (
        <ImageArea
          item={item}
          style={getImageStyle()}
          resetOptions={resetOptions}
          strokeStyle={drawStyle}
        />
      )}
      <div className="sidebar-container">
        <div className="edit-sidebar">
          <Sidebar
            options={editOptions.map((o) => o.name)}
            selectedOptionsIndex={selectedEditOptionsIndex}
            setSelectedOptionsIndex={setSelectedEditOptionsIndex}
          />
        </div>
        <div className="draw-sidebar">
          <Sidebar
            options={DRAW_OPTIONS}
            selectedOptionsIndex={selectedDrawOptionsIndex}
            setSelectedOptionsIndex={(n) => setSelectedDrawOption(n)}
          />
        </div>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      <ColourModal
        show={showColourSelectModal}
        setShow={setShowColourSelectModal}
        style={drawStyle.draw}
        setColour={setColour}
        setStrokeWidth={setStrokeWidth}
      />
      <EraseModal
        show={showEraseModal}
        setShow={setShowEraseModal}
        setStrokeWidth={setStrokeWidth}
        style={drawStyle.erase}
      />
    </div>
  )
}

export default Editor
