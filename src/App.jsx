import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Admin from "./pages/Admin"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      root.style.setProperty('--bg', '#0a0a0f')
      root.style.setProperty('--text', '#ffffff')
      root.style.setProperty('--card', 'rgba(17,17,34,0.8)')
      root.style.setProperty('--border', 'rgba(255,255,255,0.1)')
      root.style.setProperty('--muted', '#9ca3af')
    } else {
      root.classList.remove('dark')
      root.style.setProperty('--bg', '#f0f4ff')
      root.style.setProperty('--text', '#0a0a2e')
      root.style.setProperty('--card', 'rgba(255,255,255,0.9)')
      root.style.setProperty('--border', 'rgba(0,0,0,0.1)')
      root.style.setProperty('--muted', '#4a5568')
    }
  }, [darkMode])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{
            background: 'var(--bg)',
            color: 'var(--text)',
            minHeight: '100vh',
            transition: 'all 0.3s ease'
          }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Hero darkMode={darkMode} />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </div>
        } />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App