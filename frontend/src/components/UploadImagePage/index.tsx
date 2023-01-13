import FileInputForm from './FileInputForm'
import ImageList from './ImageList'
import 'css/editor.css'
import { useState } from 'react'
import itemService from 'services/item'

type Props = {
  token: string
}

const UploadImagePage = (props: Props) => {
  const [image, setImage] = useState(new Blob())
  const [items, setItems] = useState([{ id: '', image: '' }])

  let token = ''
  const userFromLS = window.localStorage.getItem('openaiuser')
  if (userFromLS) token = JSON.parse(userFromLS).token

  const onSubmit = async (event: any) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onloadend = async function () {
      reader.result === 'data:'
        ? window.alert('please choose a file before uploading')
        : await itemService.createItem(reader.result, token)
    }
    reader.readAsDataURL(image)
    setImage(new Blob())
    setItems(await itemService.getItems(props.token))
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
