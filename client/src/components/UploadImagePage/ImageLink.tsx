import { Link } from 'react-router-dom'
import { useItemService } from 'hooks/useServer'
import * as Icon from 'react-bootstrap-icons'

type Props = {
  item: {
    image: string
    id: string
  }
  token: string
}

const ImageLink = (props: Props) => {
  const { item, token } = props
  const [itemService] = useItemService()

  console.log(item)

  const removeItem = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await itemService.deleteItem(item.id, token)
    }
  }

  return (
    <div className="image-link-container">
      <Link to={`/edit/${item.id}`}>
        <img className="list-img" alt="gen" src={item.image} />
      </Link>
      <Icon.Trash className="icon" onClick={removeItem} />
    </div>
  )
}

export default ImageLink
