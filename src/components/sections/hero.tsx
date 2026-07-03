'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowRight, Code2, Zap, Building2, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const floatingShapes = [
  { type: 'circle', size: 80, x: '10%', y: '20%', delay: 0, duration: 8 },
  { type: 'dot', size: 12, x: '85%', y: '15%', delay: 1, duration: 6 },
  { type: 'circle', size: 50, x: '75%', y: '70%', delay: 2, duration: 10 },
  { type: 'dot', size: 8, x: '15%', y: '75%', delay: 0.5, duration: 7 },
  { type: 'dot', size: 16, x: '50%', y: '10%', delay: 1.5, duration: 9 },
  { type: 'circle', size: 30, x: '90%', y: '45%', delay: 3, duration: 8 },
  { type: 'dot', size: 10, x: '30%', y: '85%', delay: 2.5, duration: 6 },
  { type: 'circle', size: 20, x: '60%', y: '80%', delay: 1.8, duration: 11 },
]

export default function Hero() {
  const scrollToGuide = () => {
    document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollToTest = () => {
    document.getElementById('teste5min')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden bg-gradient-mesh noise-overlay"
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 255, 46, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 255, 46, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            y: [0, -20, 0],
            x: [0, shape.type === 'circle' ? 10 : 5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' ? (
            <div
              className="rounded-full border border-lime/20"
              style={{ width: shape.size, height: shape.size }}
            />
          ) : (
            <div
              className="rounded-full bg-lime/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
                <Building2 className="size-3.5" />
                Guia para Servidores UEMS
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <p className="text-sm text-muted-lavender mb-3 flex items-center gap-1.5 justify-center lg:justify-start">
                <Building2 className="size-3.5 text-lime/60" />
                Universidade Estadual de Mato Grosso do Sul
              </p>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-lime text-glow-lime">Código</span> sem
              <br />
              Código
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-lavender max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Guia Prático para Criar Ferramentas Web com IA — mesmo sem saber programar. Da aplicação ao dashboard, construa automações com Inteligência Artificial integradas ao Google Sheets.
            </motion.p>

            <motion.div
              className="flex items-center gap-2 text-sm text-muted-lavender/60 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Code2 className="size-3.5" />
              <span>Funcionalidade primeiro, visual depois</span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={scrollToGuide}
                className="bg-lime text-navy hover:bg-lime-dark font-semibold text-base px-8 h-12 rounded-lg glow-lime cursor-pointer"
              >
                Começar o Guia
                <ArrowRight className="size-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToTest}
                className="glass hover:bg-white/10 font-medium text-base px-8 h-12 rounded-lg border-white/10 text-foreground cursor-pointer"
              >
                <Zap className="size-4 mr-1 text-lime" />
                Teste em 5 Minutos
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={scrollToBuilder}
                className="hover:bg-white/5 font-medium text-base px-6 h-12 rounded-lg text-muted-lavender hover:text-lime cursor-pointer transition-colors"
              >
                <Wand2 className="size-4 mr-1.5" />
                Começar a Construir
              </Button>
            </motion.div>
          </div>

          {/* Decorative right side */}
          <motion.div
            className="flex-1 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-80 h-80">
              {/* Concentric animated rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-lime/10"
                  style={{ margin: `${ring * 28}px` }}
                  animate={{
                    rotate: ring % 2 === 0 ? 360 : -360,
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    rotate: { duration: 20 + ring * 5, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 4 + ring, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {ring === 1 && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime/60" />
                  )}
                  {ring === 2 && (
                    <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-coral/60" />
                  )}
                  {ring === 3 && (
                    <div className="absolute -bottom-1 left-1/4 w-2.5 h-2.5 rounded-full bg-lime/40" />
                  )}
                </motion.div>
              ))}

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-surface border border-white/10 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Zap className="size-8 text-lime" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.button
          className="flex flex-col items-center gap-2 text-muted-lavender cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToGuide}
        >
          <span className="text-xs tracking-wider uppercase group-hover:text-lime transition-colors">Rolar</span>
          <ChevronDown className="size-5 group-hover:text-lime transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  )
}
