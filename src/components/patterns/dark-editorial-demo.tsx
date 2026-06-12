'use client'

import { motion } from 'framer-motion'

export default function DarkEditorialDemo() {
  return (
    <div className="w-full h-full bg-[#0A0A0F] flex flex-col p-4 gap-3 overflow-hidden relative">
      {/* Accent rectangle */}
      <motion.div
        className="absolute top-3 right-3 w-12 h-8 bg-coral/20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Oversized quotation mark */}
      <motion.div
        className="absolute top-2 left-3 text-5xl font-serif text-white/[0.04] leading-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        &ldquo;
      </motion.div>

      {/* Large headline */}
      <motion.div
        className="pt-4 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="text-lg sm:text-xl font-black text-foreground leading-[1.1] tracking-tight">
          O FUTURO
          <br />
          <span className="text-lime">NÃO</span> ESPERA
        </div>
      </motion.div>

      {/* Diagonal line accent */}
      <motion.div
        className="h-px bg-gradient-to-r from-lime/40 via-white/10 to-transparent -rotate-3 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Two column layout */}
      <div className="flex-1 grid grid-cols-5 gap-3 relative z-10">
        {/* Left column - text */}
        <motion.div
          className="col-span-3 space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-1 w-full bg-white/10 rounded" />
          <div className="h-1 w-full bg-white/7 rounded" />
          <div className="h-1 w-4/5 bg-white/5 rounded" />

          {/* Pull quote */}
          <div className="mt-3 pl-2.5 border-l-2 border-lime/40">
            <p className="text-[9px] text-white/60 italic leading-relaxed">
              &ldquo;A tecnologia deve servir às pessoas, não o contrário.&rdquo;
            </p>
            <span className="text-[8px] text-lime/60 mt-1 block">— Marina Souza</span>
          </div>

          <div className="h-1 w-full bg-white/7 rounded mt-2" />
          <div className="h-1 w-3/4 bg-white/5 rounded" />
        </motion.div>

        {/* Right column - visual */}
        <motion.div
          className="col-span-2 flex flex-col gap-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-14 rounded-sm bg-coral/8 border border-coral/10 flex items-center justify-center">
            <div className="text-[8px] text-coral/50 uppercase tracking-widest font-medium">Ed. 47</div>
          </div>
          <div className="flex gap-1">
            <div className="h-1 flex-1 bg-coral/20 rounded" />
            <div className="h-1 flex-1 bg-lime/15 rounded" />
            <div className="h-1 flex-1 bg-white/5 rounded" />
          </div>
          <div className="h-1 w-full bg-white/5 rounded" />
          <div className="h-1 w-2/3 bg-white/4 rounded" />
        </motion.div>
      </div>

      {/* Bottom accent bar */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-lime/40" />
        <div className="h-px flex-1 bg-gradient-to-r from-lime/15 to-transparent" />
        <span className="text-[7px] text-white/20 font-mono">IAWEB.2025</span>
      </div>
    </div>
  )
}
