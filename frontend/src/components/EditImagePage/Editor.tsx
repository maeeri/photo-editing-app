import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import itemService from 'services/item'
import Slider from './Slider'
import SideBarItem from './SideBarItem'
import * as htmlToImage from 'html-to-image'
import { fabric } from 'fabric'
import FileSaver from 'file-saver'

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
  const img = document.getElementById('img')

  useEffect(() => {
    const getItem = async () => {
      if (typeof id === 'string') {
        const response = await itemService.getOneItem(id, props.token)
        setItem(response)
      }
    }
    getItem()
  }, [id, item.image])

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

  const downloadImage = async () => {
    if (img) {
      const res = await htmlToImage.toBlob(img)
      console.log(res)
      if (res !== null) FileSaver.saveAs(res)
    }
  }

  return (
    <div className="editor-container">
      <div className="main-img-container">
        <img
          className="main-img"
          id="img"
          src={item.image}
          alt="editable"
          style={getImageStyle()}
        />
      </div>
      <div className='open-img-btn'>
        <button onClick={downloadImage}>
        download image
      </button>
      <button onClick={resetOptions}>
        reset
      </button>
      </div>
      
      <div className="sidebar">
        {options.map((o, i) => (
          <SideBarItem
            key={i}
            name={o.name}
            active={i === selectedOptionsIndex}
            handleClick={() => setSelectedOptionsIndex(i)}
          />
        ))}
      </div>
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
