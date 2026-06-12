'use client'

import { motion } from 'framer-motion'

export default function GlassmorphismDemo() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-t-xl"
      style={{
        background: 'linear-gradient(135deg, #1a0533 0%, #0d1b2a 30%, #0a2a1b 60%, #1a1a0a 100%)',
      }}
    >
      {/* Aurora gradient blobs */}
      <div className="absolute top-2 left-4 w-20 h-20 rounded-full bg-purple-500/25 blur-xl" />
      <div className="absolute bottom-4 right-6 w-24 h-24 rounded-full bg-lime/15 blur-xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cyan-400/15 blur-lg" />

      <div className="relative w-full h-full p-4 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Main glass card */}
          <motion.div
            className="flex-1 rounded-xl p-4 space-y-3"
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime/40 to-cyan-400/40 flex items-center justify-center text-[10px] font-bold text-foreground">
                AC
              </div>
              <div>
                <div className="text-[10px] font-semibold text-foreground">Ana Castilho</div>
                <div className="text-[8px] text-white/50">Design Lead</div>
              </div>
            </div>

            {/* Music player */}
            <div className="space-y-1.5">
              <div className="text-[9px] text-white/70">♫ Noites de Neon</div>
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-lime to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-[7px] text-white/40">
                <span>2:14</span>
                <span>3:28</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <div className="h-6 flex-1 rounded-md bg-white/[0.08] flex items-center justify-center">
                <span className="text-[8px] text-white/60">Pausar</span>
              </div>
              <div className="h-6 flex-1 rounded-md bg-lime/20 flex items-center justify-center">
                <span className="text-[8px] text-lime">Favoritar</span>
              </div>
            </div>
          </motion.div>

          {/* Side glass cards */}
          <div className="flex flex-row sm:flex-col gap-2">
            {/* Notification card */}
            <motion.div
              className="rounded-lg p-2.5 w-20 sm:w-24"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[8px] text-white/70">Deploy</span>
              </div>
              <div className="text-[10px] font-semibold text-foreground">✓ Ao vivo</div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              className="rounded-lg p-2.5 w-20 sm:w-24"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-[8px] text-white/50 mb-1">Visitas</div>
              <div className="text-sm font-bold bg-gradient-to-r from-lime to-cyan-400 bg-clip-text text-transparent">
                1.2k
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
