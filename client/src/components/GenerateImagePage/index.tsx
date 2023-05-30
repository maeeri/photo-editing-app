import { useState, useEffect } from 'react'
import ImageForm from './ImageForm'
import { ImageFormValues, Size } from 'types'
import ShowArea from './ShowArea'
import Loader from 'components/Loader'
import { useOpenAI } from 'hooks/useOpenAI'

type Props = {
  token: string
  saveImageToDb: (img: any, width: number, height: number) => void
}

const GenerateImagePage = (props: Props) => {
  const [imageUrls, setImageUrls] = useState([])
  const [prompt, setPrompt] = useState('')
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState(Size.Small)
  const [showSpinner, setShowSpinner] = useState(false)
  const { token, saveImageToDb } = props

  const [imagesService] = useOpenAI()

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
      setSize(Size.Small)
    }
  }

  return (
    <div className="generate-img-container container">
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
      {imageUrls.length > 0 && <div className="show-area box">
        {!showSpinner && (
          <ShowArea
            imgUrls={imageUrls}
            token={token}
            saveImageToDb={saveImageToDb}
          />
        )}
      </div>}
      <Loader show={showSpinner} />
    </div>
  )
}

export default GenerateImagePage
