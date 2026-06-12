'use client'

import { motion } from 'framer-motion'
import { Palette, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import BentoGridDemo from '@/components/patterns/bento-grid-demo'
import MinimalistDemo from '@/components/patterns/minimalist-demo'
import GlassmorphismDemo from '@/components/patterns/glassmorphism-demo'
import DarkEditorialDemo from '@/components/patterns/dark-editorial-demo'

const patterns = [
  {
    id: 'bento',
    title: 'Bento Grid',
    description: 'Ideal para dashboards e painéis com múltiplas métricas. Organiza informações em blocos de tamanhos variados, criando hierarquia visual natural.',
    useCase: 'Painéis administrativos, métricas de performance, home de apps',
    component: BentoGridDemo,
    accent: 'lime',
    styleHint: 'estilo Bento Grid, com blocos de tamanhos variados organizando múltiplas informações em cards',
    promptSnippet: `Crie um site com layout estilo Bento Grid, com blocos de tamanhos variados organizando múltiplas informações em cards. Use um visual moderno com indicadores numéricos e barras de progresso.`,
  },
  {
    id: 'minimalist',
    title: 'Minimalista',
    description: 'Perfeito para formulários e ferramentas de foco único. Menos distrações, mais conversão. Use quando a clareza é prioridade.',
    useCase: 'Formulários de cadastro, páginas de login, landing pages',
    component: MinimalistDemo,
    accent: 'white',
    styleHint: 'minimalista, com muito espaço em branco, tipografia elegante e apenas o essencial',
    promptSnippet: `Crie um site com visual minimalista, com muito espaço em branco, tipografia elegante e apenas o essencial. Sem cores vibrantes, foco total na clareza e simplicidade.`,
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorfismo',
    description: 'Elegante e moderno, com efeitos de vidro e transparência. Ótimo para apresentar ferramentas com apelo visual sofisticado.',
    useCase: 'Portfólios, apps de música/clima, apresentações de produto',
    component: GlassmorphismDemo,
    accent: 'purple',
    styleHint: 'glassmorfismo, com efeitos de vidro fosco (backdrop-blur), transparência e gradientes coloridos no fundo',
    promptSnippet: `Crie um site com visual glassmorfismo, com efeitos de vidro fosco (backdrop-blur), transparência e gradientes coloridos no fundo. Os cards devem parecer vidro sobre um fundo com aurora boreal.`,
  },
  {
    id: 'dark-editorial',
    title: 'Editorial Escuro',
    description: 'Estilo revista com tipografia forte e layouts dramáticos. Ideal para conteúdo longo e narrativas visuais impactantes.',
    useCase: 'Blogs, artigos longos, páginas de campanha',
    component: DarkEditorialDemo,
    accent: 'coral',
    styleHint: 'editorial escuro, estilo revista com tipografia forte e dramática, fundo escuro e acentos de cor vibrante',
    promptSnippet: `Crie um site com visual editorial escuro, estilo revista com tipografia forte e dramática, fundo escuro e acentos de cor vibrante. Use títulos grandes e impactantes com citações em destaque.`,
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
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null)

  const handleUsePattern = (pattern: typeof patterns[0]) => {
    // Copy the prompt snippet to clipboard
    navigator.clipboard.writeText(pattern.promptSnippet).then(() => {
      setCopiedPattern(pattern.id)
      setTimeout(() => setCopiedPattern(null), 2500)
    }).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = pattern.promptSnippet
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopiedPattern(pattern.id)
      setTimeout(() => setCopiedPattern(null), 2500)
    })

    // Scroll to the prompt builder section
    setTimeout(() => {
      const builderEl = document.getElementById('builder')
      if (builderEl) {
        builderEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 600)
  }

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
                {/* Pattern demo area - taller for more impact */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-card-bg/50 p-4">
                  <PatternComponent />
                  {/* Hover overlay with "use this pattern" button */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleUsePattern(pattern)}
                      className="text-lime text-sm font-medium flex items-center gap-1.5 bg-surface/80 px-4 py-2 rounded-full border border-lime/20 hover:bg-lime/20 transition-colors cursor-pointer"
                    >
                      {copiedPattern === pattern.id ? (
                        <>
                          <Check className="size-3.5" />
                          Copiado! Indo para o Construtor...
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          Use este padrão no seu prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Pattern info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Color accent dot */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        pattern.accent === 'lime'
                          ? 'bg-lime'
                          : pattern.accent === 'coral'
                          ? 'bg-coral'
                          : pattern.accent === 'purple'
                          ? 'bg-purple-400'
                          : 'bg-white/40'
                      }`}
                    />
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-lime transition-colors">
                      {pattern.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                    {pattern.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.useCase.split(', ').map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-lavender border border-white/6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
