'use client'

import { useState, useMemo, useEffect } from 'react'
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
  Map as MapIcon,
  Shield,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  History,
  Clock,
  X,
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
  'mapa-cursos': MapIcon,
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

/* ─── Favorites Storage ─── */
const FAV_STORAGE_KEY = 'csc-prompt-favorites'

function loadFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    // ignore
  }
  return new Set()
}

function saveFavorites(favs: Set<string>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(Array.from(favs)))
  } catch {
    // ignore
  }
}

/* ─── Recent (History) Storage ───
 * Guarda os últimos 8 prompts copiados (id + timestamp),
 * do mais recente para o mais antigo. Duplicados são movidos para o topo.
 */
const RECENT_STORAGE_KEY = 'csc-prompt-recent'
const RECENT_MAX = 8

interface RecentEntry {
  id: string
  ts: number
}

function loadRecent(): RecentEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY)
    if (raw) return JSON.parse(raw) as RecentEntry[]
  } catch {
    // ignore
  }
  return []
}

function saveRecent(entries: RecentEntry[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'agora mesmo'
  if (min < 60) return `há ${min} min`
  const hours = Math.floor(min / 60)
  if (hours < 24) return `há ${hours}h`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'ontem'
  if (days < 7) return `há ${days} dias`
  const weeks = Math.floor(days / 7)
  return `há ${weeks} sem`
}

/* ─── Main Component ─── */
export default function BibliotecaPrompts() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  // Inicializa vazio (igual no servidor e cliente) para evitar hydration mismatch.
  // Carregamos do localStorage em useEffect abaixo — badges condicionais garantem
  // que a primeira pintura seja consistente (counters só aparecem após hidratar).
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showOnlyFavs, setShowOnlyFavs] = useState(false)
  const [recent, setRecent] = useState<RecentEntry[]>([])
  const [showOnlyRecent, setShowOnlyRecent] = useState(false)

  // Carrega favoritos e recentes do localStorage após mount (uma única vez)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(loadFavorites())
    setRecent(loadRecent())
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast('Removido dos favoritos', { description: 'O prompt saiu da sua lista.' })
      } else {
        next.add(id)
        toast.success('Adicionado aos favoritos!', {
          description: 'Acesse pela aba “Favoritos” no topo da biblioteca.',
        })
      }
      saveFavorites(next)
      return next
    })
  }

  /* Adiciona um prompt ao histórico de copiados (topo da lista, sem duplicar) */
  const trackRecent = (id: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((e) => e.id !== id)
      const next = [{ id, ts: Date.now() }, ...filtered].slice(0, RECENT_MAX)
      saveRecent(next)
      return next
    })
  }

  const clearRecent = () => {
    setRecent([])
    saveRecent([])
    setShowOnlyRecent(false)
    toast('Histórico limpo')
  }

  const filteredPrompts = useMemo(() => {
    let list = prompts
    // Filtro Recent tem prioridade sobre Favoritos (são mutuamente exclusivos na UI)
    if (showOnlyRecent) {
      const recentIds = new Set(recent.map((r) => r.id))
      list = list.filter((p) => recentIds.has(p.id))
      // Ordena por timestamp descendente (mais recente primeiro)
      const orderMap = new Map(recent.map((r, i) => [r.id, i]))
      list = [...list].sort(
        (a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999)
      )
    } else if (showOnlyFavs) {
      list = list.filter((p) => favorites.has(p.id))
    }
    if (activeFilter !== 'Todos') {
      list = list.filter((p) => p.category === activeFilter)
    }
    return list
  }, [activeFilter, showOnlyFavs, showOnlyRecent, favorites, recent])

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
    trackRecent(id)
    toast.success('Prompt copiado!', {
      description: 'Salvo em “Recentes” para acesso rápido.',
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
          <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Prompts completos e testados para situações reais da UEMS
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Favorites toggle */}
          <button
            onClick={() => {
              setShowOnlyFavs((v) => !v)
              setShowOnlyRecent(false)
              setExpandedId(null)
            }}
            aria-pressed={showOnlyFavs}
            title={favorites.size === 0 ? 'Marque prompts com a estrela para salvá-los aqui' : 'Ver apenas seus prompts favoritos'}
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border inline-flex items-center gap-1.5 ${
              showOnlyFavs
                ? 'bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-md shadow-amber-400/10'
                : 'bg-white/[0.04] text-foreground/70 border-white/8 hover:bg-amber-400/10 hover:text-amber-300 hover:border-amber-400/30'
            }`}
          >
            {showOnlyFavs ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            Favoritos
            {favorites.size > 0 && (
              <span className={`ml-0.5 min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-bold inline-flex items-center justify-center ${
                showOnlyFavs ? 'bg-amber-400/30 text-amber-100' : 'bg-amber-400/20 text-amber-300'
              }`}>
                {favorites.size}
              </span>
            )}
          </button>

          {/* Recentes (History) toggle */}
          <button
            onClick={() => {
              setShowOnlyRecent((v) => !v)
              setShowOnlyFavs(false)
              setExpandedId(null)
            }}
            aria-pressed={showOnlyRecent}
            title={recent.length === 0 ? 'Copie prompts para salvá-los aqui automaticamente' : 'Ver últimos prompts copiados'}
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border inline-flex items-center gap-1.5 ${
              showOnlyRecent
                ? 'bg-sky-500/15 text-sky-300 border-sky-500/40 shadow-md shadow-sky-500/10'
                : 'bg-white/[0.04] text-foreground/70 border-white/8 hover:bg-sky-500/10 hover:text-sky-300 hover:border-sky-500/30'
            }`}
          >
            <History className="size-4" />
            Recentes
            {recent.length > 0 && (
              <span className={`ml-0.5 min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-bold inline-flex items-center justify-center ${
                showOnlyRecent ? 'bg-sky-500/30 text-sky-100' : 'bg-sky-500/20 text-sky-300'
              }`}>
                {recent.length}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" aria-hidden />

          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveFilter(cat.key)
                  setExpandedId(null)
                }}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-lime text-navy border-lime shadow-lg shadow-lime/20'
                    : 'bg-white/[0.04] text-foreground/70 border-white/8 hover:bg-white/[0.10] hover:text-foreground hover:border-white/20 hover:shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Empty state for favorites filter */}
        {showOnlyFavs && filteredPrompts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]"
          >
            <Bookmark className="size-10 text-muted-lavender/40 mx-auto mb-3" aria-hidden />
            <p className="text-foreground/80 font-medium mb-1">Nenhum favorito ainda</p>
            <p className="text-sm text-muted-lavender/70 max-w-md mx-auto">
              Clique no ícone de marca-página em qualquer prompt para salvá-lo aqui e acessá-lo rapidamente depois.
            </p>
          </motion.div>
        )}

        {/* Empty state for recent filter */}
        {showOnlyRecent && filteredPrompts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]"
          >
            <History className="size-10 text-muted-lavender/40 mx-auto mb-3" aria-hidden />
            <p className="text-foreground/80 font-medium mb-1">Nenhum recente ainda</p>
            <p className="text-sm text-muted-lavender/70 max-w-md mx-auto">
              Copie qualquer prompt (botão “Copiar”) e ele aparece aqui automaticamente. Útil para voltar a prompts que você usa com frequência.
            </p>
          </motion.div>
        )}

        {/* Recentes header bar (com botão limpar) — só aparece quando filtrando recentes */}
        {showOnlyRecent && filteredPrompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-lg bg-sky-500/5 border border-sky-500/15"
          >
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <Clock className="size-3.5 text-sky-400" />
              <span>Mostrando os {filteredPrompts.length} prompts mais recentemente copiados</span>
            </div>
            <button
              onClick={clearRecent}
              className="text-xs text-muted-lavender hover:text-coral transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Limpar histórico de recentes"
            >
              <X className="size-3" />
              Limpar
            </button>
          </motion.div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt, i) => {
              const colors = categoryColors[prompt.category]
              const isExpanded = expandedId === prompt.id
              const Icon = prompt.icon
              const recentEntry = recent.find((r) => r.id === prompt.id)

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
                    className={`h-full bg-surface/80 border-white/6 hover:border-lime/30 hover:shadow-lg hover:shadow-lime/5 transition-all duration-300 group ${
                      isExpanded ? 'sm:col-span-2 lg:col-span-1' : ''
                    } ${favorites.has(prompt.id) ? 'ring-1 ring-amber-400/20' : ''} ${
                      showOnlyRecent ? 'border-sky-500/20' : ''
                    }`}
                  >
                    <CardContent className="p-5 sm:p-6">
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`} aria-hidden>
                            <Icon className="size-5" />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <Badge
                              className={`${colors.bg} ${colors.text} border ${colors.border} text-[10px] font-medium px-2 py-0.5 w-fit`}
                            >
                              {prompt.category}
                            </Badge>
                            {showOnlyRecent && recentEntry && (
                              <span className="text-[10px] text-sky-300/80 flex items-center gap-1 font-mono">
                                <Clock className="size-2.5" />
                                {formatRelativeTime(recentEntry.ts)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <DifficultyStars level={prompt.difficulty} />
                          {/* Favorite toggle */}
                          <button
                            onClick={() => toggleFavorite(prompt.id)}
                            aria-pressed={favorites.has(prompt.id)}
                            aria-label={favorites.has(prompt.id) ? `Remover ${prompt.title} dos favoritos` : `Adicionar ${prompt.title} aos favoritos`}
                            title={favorites.has(prompt.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${
                              favorites.has(prompt.id)
                                ? 'text-amber-300 hover:bg-amber-400/15'
                                : 'text-muted-lavender/50 hover:text-amber-300 hover:bg-amber-400/10'
                            }`}
                          >
                            {favorites.has(prompt.id)
                              ? <BookmarkCheck className="size-4" />
                              : <Bookmark className="size-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors text-base leading-snug mb-2">
                        {prompt.title}
                      </h3>

                      {/* Use case */}
                      <p className="text-sm text-foreground/65 leading-relaxed mb-4">
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
                e cole diretamente no Google AI Studio, Gemini ou outra IA. Adapte os campos entre colchetes
                para a realidade do seu setor — quanto mais específico, melhor o resultado.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
