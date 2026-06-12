'use client'

import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import BentoGridDemo from '@/components/patterns/bento-grid-demo'
import MinimalistDemo from '@/components/patterns/minimalist-demo'
import GlassmorphismDemo from '@/components/patterns/glassmorphism-demo'
import DarkEditorialDemo from '@/components/patterns/dark-editorial-demo'

const patterns = [
  {
    id: 'bento',
    title: 'Bento Grid',
    description: 'Ideal para dashboards e painéis com múltiplas métricas. Organiza informações em blocos de tamanhos variados, criando hierarquia visual natural.',
    component: BentoGridDemo,
  },
  {
    id: 'minimalist',
    title: 'Minimalista',
    description: 'Perfeito para formulários e ferramentas de foco único. Menos distrações, mais conversão. Use quando a clareza é prioridade.',
    component: MinimalistDemo,
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorfismo',
    description: 'Elegante e moderno, com efeitos de vidro e transparência. Ótimo para apresentar ferramentas com apelo visual sofisticado.',
    component: GlassmorphismDemo,
  },
  {
    id: 'dark-editorial',
    title: 'Editorial Escuro',
    description: 'Estilo revista com tipografia forte e layouts dramáticos. Ideal para conteúdo longo e narrativas visuais impactantes.',
    component: DarkEditorialDemo,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function PatternShowcase() {
  return (
    <section
      id="patterns"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Palette className="size-3.5" />
            Padrões Visuais
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            4 Padrões Visuais para{' '}
            <span className="relative inline-block">
              Seu Projeto
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-lime/60 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Padrões visuais são estruturas de layout prontas que dão personalidade ao seu projeto.
            Escolher o padrão certo antes de pedir à IA faz toda a diferença no resultado final.
          </p>
        </motion.div>

        {/* Pattern cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {patterns.map((pattern) => {
            const PatternComponent = pattern.component
            return (
              <motion.div
                key={pattern.id}
                variants={cardVariants}
                className="pattern-card group rounded-xl border border-white/6 bg-surface/80 overflow-hidden hover:border-lime/20"
              >
                {/* Pattern demo area */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-card-bg/50 p-4">
                  <PatternComponent />
                </div>

                {/* Pattern info */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-lime transition-colors">
                    {pattern.title}
                  </h3>
                  <p className="text-sm text-muted-lavender leading-relaxed">
                    {pattern.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
