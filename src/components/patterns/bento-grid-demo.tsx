'use client'

import { motion } from 'framer-motion'

export default function BentoGridDemo() {
  return (
    <div className="w-full h-full p-3">
      <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-2">
        {/* Large stat card - spans 2 cols */}
        <motion.div
          className="col-span-2 row-span-1 rounded-lg bg-gradient-to-br from-lime/15 to-lime/5 border border-lime/15 p-3 flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[9px] uppercase tracking-wider text-lime/70 font-medium">Usuários Ativos</div>
          <div className="text-2xl font-bold text-foreground">2.847</div>
          <div className="flex gap-1 items-end h-8">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-lime/30"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Notification card */}
        <motion.div
          className="col-span-1 row-span-2 rounded-lg bg-coral/8 border border-coral/12 p-3 flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[9px] uppercase tracking-wider text-coral/70 font-medium">Alertas</div>
          <div className="space-y-2">
            {['Novo pedido', 'Estoque baixo', 'Aprovado'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-coral' : 'bg-lime'}`} />
                <span className="text-[9px] text-foreground/70">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-muted-lavender">3 pendentes</div>
        </motion.div>

        {/* Progress card */}
        <motion.div
          className="col-span-1 row-span-1 rounded-lg bg-white/[0.04] border border-white/8 p-3 flex flex-col justify-center gap-1.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[9px] uppercase tracking-wider text-muted-lavender/70 font-medium">Progresso</div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-lime"
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <div className="text-[9px] text-lime">72%</div>
        </motion.div>

        {/* Team avatars */}
        <motion.div
          className="col-span-1 row-span-1 rounded-lg bg-white/[0.04] border border-white/8 p-3 flex flex-col justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[9px] uppercase tracking-wider text-muted-lavender/70 font-medium">Equipe</div>
          <div className="flex -space-x-1.5">
            {['bg-lime/30', 'bg-coral/30', 'bg-purple-400/30', 'bg-cyan-400/30', 'bg-amber-400/30'].map((c, i) => (
              <div key={i} className={`w-5 h-5 rounded-full ${c} border border-background`} />
            ))}
          </div>
        </motion.div>

        {/* Calendar mini */}
        <motion.div
          className="col-span-2 row-span-1 rounded-lg bg-white/[0.04] border border-white/8 p-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[9px] uppercase tracking-wider text-muted-lavender/70 font-medium mb-2">Mar 2025</div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className={`w-full aspect-square rounded-sm text-[7px] flex items-center justify-center ${
                  i === 8
                    ? 'bg-lime text-navy font-bold'
                    : i === 5 || i === 11
                    ? 'bg-coral/15 text-coral'
                    : 'text-muted-lavender/50'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Status card */}
        <motion.div
          className="col-span-2 row-span-1 rounded-lg bg-gradient-to-r from-lime/8 to-coral/8 border border-white/6 p-3 flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <div>
            <div className="text-[9px] text-foreground/80 font-medium">Sistema operacional</div>
            <div className="text-[8px] text-muted-lavender">Última verificação: agora</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
