'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollTop > 400)
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SVG circle math
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-surface/95 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-lime/30 transition-all group cursor-pointer shadow-lg"
          aria-label="Voltar ao topo"
        >
          {/* Circular progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            {/* Background track */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            {/* Progress arc */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-150 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8FF2E" />
                <stop offset="100%" stopColor="#FF6B4A" />
              </linearGradient>
            </defs>
          </svg>
          {/* Arrow icon */}
          <ArrowUp className="size-4 text-lime group-hover:text-lime group-hover:-translate-y-0.5 transition-all" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
