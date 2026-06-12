'use client'

import { motion } from 'framer-motion'

export default function MinimalistDemo() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="w-full max-w-[220px] space-y-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Small label */}
        <motion.div
          className="text-[8px] uppercase tracking-[0.2em] text-neutral-400 font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Ferramenta de Cadastro
        </motion.div>

        {/* Main heading */}
        <motion.h3
          className="text-xl font-bold text-neutral-900 text-center leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Menos é mais.
        </motion.h3>

        {/* Separator */}
        <motion.div
          className="w-8 h-px bg-neutral-300 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />

        {/* Body text */}
        <motion.p
          className="text-[10px] text-neutral-500 text-center leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          A simplicidade é a sofisticação suprema. Cada elemento tem um propósito.
        </motion.p>

        {/* Form elements */}
        <motion.div
          className="space-y-2.5 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="h-7 w-full border border-neutral-200 rounded px-2 flex items-center">
            <span className="text-[9px] text-neutral-400">Nome completo</span>
          </div>
          <div className="h-7 w-full border border-neutral-200 rounded px-2 flex items-center">
            <span className="text-[9px] text-neutral-400">E-mail</span>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.button
          className="w-full h-7 bg-neutral-900 text-white text-[10px] font-medium rounded hover:bg-neutral-800 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enviar
        </motion.button>
      </motion.div>
    </div>
  )
}
