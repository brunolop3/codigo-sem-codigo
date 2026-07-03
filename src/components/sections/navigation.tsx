'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Sun, Moon, Menu, X, Printer } from 'lucide-react'
import BuscaGlobal from '@/components/sections/busca-global'

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

/** Read theme preference from localStorage (SSR-safe) */
function getInitialIsDark(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('csc-theme') !== 'light'
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(getInitialIsDark)

  const toggleTheme = () => {
    const newIsDark = !isDark
    // Add transitioning class for smooth switch
    document.documentElement.classList.add('transitioning')
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('csc-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('csc-theme', 'light')
    }
    // Remove transitioning class after animation
    setTimeout(() => document.documentElement.classList.remove('transitioning'), 350)
  }

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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav aria-label="Navegação principal" className="sticky top-0 z-50 w-full border-b border-white/6 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
              <Zap className="size-4 text-navy" />
            </div>
            <span className="text-foreground">
              Código<span className="text-lime">semCódigo</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs rounded-md border-b-2 transition-all duration-200 ${
                    isActive ? 'text-lime bg-lime/8 font-medium border-lime/50' : 'text-muted-lavender hover:text-foreground hover:bg-white/5 border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Right side: search + theme toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <BuscaGlobal />
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-lavender hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              title={isDark ? 'Modo claro' : 'Modo escuro'}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={() => window.print()}
              className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-muted-lavender hover:text-lime hover:bg-lime/5 transition-all cursor-pointer"
              aria-label="Imprimir / Salvar como PDF (atalho: p)"
              title="Imprimir / Salvar como PDF (p)"
            >
              <Printer className="size-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted-lavender hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-white/6"
            >
              <div className="py-3 space-y-0.5">
                {/* Mobile search */}
                <div className="px-3 pb-2">
                  <BuscaGlobal />
                </div>
                {links.map((link) => {
                  const id = link.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2.5 text-sm rounded-lg border-l-2 transition-all ${
                        isActive
                          ? 'text-lime bg-lime/8 font-medium border-lime/50'
                          : 'text-muted-lavender hover:text-foreground hover:bg-white/5 border-transparent'
                      }`}
                    >
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
