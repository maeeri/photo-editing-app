import FileInputForm from './FileInputForm'
import 'css/edit.css'
import { useState } from 'react'
import { getItem, createItem } from 'services/item'

type Props = {
  token: string
}

const EditmagePage = (props: Props) => {
  const [item, setItem] = useState({})
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')

  const onSubmit = async (event: any) => {
    event.preventDefault()
    const result = await createItem({ title, image }, props.token)
    setItem(result)
  }
  
  return (
    <div className="container">
      <div className="box edit-form">
        <FileInputForm
          title={title}
          setTitle={setTitle}
          image={image}
          setImage={setImage}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export default EditmagePage
