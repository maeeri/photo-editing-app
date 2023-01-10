import './css/style.css'
import GenerateImagePage from 'components/GenerateImagePage'
import { Routes, Route } from 'react-router'
import AppBar from 'components/AppBar'
import HomePage from 'components/HomePage'
import { useEffect, useState } from 'react'
import EditmagePage from 'components/EditImagePage'
import SignUpSignInPage from 'components/SignUpSignInPage'

function App() {
  const [background, setBackground] = useState('')
  const [textColour, setTextColour] = useState('')
  const [user, setUser] = useState({ username: '', id: '', token: '' })
  const body = document.getElementById('body')
  const bg = window.localStorage.getItem('openaibg')
  const txt = window.localStorage.getItem('openaitext')

  if (body) {
    body.style.backgroundColor = background ? background : 'grey'
    body.style.color = textColour ? textColour : 'black'
  }

  useEffect(() => {
    if (typeof bg === 'string' && body) {
      setBackground(bg)
    } else {
      setBackground('')
    }
    if (typeof txt === 'string' && body) {
      setTextColour(txt)
    } else {
      setTextColour('')
    }
  }, [bg, body, txt])

  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GenerateImagePage />} />
        <Route path="/edit" element={<EditmagePage token={user.token} />} />
        <Route path="/signup" element={<SignUpSignInPage user={user} />} />
      </Routes>
    </div>
  )
}

export default App
