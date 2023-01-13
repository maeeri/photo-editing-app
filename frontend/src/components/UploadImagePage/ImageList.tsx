import Loader from 'components/Loader'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import itemService from 'services/item'
import 'css/imageList.css'

type Props = {
  items: {
    id: string
    image: string
  }[]
  setItems: (values: any) => void
}

const dummyImage = [
  {
    id: '1',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Blank_Square.svg/768px-Blank_Square.svg.png',
  },
]

const ImageList = (props: Props) => {
  const user = window.localStorage.getItem('openaiuser')
  const token = user ? JSON.parse(user).token : null
  const { items, setItems } = props

  useEffect(() => {
    async function getItems() {
      const res = await itemService.getItems(token)
      console.log(
        res.length > 0 &&
          (!items[0] || !items[0].id || res.length !== items.length)
      )
      console.log()

      res.length > 0 &&
      (!items[0] || !items[0].id || res.length !== items.length)
        ? setItems(res)
        : !items[0].id
        ? setItems(dummyImage)
        : console.log()
    }
    getItems()
  }, [items, token, setItems])

  return items[0] ? (
    <div className="image-list">
      <h4 className="title">your images</h4>
      <div>click on the image to edit</div>
      {items.map((i) => (
        <Link key={i.id} to={`/edit/${i.id}`}>
          <img className="list-img" alt="gen" src={i.image} />
        </Link>
      ))}
    </div>
  ) : (
    <Loader show={true} />
  )
}

export default ImageList
