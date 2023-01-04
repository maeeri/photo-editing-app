import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ImageForm from './ImageForm'
import { ImageFormValues, Size } from '../../types'
import ShowArea from './ShowArea'
import { generateImage } from '../../services/images'

const GenerateImagePage = () => {
  const [imageUrls, setImageUrls] = useState([])
  const [prompt, setPrompt] = useState('')
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState(Size.small)
  console.log(imageUrls)

  useEffect(() => {}, [imageUrls])

  const onSubmit = async (event: any) => {
    event.preventDefault()
    
    const params: ImageFormValues = { prompt, number, size }
    const response = await generateImage(params)
    setImageUrls(response)

    console.log(response)

    setPrompt('')
    setNumber(1)
    setSize(Size.small)
  }

  return (
    <Container className="img-form">
      <h1 className="img-head">Generate image</h1>
      <ImageForm
        onSubmit={onSubmit}
        number={number}
        setNumber={setNumber}
        prompt={prompt}
        setPrompt={setPrompt}
        size={size}
        setSize={setSize}
      />
      <div>
        <ShowArea imgUrls={imageUrls} />
      </div>
    </Container>
  )
}

export default GenerateImagePage
