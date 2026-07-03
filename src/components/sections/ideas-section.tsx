'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  FileOutput,
  Search,
  BarChart3,
  ClipboardCheck,
  Play,
  ChevronDown,
  Copy,
  Check,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ideiasData from '@/content/ideias.json'
import type { IdeiaItem } from '@/content/types'

/* ─── Icon mapping by title ─── */
const iconMap: Record<string, React.ElementType> = {
  'Tramitação de Documentos': FileOutput,
  'Consulta de Situação': Search,
  'Painel de Indicadores': BarChart3,
  'Aplicação de Padronização': ClipboardCheck,
}

/* ─── Build ideas from JSON ─── */
interface Idea {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  color: 'lime' | 'coral'
  prompt: string
}

const ideas: Idea[] = (ideiasData as IdeiaItem[]).map((item) => ({
  icon: iconMap[item.titulo] ?? Rocket,
  title: item.titulo,
  subtitle: item.subtitulo,
  description: item.descricao,
  color: item.cor,
  prompt: item.prompt,
}))

export default function IdeasSection() {
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const handleCopy = async (text: string, idx: number) => {
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
    setCopied(idx)
    setTimeout(() => setCopied(null), 2500)
  }

  return (
    <section id="ideas" className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Rocket className="size-3.5" />
            Formas de Utilizar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ideias para o{' '}
            <span className="text-lime">Dia a Dia na Instituição</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Agora que você sabe como criar e integrar, onde aplicar isso? Formas práticas de revolucionar o trabalho no seu setor usando a IA para gerar os códigos, substituindo papéis e processos lentos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ideas.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full bg-surface/80 border-white/6 hover:border-lime/20 transition-all duration-300 pattern-card">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${idea.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'}`}>
                      <idea.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{idea.title}</h3>
                      <p className="text-xs text-muted-lavender">{idea.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-lavender leading-relaxed mb-4">{idea.description}</p>

                  <button
                    onClick={() => setExpandedIdea(expandedIdea === i ? null : i)}
                    className="text-sm text-lime hover:text-lime-dark transition-colors flex items-center gap-1"
                  >
                    <Play className="size-3" />
                    {expandedIdea === i ? 'Ocultar prompt' : 'Ver prompt inicial'}
                    <ChevronDown className={`size-4 transition-transform ${expandedIdea === i ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {expandedIdea === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="mt-3 code-block">
                          <div className="flex items-center justify-between px-3 py-2 border-b border-white/6 bg-white/[0.02]">
                            <span className="text-xs text-muted-lavender font-mono">prompt.txt</span>
                            <button onClick={() => handleCopy(idea.prompt, i)} className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${copied === i ? 'text-lime bg-lime/10' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'}`}>
                              {copied === i ? <Check className="size-3" /> : <Copy className="size-3" />}
                              {copied === i ? 'Copiado!' : 'Copiar'}
                            </button>
                          </div>
                          <pre className="p-3 text-xs leading-relaxed font-mono text-foreground/80 whitespace-pre-wrap max-h-52 overflow-y-auto">
                            {idea.prompt}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
