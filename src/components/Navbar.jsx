import { useState, useEffect } from "react"
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Contact',  href: '#contact'  },
  ]

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled
        ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-cyan-500/20'
        : 'bg-transparent'}`}>

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-bold gradient-text cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Abdullah<span className="text-cyan-400">Q</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-gray-300 hover:text-cyan-400 transition-colors
                         text-sm font-medium tracking-wide">
              {link.name}
            </button>
          ))}

          {/* Theme Toggle */}
          <button onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-cyan-500/30
                       hover:border-cyan-400 hover:bg-cyan-400/10
                       transition-all text-cyan-400">
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-cyan-400">
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-cyan-400">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md
                        border-b border-cyan-500/20 px-6 py-4">
          {navLinks.map(link => (
            <button key={link.name}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-3 text-gray-300
                         hover:text-cyan-400 transition-colors border-b
                         border-gray-800/50 text-sm">
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar