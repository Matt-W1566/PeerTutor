// App.jsx
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
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
        <Route path='/PeerTutor/' element={<Home />} />
        <Route path='/PeerTutor/#/login' element={<Login />} />
        <Route path='/PeerTutor/#/signup'element={<Signup />}/>
        <Route path='/PeerTutor/#/faq'element={<FAQ />}/>
      </Routes>
    </Router>
  )
}

export default App
