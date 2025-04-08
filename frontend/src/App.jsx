// App.jsx
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import FAQ from './components/pages/FAQ'
import StudentForm from './components/pages/StudentForm'
import TutorForm from './components/pages/TutorForm'
import Messages from './components/pages/Messages'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/studentForm' element={<StudentForm />} />
        <Route path='/tutorForm' element={<TutorForm />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </Router>
  )
}

export default App
