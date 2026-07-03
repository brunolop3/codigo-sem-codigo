'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowRight, Code2, Zap, Building2, Wand2, FileSpreadsheet, BarChart3, Table2 } from 'lucide-react'
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

/* ─── Animated code snippets that float in the hero ─── */
const codeSnippets = [
  { text: 'doGet(e)', color: 'text-lime', delay: 0.3 },
  { text: 'google.script.run', color: 'text-coral', delay: 0.6 },
  { text: 'SpreadsheetApp', color: 'text-sky-400', delay: 0.9 },
  { text: 'HtmlService', color: 'text-amber-400', delay: 1.2 },
  { text: 'ContentService', color: 'text-emerald-400', delay: 1.5 },
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
              <p className="text-sm text-foreground/70 mb-3 flex items-center gap-1.5 justify-center lg:justify-start">
                <Building2 className="size-3.5 text-lime/70" />
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
              className="text-base sm:text-lg text-foreground/75 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Guia Prático para Criar Ferramentas Web com IA — mesmo sem saber programar. Da aplicação ao dashboard, construa automações com Inteligência Artificial integradas ao Google Sheets.
            </motion.p>

            <motion.div
              className="flex items-center gap-2 text-sm text-foreground/55 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Code2 className="size-3.5 text-lime/70" />
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

          {/* Decorative right side — animated code dashboard mockup */}
          <motion.div
            className="flex-1 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-[380px]">
              {/* Main card */}
              <motion.div
                className="rounded-xl border border-white/10 bg-surface/90 backdrop-blur-sm p-5 shadow-2xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 h-6 rounded-md bg-white/[0.04] flex items-center justify-center px-2">
                    <span className="text-[10px] font-mono text-muted-lavender/50">ferramenta-uems.html</span>
                  </div>
                </div>

                {/* Mini KPI cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Cursos', value: '42', icon: FileSpreadsheet, color: 'text-lime' },
                    { label: 'Notas', value: '186', icon: BarChart3, color: 'text-coral' },
                    { label: 'Unidades', value: '10', icon: Table2, color: 'text-sky-400' },
                  ].map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      className="rounded-lg bg-white/[0.03] border border-white/6 p-2.5 text-center hover:border-white/10 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                    >
                      <kpi.icon className={`size-3.5 ${kpi.color} mx-auto mb-1`} />
                      <p className="text-sm font-bold text-foreground">{kpi.value}</p>
                      <p className="text-[10px] font-medium text-foreground/60">{kpi.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Mini table rows */}
                <div className="rounded-lg bg-white/[0.02] border border-white/6 overflow-hidden">
                  <div className="grid grid-cols-4 gap-1 px-2.5 py-1.5 bg-white/[0.03] border-b border-white/6">
                    {['Código', 'Curso', 'Grau', 'Nota'].map((h) => (
                      <span key={h} className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider">{h}</span>
                    ))}
                  </div>
                  {[
                    ['1011', 'Administração', 'Bach.', '●●●●○'],
                    ['2001', 'Direito', 'Bach.', '●●●○○'],
                    ['3002', 'Medicina', 'Bach.', '●●●●●'],
                  ].map((row, i) => (
                    <motion.div
                      key={i}
                      className="grid grid-cols-4 gap-1 px-2.5 py-1.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.15, duration: 0.3 }}
                    >
                      {row.map((cell, j) => (
                        <span key={j} className={`text-[10px] font-mono ${j === 3 ? 'text-amber-400' : 'text-foreground/75'}`}>{cell}</span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating code snippet badge */}
              <motion.div
                className="absolute -top-3 -right-3 px-3.5 py-2 rounded-lg bg-surface border border-lime/30 shadow-xl shadow-lime/10"
                animate={{ y: [0, -4, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-lime" />
                  <span className="text-xs font-mono font-semibold text-lime">Gerado com IA</span>
                </div>
              </motion.div>

              {/* Floating Apps Script badge */}
              <motion.div
                className="absolute -bottom-2 -left-4 px-3.5 py-2 rounded-lg bg-surface border border-coral/30 shadow-xl shadow-coral/10"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-1.5">
                  <Code2 className="size-3.5 text-coral" />
                  <span className="text-xs font-mono font-semibold text-coral">Apps Script</span>
                </div>
              </motion.div>

              {/* Floating Sheets badge — novo */}
              <motion.div
                className="absolute top-1/2 -right-6 px-3 py-1.5 rounded-lg bg-surface border border-sky-400/30 shadow-lg"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <FileSpreadsheet className="size-3 text-sky-400" />
                  <span className="text-[11px] font-mono font-medium text-sky-400">Sheets</span>
                </div>
              </motion.div>
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
