import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ImageForm from './ImageForm'
import { ImageFormValues, Size } from 'types'
import ShowArea from './ShowArea'
import { generateImage } from 'services/images'

const GenerateImagePage = () => {
  const [imageUrls, setImageUrls] = useState([
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-LLMEudFb7HRHlQiDyly3qBsL/user-cyEFE4v0rr0u7Bkd5z0AOTe1/img-fpknuf7FKRi5gyUYj3xKG4G8.png?st=2023-01-04T12%3A27%3A28Z&se=2023-01-04T14%3A27%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-04T11%3A29%3A19Z&ske=2023-01-05T11%3A29%3A19Z&sks=b&skv=2021-08-06&sig=W/o81r4ZgN3bzOdZFgg5OiWWH%2BlmOETy%2BI2N/%2BmNu9Q%3D',
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-LLMEudFb7HRHlQiDyly3qBsL/user-cyEFE4v0rr0u7Bkd5z0AOTe1/img-5sJH33jgbzYVr8gBGyeNIWp7.png?st=2023-01-04T12%3A27%3A28Z&se=2023-01-04T14%3A27%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-04T11%3A29%3A19Z&ske=2023-01-05T11%3A29%3A19Z&sks=b&skv=2021-08-06&sig=jfKQS7L8S1kxyGM83rCRUiW1n%2BHwK5rS4RoW3hrSq/g%3D',
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-LLMEudFb7HRHlQiDyly3qBsL/user-cyEFE4v0rr0u7Bkd5z0AOTe1/img-AgGS1EQ8x1qExhmFmz6JoU8S.png?st=2023-01-04T12%3A27%3A28Z&se=2023-01-04T14%3A27%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-04T11%3A29%3A19Z&ske=2023-01-05T11%3A29%3A19Z&sks=b&skv=2021-08-06&sig=FjlIiT1hZFGVD%2BiJHVzyKFVaaQGgO3EEexw3G6Lf1v8%3D'
  ])
  const [prompt, setPrompt] = useState('')
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState(Size.small)

  useEffect(() => {}, [imageUrls])

  const onSubmit = async (event: any) => {
    event.preventDefault()

    const params: ImageFormValues = { prompt, number, size }
    const response = await generateImage(params)
    setImageUrls(response)

    setPrompt('')
    setNumber(1)
    setSize(Size.small)
  }

  return (
    <Container>
      <Container className='img-form box' >
      <h1 className="img-head">Generate images</h1>
      <ImageForm
        onSubmit={onSubmit}
        number={number}
        setNumber={setNumber}
        prompt={prompt}
        setPrompt={setPrompt}
        size={size}
        setSize={setSize}
      />
      </Container>
      <Container className='show-area box'>
        <ShowArea imgUrls={imageUrls} />
      </Container>
    </Container>
  )
}

export default GenerateImagePage
