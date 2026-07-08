'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Database, Shield, AlertTriangle, HelpCircle, Zap, Library, Plug, ShieldCheck, Wrench, Settings } from 'lucide-react'

const sections = [
  { id: 'guide', label: 'Guia', icon: BookOpen },
  { id: 'teste5min', label: 'Teste 5min', icon: Zap },
  { id: 'tabelas', label: 'Tabelas', icon: Database },
  { id: 'padronizacao', label: 'Padrão', icon: Shield },
  { id: 'biblioteca', label: 'Biblioteca', icon: Library },
  { id: 'conectar', label: 'Conectar', icon: Plug },
  { id: 'dentro-do-google', label: 'Dentro Google', icon: ShieldCheck },
  { id: 'builder', label: 'Construtor', icon: Wrench },
  { id: 'ai-studio', label: 'AI Studio', icon: Settings },
  { id: 'socorro', label: 'Socorro', icon: AlertTriangle },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
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

  // Calculate progress line position
  const activeIndex = sections.findIndex((s) => s.id === active)
  const progressPercent = activeIndex >= 0 ? ((activeIndex + 1) / sections.length) * 100 : 0

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background progress line */}
          <div className="absolute right-[7px] top-2 bottom-2 w-[2px] bg-white/5 rounded-full" />
          {/* Active progress line */}
          <motion.div
            className="absolute right-[7px] top-2 w-[2px] bg-lime/40 rounded-full"
            animate={{ height: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {sections.map((section) => {
            const isActive = active === section.id
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="group relative flex items-center justify-end"
                aria-label={`Ir para ${section.label}`}
              >
                {/* Tooltip with icon */}
                <motion.div
                  className={`absolute right-5 mr-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 border ${
                    isActive
                      ? 'bg-lime/10 text-lime border-lime/25 opacity-100'
                      : 'bg-surface/95 text-muted-lavender opacity-0 group-hover:opacity-100 border-white/10 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="size-3" />
                  {section.label}
                </motion.div>

                {/* Dot indicator */}
                <motion.div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-lime shadow-[0_0_8px_rgba(200,255,46,0.4)]'
                      : 'w-2 h-2 bg-white/15 group-hover:bg-white/40 group-hover:w-2.5 group-hover:h-2.5'
                  }`}
                  layout
                />
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
