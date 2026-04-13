import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

const Hero = () => {
  const [text, setText]     = useState('')
  const [index, setIndex]   = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState([])
  const canvasRef           = useRef(null)
  const animRef             = useRef(null)

  const titles = [
    "AI / ML Engineer",
    "Deep Learning Developer",
    "Computer Vision Engineer",
    "NLP Developer",
    "BS AI Student"
  ]

  // Typing animation
  useEffect(() => {
    let currentTitle = titles[index]
    let charIndex    = 0
    let typing       = true

    const interval = setInterval(() => {
      if (typing) {
        setText(currentTitle.slice(0, charIndex + 1))
        charIndex++
        if (charIndex === currentTitle.length) {
          typing = false
        }
      } else {
        setText(currentTitle.slice(0, charIndex - 1))
        charIndex--
        if (charIndex === 0) {
          setIndex(prev => (prev + 1) % titles.length)
          clearInterval(interval)
        }
      }
    }, 80)

    return () => clearInterval(interval)
  }, [index])

  // Spider-Man cursor trails
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY })
      setTrails(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Neural Network Canvas Animation
  useEffect(() => {
    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx     = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = Array.from({ length: 80 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.5,
      vy:  (Math.random() - 0.5) * 0.5,
      r:   Math.random() * 2 + 1,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width)  node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 150, 200, 0.8)'
        ctx.fill()
      })

      // Draw connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0, 150, 200, ${0.3 * (1 - dist / 120)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        })
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const socialLinks = [
    { icon: <FiGithub size={22} />,   href: "https://github.com/AbdullahQ-AI", label: "GitHub"   },
    { icon: <FiLinkedin size={22} />, href: "https://linkedin.com",             label: "LinkedIn" },
    { icon: <FiMail size={22} />,     href: "mailto:abdullahqadeer.1203@gmail.com", label: "Email" },
  ]

  return (
    <section className="relative min-h-screen flex items-center
                        justify-center overflow-hidden">

      {/* Neural Network Canvas */}
      <canvas ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40" />

      {/* Spider-Man Cursor Trails */}
      {trails.map((trail, i) => (
        <div key={trail.id}
          className="pointer-events-none fixed z-50 rounded-full"
          style={{
            left:            trail.x - 4,
            top:             trail.y - 4,
            width:           8 - i * 0.3,
            height:          8 - i * 0.3,
            backgroundColor: i % 3 === 0
              ? 'rgba(0,212,255,0.8)'
              : i % 3 === 1
                ? 'rgba(123,47,247,0.8)'
                : 'rgba(255,255,255,0.5)',
            opacity:         i / trails.length,
            transform:       'translate(-50%, -50%)',
            transition:      'opacity 0.3s',
          }} />
      ))}

      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72
                        bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96
                        bg-purple-500/10 rounded-full blur-3xl
                        animate-pulse delay-1000" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px,
                              transparent 1px),
                              linear-gradient(90deg,rgba(0,212,255,0.3)
                              1px,transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2
                     border border-cyan-500/30 rounded-full
                     bg-cyan-500/5 text-cyan-400 text-sm mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-4 text-white">
          Abdullah
          <span className="gradient-text"> Qadeer</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400 mb-6 h-8">
          <span className="text-cyan-400 font-semibold">{text}</span>
          <span className="animate-pulse text-cyan-400">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10
                     leading-relaxed">
          BS Artificial Intelligence student passionate about building
          intelligent systems. Specializing in Computer Vision, NLP,
          and Deep Learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => document.querySelector('#projects')
              ?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500
                       to-purple-600 rounded-full text-white font-semibold
                       hover:shadow-lg hover:shadow-cyan-500/30
                       transition-all duration-300 hover:scale-105">
            View Projects 🚀
          </button>
          <button
            onClick={() => document.querySelector('#contact')
              ?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-cyan-500/50 rounded-full
                       text-cyan-400 font-semibold hover:bg-cyan-500/10
                       transition-all duration-300 hover:scale-105">
            Contact Me 📧
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-4">
          {socialLinks.map(link => (
            <a key={link.label} href={link.href}
              target="_blank" rel="noopener noreferrer"
              className="p-3 border border-gray-700 rounded-full
                         text-gray-400 hover:text-cyan-400
                         hover:border-cyan-400 hover:bg-cyan-400/10
                         transition-all duration-300 hover:scale-110">
              {link.icon}
            </a>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform
                     -translate-x-1/2 text-gray-600 text-xs
                     flex flex-col items-center gap-2">
          <span>Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600
                          to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero