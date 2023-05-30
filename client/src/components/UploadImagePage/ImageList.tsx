import Loader from 'components/Loader'
import { useEffect } from 'react'
import { useItemService } from 'hooks/useServer'
import 'css/imageList.css'
import ImageLink from './ImageLink'

type Props = {
  items: {
    id: string
    image: string
  }[]
  setItems: (values: any) => void
}

const ImageList = (props: Props) => {
  const user = window.localStorage.getItem('openaiuser')
  const token = user ? JSON.parse(user).token : null
  const { items, setItems } = props
  const [itemService] = useItemService()

  console.log(items)

  useEffect(() => {
    async function getItems() {
      const res = await itemService.getItems(token)

      if (
        res.length > 0 &&
        (items[0].image !== res[0].image || res.length !== items.length)
      )
        setItems(res)
    }
    getItems()
  }, [items, token, setItems])

  return items[0].id ? (
    <div className="image-list-container">
      <h4 className="title">your images</h4>
      <div>click on the image to edit</div>
      <div className="image-list">
        {items.map((i) => (
          <ImageLink key={i.id} item={i} token={token} />
        ))}
      </div>
    </div>
  ) : (
    <Loader show={true} />
  )
}

export default ImageList
