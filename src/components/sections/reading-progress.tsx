'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-lime via-lime to-coral"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      {/* Glow effect at the edge */}
      <div
        className="absolute top-0 h-[3px] w-8"
        style={{
          left: `${progress}%`,
          background: 'linear-gradient(90deg, transparent, rgba(200, 255, 46, 0.6), transparent)',
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  )
}
