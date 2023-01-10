import { useState, useEffect } from 'react'
import ImageForm from './ImageForm'
import { ImageFormValues, Size } from 'types'
import ShowArea from './ShowArea'
import Loader from 'components/Loader'
import imagesService from 'services/images'

const GenerateImagePage = () => {
  const [imageUrls, setImageUrls] = useState([])
  const [prompt, setPrompt] = useState('')
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState(Size.small)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {}, [imageUrls, showSpinner])

  const onSubmit = async (event: any) => {
    event.preventDefault()

    const params: ImageFormValues = { prompt, number, size }
    if (prompt === '') alert('add some text')
    else {
      setShowSpinner(true)
      const response = await imagesService.generateImage(params)
      setImageUrls(response)
      setShowSpinner(false)

      setPrompt('')
      setNumber(1)
      setSize(Size.small)
    }
  }

  return (
    <div className="container">
      <div className="box">
        <h1 className="img-head">Generate images</h1>
        <div className="img-form">
          <ImageForm
            onSubmit={onSubmit}
            number={number}
            setNumber={setNumber}
            prompt={prompt}
            setPrompt={setPrompt}
            size={size}
            setSize={setSize}
          />
        </div>
      </div>
      <div className="show-area box">
        <Loader show={showSpinner} />
        {!showSpinner && <ShowArea imgUrls={imageUrls} />}
      </div>
    </div>
  )
}

export default GenerateImagePage
