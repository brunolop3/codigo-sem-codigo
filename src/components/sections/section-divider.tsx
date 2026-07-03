'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'lime' | 'coral' | 'mixed'
}

export default function SectionDivider({ variant = 'mixed' }: SectionDividerProps) {
  const colors = {
    lime: { primary: 'rgba(200, 255, 46, 0.25)', secondary: 'rgba(200, 255, 46, 0.08)', dot: 'bg-lime/40', glow: 'shadow-lime/20' },
    coral: { primary: 'rgba(255, 107, 74, 0.25)', secondary: 'rgba(255, 107, 74, 0.08)', dot: 'bg-coral/40', glow: 'shadow-coral/20' },
    mixed: { primary: 'rgba(200, 255, 46, 0.2)', secondary: 'rgba(255, 107, 74, 0.1)', dot: 'bg-lime/30', glow: 'shadow-lime/20' },
  }

  const c = colors[variant]

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Main line with animated gradient */}
      <motion.div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.primary} 25%, ${c.secondary} 50%, ${c.primary} 75%, transparent 100%)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Center diamond/dot with pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <div className="relative">
          <div className={`w-2 h-2 ${c.dot} rounded-sm rotate-45`} />
          {/* Subtle glow pulse */}
          <motion.div
            className={`absolute inset-0 ${c.dot} rounded-sm rotate-45`}
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Subtle decorative side dots */}
      <motion.div
        className="absolute left-[15%] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      />
      <motion.div
        className="absolute right-[15%] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      />
    </div>
  )
}
