import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Skills = () => {
  const [skillsData, setSkillsData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_skills')
    if (stored) {
      setSkillsData(JSON.parse(stored))
    } else {
      import('../data/skills.json').then(data => setSkillsData(data.default))
    }
  }, [])

  const [eduData, setEduData] = useState({
    degree:   "BS Artificial Intelligence",
    semester: "6th Semester — Currently Enrolled",
    focus:    "ML, DL, Computer Vision, NLP"
  })

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_education')
    if (stored) setEduData(JSON.parse(stored))
  }, [])

  if (!skillsData) return null

  return (
    <section id="skills" style={{ background: 'var(--bg)' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--text)' }}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500
                          to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              Technical Skills
            </h3>
            <div className="flex flex-col gap-5">
              {skillsData.technical.map((skill, i) => (
                <motion.div key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{skill.icon}</span>
                      <span className="text-sm font-medium"
                        style={{ color: 'var(--text)' }}>
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-cyan-400 text-sm font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r
                                 from-cyan-500 to-purple-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools + Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.tools.map((tool, i) => (
                <motion.div key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="px-4 py-2 border border-gray-700 rounded-full
                             text-sm hover:border-cyan-500/50 hover:text-cyan-400
                             transition-all duration-300 cursor-default"
                  style={{ color: 'var(--muted)' }}>
                  {tool}
                </motion.div>
              ))}
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl transition-all duration-300"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
                🎓 Education
              </h3>
              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b from-cyan-500
                                to-purple-600 rounded-full" />
                <div>
                  <h4 className="font-semibold" style={{ color: 'var(--text)' }}>
                    {eduData.degree}
                  </h4>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                    {eduData.semester}
                  </p>
                  <p className="text-cyan-400 text-sm mt-1">
                    {eduData.focus}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills