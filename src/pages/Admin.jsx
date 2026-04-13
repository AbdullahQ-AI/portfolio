import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiEdit, FiTrash2, FiLogOut,
         FiSave, FiX, FiUser, FiCode, FiBook } from "react-icons/fi"

const ADMIN_PASSWORD = "abdullah123"

const defaultProject = {
  id: Date.now(),
  title: "", description: "", tech: [],
  accuracy: "", category: "Computer Vision",
  emoji: "🤖", github: "", demo: "",
  color: "from-cyan-500 to-blue-700"
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword]           = useState("")
  const [error, setError]                 = useState("")
  const [activeTab, setActiveTab]         = useState("projects")
  const [projects, setProjects]           = useState([])
  const [editing, setEditing]             = useState(null)
  const [showForm, setShowForm]           = useState(false)
  const [form, setForm]                   = useState(defaultProject)
  const [techInput, setTechInput]         = useState("")
  const [saved, setSaved]                 = useState(false)

  // About state
  const [about, setAbout] = useState({
    bio1: "I'm a BS Artificial Intelligence student in my 6th semester, passionate about building real-world AI solutions.",
    bio2: "I specialize in Computer Vision, NLP, and Deep Learning.",
    bio3: "Currently exploring automation, object detection, and building my portfolio.",
    stats: [
      { number: "3+", label: "AI Projects" },
      { number: "95%+", label: "Avg Accuracy" },
      { number: "6th", label: "Semester" }
    ]
  })

  // Skills state
  const [skills, setSkills] = useState({
    technical: [
      { name: "Python",           level: 90, icon: "🐍" },
      { name: "TensorFlow/Keras", level: 85, icon: "🧠" },
      { name: "Machine Learning", level: 85, icon: "📊" },
      { name: "Deep Learning",    level: 80, icon: "🔥" },
      { name: "Computer Vision",  level: 82, icon: "👁️" },
      { name: "NLP",              level: 78, icon: "💬" },
      { name: "Flask",            level: 80, icon: "🌐" },
      { name: "OpenCV",           level: 78, icon: "📷" },
      { name: "YOLOv8",           level: 80, icon: "🎯" },
      { name: "React",            level: 70, icon: "⚛️" },
    ],
    tools: ["Google Colab", "VS Code", "GitHub", "Roboflow",
            "Kaggle", "Jupyter Notebook", "Streamlit", "Postman"]
  })

  // Education state
  const [education, setEducation] = useState({
    degree:   "BS Artificial Intelligence",
    semester: "6th Semester — Currently Enrolled",
    focus:    "ML, DL, Computer Vision, NLP"
  })

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_projects')
    if (stored) setProjects(JSON.parse(stored))

    const storedAbout = localStorage.getItem('portfolio_about')
    if (storedAbout) setAbout(JSON.parse(storedAbout))

    const storedSkills = localStorage.getItem('portfolio_skills')
    if (storedSkills) setSkills(JSON.parse(storedSkills))

    const storedEdu = localStorage.getItem('portfolio_education')
    if (storedEdu) setEducation(JSON.parse(storedEdu))
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError("")
    } else {
      setError("❌ Wrong password!")
    }
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Projects CRUD
  const saveProjects = (updated) => {
    setProjects(updated)
    localStorage.setItem('portfolio_projects', JSON.stringify(updated))
    showSaved()
  }

  const handleSave = () => {
    if (!form.title || !form.description) return
    const updated = editing !== null
      ? projects.map(p => p.id === editing ? { ...form } : p)
      : [...projects, { ...form, id: Date.now() }]
    saveProjects(updated)
    setShowForm(false)
    setEditing(null)
    setForm(defaultProject)
    setTechInput("")
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?"))
      saveProjects(projects.filter(p => p.id !== id))
  }

  const handleEdit = (project) => {
    setForm(project)
    setEditing(project.id)
    setShowForm(true)
    setTechInput(project.tech.join(", "))
  }

  const handleTechChange = (val) => {
    setTechInput(val)
    setForm({ ...form, tech: val.split(",").map(t => t.trim()).filter(Boolean) })
  }

  // Save About
  const saveAbout = () => {
    localStorage.setItem('portfolio_about', JSON.stringify(about))
    showSaved()
  }

  // Save Skills
  const saveSkills = () => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills))
    showSaved()
  }

  // Save Education
  const saveEducation = () => {
    localStorage.setItem('portfolio_education', JSON.stringify(education))
    showSaved()
  }

  // Update skill level
  const updateSkillLevel = (index, level) => {
    const updated = { ...skills }
    updated.technical[index].level = parseInt(level)
    setSkills(updated)
  }

  const categories = ["Computer Vision", "NLP", "Object Detection",
                      "Machine Learning", "Automation", "Web App"]
  const colors = [
    "from-green-500 to-emerald-700",
    "from-purple-500 to-pink-700",
    "from-orange-500 to-red-700",
    "from-blue-500 to-cyan-700",
    "from-yellow-500 to-orange-700",
    "from-pink-500 to-rose-700"
  ]

  const tabs = [
    { id: "projects",   label: "Projects",   icon: <FiCode size={16} />   },
    { id: "about",      label: "About",      icon: <FiUser size={16} />   },
    { id: "skills",     label: "Skills",     icon: <FiCode size={16} />   },
    { id: "education",  label: "Education",  icon: <FiBook size={16} />   },
  ]

  // Login Page
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center
                      justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 border border-gray-800
                     rounded-2xl bg-gray-900/50">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🔐</div>
            <h1 className="text-2xl font-black text-white">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Portfolio Management</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" placeholder="Enter password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700
                         rounded-xl text-white placeholder-gray-600
                         focus:outline-none focus:border-cyan-500" />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500
                         to-purple-600 rounded-xl text-white font-bold
                         hover:scale-105 transition-all">
              Login 🚀
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">
              🛠️ Admin <span className="gradient-text">Panel</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex gap-3 items-center">
            {saved && (
              <span className="text-green-400 text-sm">✅ Saved!</span>
            )}
            <a href="/"
              className="px-4 py-2 border border-gray-700 rounded-xl
                         text-gray-400 hover:text-white text-sm
                         transition-all">
              View Site
            </a>
            <button onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2
                         border border-red-500/30 rounded-xl text-red-400
                         hover:bg-red-500/10 transition-all text-sm">
              <FiLogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4">
          {tabs.map(tab => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl
                         text-sm font-medium transition-all
                         ${activeTab === tab.id
                           ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                           : 'text-gray-400 hover:text-white border border-gray-700'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── PROJECTS TAB ── */}
        {activeTab === "projects" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Projects", value: projects.length },
                { label: "Categories", value: new Set(projects.map(p => p.category)).size },
                { label: "GitHub Links", value: projects.filter(p => p.github).length },
              ].map(stat => (
                <div key={stat.label}
                  className="p-4 border border-gray-800 rounded-xl
                             bg-gray-900/50 text-center">
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button onClick={() => {
              setForm(defaultProject)
              setEditing(null)
              setTechInput("")
              setShowForm(true)
            }}
              className="flex items-center gap-2 px-6 py-3 mb-6
                         bg-gradient-to-r from-cyan-500 to-purple-600
                         rounded-xl text-white font-semibold
                         hover:scale-105 transition-all">
              <FiPlus size={18} /> Add New Project
            </button>

            {/* Form */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 border border-cyan-500/30
                           rounded-2xl bg-gray-900/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {editing ? "✏️ Edit Project" : "➕ Add Project"}
                  </h2>
                  <button onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-white">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Emoji</label>
                    <input value={form.emoji}
                      onChange={e => setForm({ ...form, emoji: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Title *</label>
                    <input value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="Project title"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Category</label>
                    <select value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Accuracy</label>
                    <input value={form.accuracy}
                      onChange={e => setForm({ ...form, accuracy: e.target.value })}
                      placeholder="e.g. 95.5%"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">GitHub URL</label>
                    <input value={form.github}
                      onChange={e => setForm({ ...form, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Demo URL</label>
                    <input value={form.demo}
                      onChange={e => setForm({ ...form, demo: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-xs mb-2 block">Card Color</label>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map(c => (
                        <button key={c} onClick={() => setForm({ ...form, color: c })}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${c}
                                     border-2 transition-all
                                     ${form.color === c
                                       ? 'border-white scale-110'
                                       : 'border-transparent'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-xs mb-1 block">
                      Tech Stack (comma separated)
                    </label>
                    <input value={techInput}
                      onChange={e => handleTechChange(e.target.value)}
                      placeholder="Python, TensorFlow, Flask"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tech.map(t => (
                        <span key={t} className="px-2 py-1 bg-gray-700
                                                  rounded-md text-xs text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-xs mb-1 block">Description *</label>
                    <textarea value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Project description..." rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm resize-none" />
                  </div>
                </div>

                <button onClick={handleSave}
                  className="mt-4 flex items-center gap-2 px-6 py-3
                             bg-gradient-to-r from-cyan-500 to-purple-600
                             rounded-xl text-white font-semibold
                             hover:scale-105 transition-all">
                  <FiSave size={18} />
                  {editing ? "Update Project" : "Add Project"}
                </button>
              </motion.div>
            )}

            {/* Projects List */}
            <div className="flex flex-col gap-4">
              {projects.map(project => (
                <div key={project.id}
                  className="flex justify-between items-center p-4
                             border border-gray-800 rounded-xl bg-gray-900/50
                             hover:border-gray-700 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{project.emoji}</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-cyan-400 border
                                         border-cyan-500/30 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        {project.accuracy && (
                          <span className="text-xs text-gray-400">
                            {project.accuracy}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(project)}
                      className="p-2 border border-gray-700 rounded-lg
                                 text-gray-400 hover:text-cyan-400
                                 hover:border-cyan-500/50 transition-all">
                      <FiEdit size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)}
                      className="p-2 border border-gray-700 rounded-lg
                                 text-gray-400 hover:text-red-400
                                 hover:border-red-500/50 transition-all">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABOUT TAB ── */}
        {activeTab === "about" && (
          <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
            <h2 className="text-xl font-bold text-white mb-6">✏️ Edit About Section</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Bio Line 1</label>
                <textarea value={about.bio1} rows={2}
                  onChange={e => setAbout({ ...about, bio1: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm resize-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Bio Line 2</label>
                <textarea value={about.bio2} rows={2}
                  onChange={e => setAbout({ ...about, bio2: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm resize-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Bio Line 3</label>
                <textarea value={about.bio3} rows={2}
                  onChange={e => setAbout({ ...about, bio3: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm resize-none" />
              </div>

              <h3 className="text-white font-semibold mt-2">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                {about.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <input value={stat.number}
                      onChange={e => {
                        const s = [...about.stats]
                        s[i].number = e.target.value
                        setAbout({ ...about, stats: s })
                      }}
                      placeholder="Number e.g. 3+"
                      className="px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                    <input value={stat.label}
                      onChange={e => {
                        const s = [...about.stats]
                        s[i].label = e.target.value
                        setAbout({ ...about, stats: s })
                      }}
                      placeholder="Label"
                      className="px-3 py-2 bg-gray-800 border border-gray-700
                                 rounded-lg text-white focus:outline-none
                                 focus:border-cyan-500 text-sm" />
                  </div>
                ))}
              </div>

              <button onClick={saveAbout}
                className="flex items-center gap-2 px-6 py-3 w-fit
                           bg-gradient-to-r from-cyan-500 to-purple-600
                           rounded-xl text-white font-semibold
                           hover:scale-105 transition-all mt-2">
                <FiSave size={18} /> Save About
              </button>
            </div>
          </div>
        )}

        {/* ── SKILLS TAB ── */}
        {activeTab === "skills" && (
          <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
            <h2 className="text-xl font-bold text-white mb-6">⚡ Edit Skills</h2>

            <div className="flex flex-col gap-4 mb-6">
              {skills.technical.map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xl w-8">{skill.icon}</span>
                  <span className="text-gray-300 text-sm w-40">{skill.name}</span>
                  <input type="range" min="0" max="100"
                    value={skill.level}
                    onChange={e => updateSkillLevel(i, e.target.value)}
                    className="flex-1 accent-cyan-500" />
                  <span className="text-cyan-400 text-sm w-12 text-right">
                    {skill.level}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-1 block">
                Tools (comma separated)
              </label>
              <input
                value={skills.tools.join(", ")}
                onChange={e => setSkills({
                  ...skills,
                  tools: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                           rounded-lg text-white focus:outline-none
                           focus:border-cyan-500 text-sm" />
            </div>

            <button onClick={saveSkills}
              className="flex items-center gap-2 px-6 py-3 w-fit
                         bg-gradient-to-r from-cyan-500 to-purple-600
                         rounded-xl text-white font-semibold
                         hover:scale-105 transition-all">
              <FiSave size={18} /> Save Skills
            </button>
          </div>
        )}

        {/* ── EDUCATION TAB ── */}
        {activeTab === "education" && (
          <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
            <h2 className="text-xl font-bold text-white mb-6">🎓 Edit Education</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Degree</label>
                <input value={education.degree}
                  onChange={e => setEducation({ ...education, degree: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Semester / Status
                </label>
                <input value={education.semester}
                  onChange={e => setEducation({ ...education, semester: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Focus Areas</label>
                <input value={education.focus}
                  onChange={e => setEducation({ ...education, focus: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700
                             rounded-lg text-white focus:outline-none
                             focus:border-cyan-500 text-sm" />
              </div>

              <button onClick={saveEducation}
                className="flex items-center gap-2 px-6 py-3 w-fit
                           bg-gradient-to-r from-cyan-500 to-purple-600
                           rounded-xl text-white font-semibold
                           hover:scale-105 transition-all mt-2">
                <FiSave size={18} /> Save Education
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin