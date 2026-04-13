import { motion } from "framer-motion"
import { FiCode, FiCpu, FiTarget } from "react-icons/fi"
import { useState, useEffect } from "react"

const About = () => {
  const [about, setAbout] = useState({
    bio1: "I'm a BS Artificial Intelligence student in my 6th semester, passionate about building real-world AI solutions that make a difference.",
    bio2: "I specialize in Computer Vision, NLP, and Deep Learning. I love turning complex data into intelligent applications.",
    bio3: "Currently exploring automation, object detection, and building my portfolio of AI projects.",
    stats: [
      { number: "3+",   label: "AI Projects"  },
      { number: "95%+", label: "Avg Accuracy" },
      { number: "6th",  label: "Semester"     }
    ]
  })

  // localStorage se data load karo
  useEffect(() => {
    const stored = localStorage.getItem('portfolio_about')
    if (stored) setAbout(JSON.parse(stored))
  }, [])

  const cards = [
    { icon: <FiCpu size={24} />,    title: "AI / ML",     desc: "Building intelligent systems using Deep Learning and Machine Learning" },
    { icon: <FiCode size={24} />,   title: "Development", desc: "Full stack AI applications with Flask, React and modern tools"        },
    { icon: <FiTarget size={24} />, title: "Research",    desc: "Exploring Computer Vision, NLP and cutting edge AI research"          },
  ]

  return (
    <section id="about" style={{ background: 'var(--bg)' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--text)' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500
                          to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>

            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Hi! I'm Abdullah 👋
            </h3>

            <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {about.bio1}
            </p>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {about.bio2}
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {about.bio3}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map(stat => (
                <div key={stat.label} className="text-center p-4 rounded-xl"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="text-2xl font-black gradient-text">{stat.number}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <motion.div key={i}
                whileHover={{ scale: 1.02, x: 10 }}
                className="p-6 rounded-xl flex gap-4 transition-all duration-300"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 h-fit">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
                    {card.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About