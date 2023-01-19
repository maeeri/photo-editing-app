import FileInputForm from './FileInputForm'
import ImageList from './ImageList'
import 'css/editor.css'
import { useState } from 'react'
import itemService from 'services/item'

type Props = {
  token: string
  saveImageToDb: (img: any, width: number, height: number) => void
}

const UploadImagePage = (props: Props) => {
  const [image, setImage] = useState(new Blob())
  const [items, setItems] = useState([{ id: '', image: '' }])
  const {token, saveImageToDb} = props

  const onSubmit = async (event: any) => {
    event.preventDefault()

    const reader = new FileReader()
    reader.onloadend = async () => {
      console.log(reader.result)
      if (reader.result === 'data:') {
        window.alert('please choose a file before uploading')
      } else if (typeof reader.result === 'string') {
        const img = document.createElement('img')
        img.src = reader.result

        img.onload = async () => {
          const { height, width } = calculateImageFit(img.height, img.width)
            ? { height: img.height, width: img.width }
            : getNewHeightAndWidth(img.height, img.width)

          await saveImageToDb(img, width, height)
        }
      }
    }
    reader.readAsDataURL(image)
    setImage(new Blob())
    const updatedItems = await itemService.getItems(props.token)
    setItems(updatedItems)
  }

  const getNewHeightAndWidth = (height: number, width: number) => {
    const aspectRatio = height < width ? height / width : width / height
    const maxSize = 2000000
    const newHeight = Math.floor((maxSize * aspectRatio) / height)
    const newWidth = Math.floor((maxSize * aspectRatio) / width)

    return { height: newHeight, width: newWidth }
  }

  const calculateImageFit = (height: number, width: number) => {
    const maxSize = 2000000
    return maxSize / height > width
  }

  return (
    <div className="file-upload-container">
      <div className="box edit-form">
        <FileInputForm image={image} setImage={setImage} onSubmit={onSubmit} />
        <ImageList items={items} setItems={setItems} />
      </div>
    </div>
  )
}

export default UploadImagePage
