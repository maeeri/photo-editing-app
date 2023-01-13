import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import itemService from 'services/item'
import Slider from 'components/Slider'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import ImageArea from './ImageArea'

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

const Editor = (props: Props) => {
  const [item, setItem] = useState({ id: '', image: '' })
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0)
  const { id } = useParams()

  const selectedOption = options[selectedOptionsIndex]

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
    setOptions(DEFAULT_OPTIONS)
  }

  const handleSliderChange = ({ target }: any) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionsIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  const getImageStyle = () => {
    const filters = options.map((option) => {
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
        />
      )}
      <Sidebar
        options={options}
        selectedOptionsIndex={selectedOptionsIndex}
        setSelectedOptionsIndex={setSelectedOptionsIndex}
      />
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  )
}

export default Editor
