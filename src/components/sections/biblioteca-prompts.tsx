'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  Table2,
  ClipboardList,
  Calculator,
  FileText,
  BarChart3,
  FileSearch,
  ScanSearch,
  ListChecks,
  Map,
  Shield,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import promptsData from '@/content/prompts.json'
import type { PromptItem } from '@/content/types'

/* ─── Types ─── */
type Category = 'Visualização' | 'Formulários' | 'Calculadoras' | 'Documentos'

interface PromptData {
  id: string
  title: string
  category: Category
  difficulty: number
  caso: string
  prompt: string
  icon: React.ElementType
}

/* ─── Category mapping (JSON → internal short names) ─── */
const categoryMap: Record<PromptItem['categoria'], Category> = {
  'Visualização de Tabelas': 'Visualização',
  'Formulários/Cadastro': 'Formulários',
  'Calculadoras/Lógica': 'Calculadoras',
  'Documentos/Padronização': 'Documentos',
}

/* ─── Icon mapping by prompt id ─── */
const iconMap: Record<string, React.ElementType> = {
  'tabela-grande': Table2,
  'formulario-cadastro': ClipboardList,
  'calculadora-prazos': Calculator,
  'painel-indicadores': BarChart3,
  'controle-tramitacao': FileSearch,
  'faxina-planilha': ScanSearch,
  'registro-portaria': ClipboardList,
  'gerador-relatorio': FileText,
  'agenda-reunioes': ClipboardList,
  'consulta-processos': ScanSearch,
  'checklist-conformidade': ListChecks,
  'mapa-cursos': Map,
  'ferramenta-100-google': Shield,
  'painel-acessos-lgpd': ShieldCheck,
  'acompanhamento-metas': BarChart3,
}

/* ─── Build prompts from JSON ─── */
const prompts: PromptData[] = (promptsData as PromptItem[]).map((item) => ({
  id: item.id,
  title: item.titulo,
  category: categoryMap[item.categoria],
  difficulty: item.nivel,
  caso: item.casoDeUso,
  prompt: item.prompt,
  icon: iconMap[item.id] ?? BookOpen,
}))

/* ─── Category Colors ─── */
const categoryColors: Record<Category, { bg: string; text: string; border: string; iconBg: string }> = {
  Visualização: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/15 text-sky-400',
  },
  Formulários: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/15 text-violet-400',
  },
  Calculadoras: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  Documentos: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
}

/* ─── Filter Categories ─── */
const filterCategories = [
  { key: 'Todos', label: 'Todos' },
  { key: 'Formulários', label: 'Formulários/Cadastro' },
  { key: 'Visualização', label: 'Visualização de Tabelas' },
  { key: 'Calculadoras', label: 'Calculadoras/Lógica' },
  { key: 'Documentos', label: 'Documentos/Padronização' },
] as const

/* ─── Difficulty Stars ─── */
function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="text-xs tracking-wide" aria-label={`Dificuldade ${level} de 3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={i < level ? 'text-amber-400' : 'text-white/15'}>
          {i < level ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

/* ─── Main Component ─── */
export default function BibliotecaPrompts() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts =
    activeFilter === 'Todos'
      ? prompts
      : prompts.filter((p) => p.category === activeFilter)

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedId(id)
    toast.success('Prompt copiado!', {
      description: 'Cole no ChatGPT, Gemini ou outra IA.',
    })
    setTimeout(() => setCopiedId(null), 2500)
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="biblioteca" className="relative py-20 sm:py-28">
      {/* Decorative glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-lime/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <BookOpen className="size-3.5" />
            Pronto para Usar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Biblioteca de{' '}
            <span className="text-lime">Prompts</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Prompts completos e testados para situações reais da UEMS
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveFilter(cat.key)
                  setExpandedId(null)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-lime text-navy border-lime shadow-lg shadow-lime/20'
                    : 'bg-white/[0.04] text-muted-lavender border-white/8 hover:bg-white/[0.08] hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt, i) => {
              const colors = categoryColors[prompt.category]
              const isExpanded = expandedId === prompt.id
              const Icon = prompt.icon

              return (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card
                    className={`h-full bg-surface/80 border-white/6 hover:border-lime/20 transition-all duration-300 group ${
                      isExpanded ? 'sm:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <CardContent className="p-5 sm:p-6">
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`}>
                            <Icon className="size-4.5" />
                          </div>
                          <Badge
                            className={`${colors.bg} ${colors.text} border ${colors.border} text-[10px] font-medium px-2 py-0.5`}
                          >
                            {prompt.category}
                          </Badge>
                        </div>
                        <DifficultyStars level={prompt.difficulty} />
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors text-sm leading-snug mb-2">
                        {prompt.title}
                      </h3>

                      {/* Use case */}
                      <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                        {prompt.caso}
                      </p>

                      {/* Expand toggle */}
                      <button
                        onClick={() => toggleExpand(prompt.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-lime/80 hover:text-lime transition-colors cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="size-3.5" />
                        </motion.div>
                        {isExpanded ? 'Fechar prompt' : 'Ver prompt completo'}
                      </button>

                      {/* Expandable prompt area */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 rounded-lg border border-white/8 bg-[hsl(240,6%,6%)] p-4 relative">
                              {/* Copy button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(prompt.prompt, prompt.id)}
                                className={`absolute top-2 right-2 h-7 gap-1.5 text-xs font-medium transition-all z-10 ${
                                  copiedId === prompt.id
                                    ? 'text-lime bg-lime/10 hover:bg-lime/15'
                                    : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                                }`}
                              >
                                {copiedId === prompt.id ? (
                                  <>
                                    <Check className="size-3" />
                                    Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" />
                                    Copiar
                                  </>
                                )}
                              </Button>

                              <pre className="text-xs leading-[1.7] font-mono text-foreground/80 whitespace-pre-wrap pr-16">
                                {prompt.prompt}
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom tip */}
        <motion.div
          className="mt-10 rounded-xl border border-lime/20 bg-lime/5 p-5 sm:p-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
              <BookOpen className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1.5">
                Copie, cole e adapte!
              </h3>
              <p className="text-sm text-muted-lavender leading-relaxed">
                Todos os prompts estão prontos para uso. Clique em &quot;Ver prompt completo&quot;, copie o texto
                e cole diretamente no ChatGPT, Gemini ou outra IA. Adapte os campos entre colchetes
                para a realidade do seu setor — quanto mais específico, melhor o resultado.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
