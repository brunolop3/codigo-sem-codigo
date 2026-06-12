'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Palette, GraduationCap, Terminal, Rocket, AlertTriangle, Shield, BookOpenText } from 'lucide-react'

const sections = [
  { id: 'guide', label: 'Guia', icon: BookOpen },
  { id: 'demo', label: 'Demo', icon: Palette },
  { id: 'dicionario', label: 'Dicionário', icon: BookOpenText },
  { id: 'levels', label: 'Níveis', icon: GraduationCap },
  { id: 'prompt', label: 'Prompt', icon: Terminal },
  { id: 'ideas', label: 'Ideias', icon: Rocket },
  { id: 'bastidores', label: 'Bastidores', icon: AlertTriangle },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'tips', label: 'Dicas', icon: AlertTriangle },
]

export default function FloatingNav() {
  const [active, setActive] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)

      // Determine which section is in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            setActive(sections[i].id)
            return
          }
        }
      }
      setActive(null)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = active === section.id
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="group relative flex items-center justify-end gap-2"
                aria-label={`Ir para ${section.label}`}
              >
                {/* Tooltip label */}
                <span
                  className={`absolute right-full mr-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-lime text-navy opacity-100'
                      : 'bg-surface text-muted-lavender opacity-0 group-hover:opacity-100 border border-white/10'
                  }`}
                >
                  {section.label}
                </span>

                {/* Dot indicator */}
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-3 h-3 bg-lime shadow-[0_0_8px_rgba(200,255,46,0.5)]'
                      : 'w-2 h-2 bg-white/20 group-hover:bg-white/40 group-hover:w-2.5 group-hover:h-2.5'
                  }`}
                />
              </button>
            )
          })}

          {/* Progress line behind dots */}
          <div className="absolute right-[5px] top-0 bottom-0 w-px bg-white/5 -z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
