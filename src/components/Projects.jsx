import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiGithub, FiExternalLink, FiLock } from "react-icons/fi"
import defaultProjects from "../data/projects.json"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter]     = useState("All")

  // LocalStorage se load karo
  useEffect(() => {
    const stored = localStorage.getItem('portfolio_projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    } else {
      setProjects(defaultProjects)
      localStorage.setItem('portfolio_projects',
        JSON.stringify(defaultProjects))
    }
  }, [])

  const categories = ["All", ...new Set(projects.map(p => p.category))]
  const filtered   = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" style={{ background: 'var(--bg)' }}
      className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4"
            style={{ color: 'var(--text)' }}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500
                          to-purple-600 mx-auto rounded-full mb-6" />

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium
                           transition-all duration-300
                           ${filter === cat
                             ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                             : 'border border-gray-700 hover:border-cyan-500/50'}`}
                style={{ color: filter === cat ? 'white' : 'var(--muted)' }}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
              className="card-3d relative p-6 rounded-2xl
                         transition-all duration-300 overflow-hidden"
              style={{ background: 'var(--card)',
                       border: '1px solid var(--border)' }}>

              {/* Top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1
                              bg-gradient-to-r ${project.color}`} />

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-3xl">{project.emoji}</span>
                  <h3 className="text-lg font-bold mt-2"
                    style={{ color: 'var(--text)' }}>
                    {project.title}
                  </h3>
                </div>
                {project.accuracy && (
                  <div className="text-right">
                    <div className="text-cyan-400 font-black text-xl">
                      {project.accuracy}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>
                      Accuracy
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--muted)' }}>
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t}
                    className="px-2 py-1 rounded-md text-xs border"
                    style={{ background: 'var(--bg)',
                             color: 'var(--muted)',
                             borderColor: 'var(--border)' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-cyan-400 border
                                 border-cyan-500/30 px-2 py-1 rounded-full">
                  {project.category}
                </span>
                <div className="flex gap-3">
                  {project.github ? (
                    <a href={project.github} target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400
                                 transition-colors">
                      <FiGithub size={18} />
                    </a>
                  ) : (
                    <span className="text-gray-600" title="Private">
                      <FiLock size={18} />
                    </span>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400
                                 transition-colors">
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects