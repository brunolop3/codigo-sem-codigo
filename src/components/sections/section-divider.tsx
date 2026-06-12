'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'lime' | 'coral' | 'mixed'
}

export default function SectionDivider({ variant = 'mixed' }: SectionDividerProps) {
  const gradientMap = {
    lime: 'from-lime/20 via-lime/5 to-transparent',
    coral: 'from-coral/20 via-coral/5 to-transparent',
    mixed: 'from-lime/15 via-coral/10 to-transparent',
  }

  return (
    <div className="relative w-full py-8 overflow-hidden">
      <motion.div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${
            variant === 'coral'
              ? 'rgba(255, 107, 74, 0.2)'
              : variant === 'lime'
              ? 'rgba(200, 255, 46, 0.2)'
              : 'rgba(200, 255, 46, 0.15)'
          } 30%, ${
            variant === 'coral'
              ? 'rgba(255, 107, 74, 0.05)'
              : variant === 'lime'
              ? 'rgba(200, 255, 46, 0.05)'
              : 'rgba(255, 107, 74, 0.1)'
          } 70%, transparent 100%)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {/* Center dot */}
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
          variant === 'coral' ? 'bg-coral/30' : 'bg-lime/30'
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
    </div>
  )
}
