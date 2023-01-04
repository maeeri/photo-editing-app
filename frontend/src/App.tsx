import './css/style.css'
import GenerateImagePage from './components/GenerateImagePage'
import { Routes, Route } from 'react-router'
import AppBar from './components/AppBar'

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path='/' element={<div>hiya</div>} />
        <Route path='/generate' element={<GenerateImagePage />} />
      </Routes>
      
    </div>
  )
}

export default App
