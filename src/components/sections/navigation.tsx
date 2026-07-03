'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'
import BuscaGlobal from '@/components/sections/busca-global'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const links = [
    { href: '#guide', label: 'Guia' },
    { href: '#teste5min', label: 'Teste 5min' },
    { href: '#tabelas', label: 'Tabelas' },
    { href: '#padronizacao', label: 'Padrão' },
    { href: '#biblioteca', label: 'Biblioteca' },
    { href: '#conectar', label: 'Conectar' },
    { href: '#dentro-do-google', label: 'Dentro Google' },
    { href: '#builder', label: 'Construtor' },
    { href: '#socorro', label: 'Socorro' },
    { href: '#faq', label: 'FAQ' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = links.map((l) => l.href.replace('#', ''))
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sectionIds[i])
            return
          }
        }
      }
      setActiveSection(null)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav aria-label="Navegação principal" className="sticky top-0 z-50 w-full border-b border-white/6 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
              <Zap className="size-4 text-navy" />
            </div>
            <span className="text-foreground">
              Código<span className="text-lime">semCódigo</span>
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-all duration-200 ${
                    isActive ? 'text-lime bg-lime/10 font-medium' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <div className="ml-2 border-l border-white/8 pl-2">
              <BuscaGlobal />
            </div>
          </div>
          <button className="lg:hidden p-2 text-muted-lavender hover:text-foreground" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav-menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={open ? 'M5 5L15 15M15 5L5 15' : 'M3 6H17M3 10H17M3 14H17'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="lg:hidden">
            <BuscaGlobal />
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div id="mobile-nav-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden border-t border-white/6">
              <div className="py-3 space-y-1">
                {links.map((link) => {
                  const id = link.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm rounded-md transition-all ${isActive ? 'text-lime bg-lime/10 font-medium' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'}`}>
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
