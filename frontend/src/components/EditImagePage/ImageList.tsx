import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import itemService from 'services/item'

type Props = {
  items: 
    {
      id: string
      image: string
    }[]
  setItems: (values: any) => void
}

const ImageList = (props: Props) => {
  const user = window.localStorage.getItem('openaiuser')
  const token = user ? JSON.parse(user).token : null
  const { items, setItems } = props
  console.log(items.length)

  useEffect(() => {
    async function getItems() {
      const res = await itemService.getItems(token)
      console.log(items.length, res.length)
      if (items.length !== res.length) setItems(res)
    }
    getItems()
  }, [items, token])

  return items[0] ? (
    <div>
      {items.map((i) => (
        <Link key={i.id} to={`/edit/${i.id}`}>
          <img className="list-img" alt="gen" src={i.image} />
        </Link>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default ImageList
