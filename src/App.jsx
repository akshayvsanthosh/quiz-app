import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Quiz from './Components/Quiz'

function App() {

  return (
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Quiz/>} path='/quiz'/>
    </Routes>
)
}

export default App
