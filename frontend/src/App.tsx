import './css/style.css'
import GenerateImagePage from 'components/GenerateImagePage'
import { Routes, Route, useNavigate } from 'react-router'
import AppBar from 'components/AppBar'
import HomePage from 'components/HomePage'
import { useEffect, useState } from 'react'
import UploadImagePage from 'components/UploadImagePage'
import SignUpSignInPage from 'components/SignUpSignInPage'
import Editor from 'components/Editor'
import { useUserService, useItemService } from 'hooks/useServer'
import Playground from 'components/Playground'

function App() {
  const [background, setBackground] = useState('')
  const [textColour, setTextColour] = useState('')
  const [user, setUser] = useState({ username: '', id: '', name: '', role: '' })

  const [userService] = useUserService()
  const [itemService] = useItemService()

  const navigate = useNavigate()

  const body = document.getElementById('body')

  const bg = window.localStorage.getItem('openaibg')
  const txt = window.localStorage.getItem('openaitext')
  const userFromLocalStorage = window.localStorage.getItem('openaiuser')
  const token = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).token
    : ''

  if (body) {
    body.style.backgroundColor = background ? background : 'grey'
    body.style.color = textColour ? textColour : 'black'
  }

  useEffect(() => {
    checkBackgroundColour()
    checkTextColour()
    getUser()
  }, [bg, body, txt])

  const checkBackgroundColour = () => {
    if (typeof bg === 'string' && body) {
      setBackground(bg)
    } else {
      setBackground('')
    }
  }

  const checkTextColour = () => {
    if (typeof txt === 'string' && body) {
      setTextColour(txt)
    } else {
      setTextColour('')
    }
  }

  const getUser = async () => {
    const userFromLocalStorage = window.localStorage.getItem('openaiuser')
    if (userFromLocalStorage) {
      const res = await userService.getOneUser(
        JSON.parse(userFromLocalStorage).id
      )
      setUser(res)
    }
  }

  const signout = () => {
    window.localStorage.removeItem('openaiuser')
    setUser({ username: '', id: '', role: '', name: '' })
    navigate('/')
  }

  const saveImageToDatabase = async (
    img: any,
    width: number,
    height: number
  ) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, width, height)
    console.log(canvas)
    const dataUrl = canvas.toDataURL()

    await itemService.createItem(dataUrl, token)
  }

  return (
    <div className="app">
      <AppBar user={user} signout={signout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={<SignUpSignInPage user={user} setUser={setUser} />}
        />
        {user.id && (
          <Route
            path="/generate"
            element={
              <GenerateImagePage
                token={token}
                saveImageToDb={saveImageToDatabase}
              />
            }
          />
        )}
        {user.id && (
          <Route
            path="/edit"
            element={
              <UploadImagePage
                token={token}
                saveImageToDb={saveImageToDatabase}
              />
            }
          />
        )}
        {user.id && (
          <Route path="/edit/:id" element={<Editor token={token} />} />
        )}
        {user.id && <Route path="/playground" element={<Playground />} />}
      </Routes>
    </div>
  )
}

export default App
