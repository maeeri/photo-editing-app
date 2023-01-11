import './css/style.css'
import GenerateImagePage from 'components/GenerateImagePage'
import { Routes, Route, useNavigate } from 'react-router'
import AppBar from 'components/AppBar'
import HomePage from 'components/HomePage'
import { useEffect, useState, Fragment } from 'react'
import EditmagePage from 'components/EditImagePage'
import SignUpSignInPage from 'components/SignUpSignInPage'
import Editor from 'components/EditImagePage/Editor'
import userService from 'services/user'

function App() {
  const [background, setBackground] = useState('')
  const [textColour, setTextColour] = useState('')
  const [user, setUser] = useState({ username: '', id: '', name: '', role: '' })

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

  return (
    <div>
      <AppBar user={user} signout={signout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={<SignUpSignInPage user={user} setUser={setUser} />}
        />
        {user.id && <Route path="/generate" element={<GenerateImagePage />} />}
        {user.id && (
          <Route path="/edit" element={<EditmagePage token={token} />} />
        )}
        {user.id && (
          <Route path="/edit/:id" element={<Editor token={token} />} />
        )}
      </Routes>
    </div>
  )
}

export default App
