import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ImageForm from './ImageForm'
import { ImageFormValues, Size } from '../../types'

const GenerateImagePage = () => {
  const [imageUrls, setImageUrls] = useState([])
  const [prompt, setPrompt] = useState('')
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState(Size.small)

  useEffect(() => {}, [imageUrls])

  const onSubmit = async (event: any) => {
    event.preventDefault()
    console.log(prompt, number, size)
    const params: ImageFormValues = { prompt, number, size }
    // const response = await generateImage(params)

    setPrompt('')
    setNumber(1)
    setSize(Size.small)
  }

  return (
    <Container>
      <h1>Generate image</h1>
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
        {imageUrls &&
          imageUrls.length > 0 &&
          imageUrls.map((url) => (
            <img
              style={{ display: 'inline-block' }}
              key={url}
              src={url}
              alt="generated"
            />
          ))}
      </div>
    </Container>
  )
}

export default GenerateImagePage
