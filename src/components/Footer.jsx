import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi"

const Footer = () => {
  const links = [
    { icon: <FiGithub size={18} />,   href: "https://github.com/AbdullahQ-AI" },
    { icon: <FiLinkedin size={18} />, href: "https://linkedin.com" },
    { icon: <FiMail size={18} />,     href: "mailto:abdullahqadeer.1203@gmail.com" },
  ]

  return (
    <footer className="border-t border-gray-800/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row
                      justify-between items-center gap-4">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-lg font-bold gradient-text cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Abdullah<span className="text-cyan-400">Q</span>
        </motion.div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm flex items-center gap-1">
          Made with <FiHeart className="text-red-500" size={14} /> by
          <span className="text-cyan-400 ml-1">Abdullah Qadeer</span>
          — 2026
        </p>

        {/* Social Links */}
        <div className="flex gap-3">
          {links.map((link, i) => (
            <a key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-700 rounded-full
                         text-gray-400 hover:text-cyan-400
                         hover:border-cyan-400 transition-all duration-300">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer