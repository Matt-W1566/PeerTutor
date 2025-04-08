import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import FAQ from './components/pages/FAQ'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup'element={<Signup />}/>
        <Route path='/faq'element={<FAQ />}/>
      </Routes>
    </Router>
  )
}

export default App