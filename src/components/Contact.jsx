import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi"
import emailjs from '@emailjs/browser'

// ⬇️ APNI EmailJS details yahan daalo
const EMAILJS_SERVICE_ID  = "service_5t3k9ko"
const EMAILJS_TEMPLATE_ID = "template_66o8kgb"
const EMAILJS_PUBLIC_KEY  = "tSUNvaMtJIpk7g-ta"

const Contact = () => {
  const formRef = useRef()
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError("Failed to send. Please email me directly!")
    } finally {
      setLoading(false)
    }
  }

  const contactLinks = [
    {
      icon:  <FiGithub size={22} />,
      label: "GitHub",
      value: "@AbdullahQ-AI",
      href:  "https://github.com/AbdullahQ-AI",
      color: "hover:border-gray-400 hover:text-gray-300"
    },
    {
      icon:  <FiLinkedin size={22} />,
      label: "LinkedIn",
      value: "Abdullah Qadeer",
      href:  "https://linkedin.com",
      color: "hover:border-blue-400 hover:text-blue-400"
    },
    {
      icon:  <FiMail size={22} />,
      label: "Email",
      value: "abdullahqadeer.1203@gmail.com",
      href:  "mailto:abdullahqadeer.1203@gmail.com",
      color: "hover:border-red-400 hover:text-red-400"
    }
  ]

  return (
    <section id="contact" style={{ background: 'var(--bg)' }}
      className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4"
            style={{ color: 'var(--text)' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500
                          to-purple-600 mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
            Open to opportunities, collaborations, and interesting projects!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4">

            <h3 className="text-xl font-bold mb-2"
              style={{ color: 'var(--text)' }}>
              Let's Connect 🤝
            </h3>

            {contactLinks.map(link => (
              <a key={link.label} href={link.href}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 border
                           rounded-xl transition-all duration-300
                           ${link.color}`}
                style={{ background: 'var(--card)',
                         borderColor: 'var(--border)',
                         color: 'var(--muted)' }}>
                <div className="p-2 rounded-lg"
                  style={{ background: 'var(--bg)' }}>
                  {link.icon}
                </div>
                <div>
                  <div className="text-xs mb-0.5"
                    style={{ color: 'var(--muted)' }}>
                    {link.label}
                  </div>
                  <div className="text-sm font-medium"
                    style={{ color: 'var(--text)' }}>
                    {link.value}
                  </div>
                </div>
              </a>
            ))}

            <div className="mt-4 p-4 border border-cyan-500/20
                            rounded-xl bg-cyan-500/5">
              <p className="text-cyan-400/80 text-sm italic">
                "Building intelligent systems that solve real problems
                — one model at a time." 🚀
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center
                           justify-center text-center p-8 border
                           border-green-500/30 rounded-2xl bg-green-500/5">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text)' }}>
                  Message Sent!
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                  Thanks! I'll get back to you soon 😊
                </p>
                <button onClick={() => setSent(false)}
                  className="text-cyan-400 text-sm hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}
                className="flex flex-col gap-4">

                <div>
                  <label className="text-sm mb-1 block"
                    style={{ color: 'var(--muted)' }}>Name</label>
                  <input type="text" name="from_name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm
                               focus:outline-none focus:border-cyan-500
                               transition-colors"
                    style={{ background: 'var(--card)',
                             border: '1px solid var(--border)',
                             color: 'var(--text)' }} />
                </div>

                <div>
                  <label className="text-sm mb-1 block"
                    style={{ color: 'var(--muted)' }}>Email</label>
                  <input type="email" name="from_email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm
                               focus:outline-none focus:border-cyan-500
                               transition-colors"
                    style={{ background: 'var(--card)',
                             border: '1px solid var(--border)',
                             color: 'var(--text)' }} />
                </div>

                <div>
                  <label className="text-sm mb-1 block"
                    style={{ color: 'var(--muted)' }}>Message</label>
                  <textarea name="message"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    required rows={5} placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-xl text-sm
                               focus:outline-none focus:border-cyan-500
                               transition-colors resize-none"
                    style={{ background: 'var(--card)',
                             border: '1px solid var(--border)',
                             color: 'var(--text)' }} />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2
                             px-6 py-3 bg-gradient-to-r from-cyan-500
                             to-purple-600 rounded-xl text-white
                             font-semibold hover:shadow-lg
                             hover:shadow-cyan-500/30 transition-all
                             duration-300 hover:scale-105
                             disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading
                    ? <span className="animate-spin">⏳</span>
                    : <><FiSend size={18} /> Send Message</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact