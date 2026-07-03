'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  X,
  Sparkles,
  BookOpen,
  Wand2,
  Bookmark,
  Copy,
  Map,
  Rocket,
  Eye,
  CheckCircle2,
  Award,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Sistema de Conquistas (Achievement Badges) ───
 * Gamificação leve para incentivar a exploração do site.
 * Conquistas são desbloqueadas por:
 *  - Visitar seções (eye)
 *  - Copiar prompts (copy)
 *  - Marcar favoritos (bookmark)
 *  - Usar o construtor (wand)
 *  - Completar o tour (rocket)
 *
 * Persiste em localStorage (chave `csc-achievements`).
 * Mostra um painel flutuante discreto + modal de detalhes.
 * Exibe toast animado quando uma nova conquista é desbloqueada.
 */

const ACHIEVEMENTS_KEY = 'csc-achievements-v1'

export interface Achievement {
  id: string
  icon: React.ElementType
  title: string
  description: string
  color: string // tailwind text color class
  bgColor: string // tailwind bg color class
  borderColor: string
  /** categoria para agrupar no modal */
  category: 'exploração' | 'ação' | 'maestria'
}

const ACHIEVEMENTS: Achievement[] = [
  // Exploração
  {
    id: 'first-visit',
    icon: Rocket,
    title: 'Primeiro Contato',
    description: 'Visitou o Código sem Código pela primeira vez.',
    color: 'text-lime',
    bgColor: 'bg-lime/15',
    borderColor: 'border-lime/30',
    category: 'exploração',
  },
  {
    id: 'tour-completed',
    icon: Map,
    title: 'Orientado',
    description: 'Concluiu o tour de boas-vindas do site.',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/15',
    borderColor: 'border-sky-500/30',
    category: 'exploração',
  },
  {
    id: 'visited-5-sections',
    icon: Eye,
    title: 'Explorador Curioso',
    description: 'Visualizou 5 seções diferentes do guia.',
    color: 'text-coral',
    bgColor: 'bg-coral/15',
    borderColor: 'border-coral/30',
    category: 'exploração',
  },
  {
    id: 'visited-all-sections',
    icon: BookOpen,
    title: 'Leitor Completo',
    description: 'Visualizou todas as 21 seções do guia. Uau!',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    category: 'exploração',
  },
  // Ação
  {
    id: 'first-copy',
    icon: Copy,
    title: 'Primeiro Prompt',
    description: 'Copiou seu primeiro prompt da biblioteca.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    category: 'ação',
  },
  {
    id: 'first-favorite',
    icon: Bookmark,
    title: 'Colecionador',
    description: 'Marcou seu primeiro prompt como favorito.',
    color: 'text-amber-300',
    bgColor: 'bg-amber-400/15',
    borderColor: 'border-amber-400/30',
    category: 'ação',
  },
  {
    id: 'first-builder',
    icon: Wand2,
    title: 'Engenheiro de Prompts',
    description: 'Usou o Construtor de Prompt para montar um prompt personalizado.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/15',
    borderColor: 'border-violet-500/30',
    category: 'ação',
  },
  // Maestria
  {
    id: 'copied-5-prompts',
    icon: Sparkles,
    title: 'Promptrador',
    description: 'Copiou 5 prompts diferentes. Já tem um arsenal!',
    color: 'text-lime',
    bgColor: 'bg-lime/15',
    borderColor: 'border-lime/30',
    category: 'maestria',
  },
  {
    id: 'favorites-3',
    icon: Trophy,
    title: 'Curador',
    description: 'Marcou 3 prompts como favoritos. Sua coleção cresce!',
    color: 'text-amber-300',
    bgColor: 'bg-amber-400/15',
    borderColor: 'border-amber-400/30',
    category: 'maestria',
  },
  {
    id: 'all-categories',
    icon: Award,
    title: 'Visão Panorâmica',
    description: 'Copiou prompts de todas as 4 categorias da biblioteca.',
    color: 'text-coral',
    bgColor: 'bg-coral/15',
    borderColor: 'border-coral/30',
    category: 'maestria',
  },
]

/* ─── Storage helpers ─── */
function loadUnlocked(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    // ignore
  }
  return new Set()
}

function saveUnlocked(set: Set<string>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(Array.from(set)))
  } catch {
    // ignore
  }
}

/* ─── Event bus simples via window events ───
 * Outros componentes disparam eventos `csc-unlock` com o id da conquista.
 * Este componente escuta e atualiza o estado.
 */
const UNLOCK_EVENT = 'csc-unlock'

export function unlockAchievement(id: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(UNLOCK_EVENT, { detail: id }))
}

/* Hook utilitário para outros componentes rastrearem visitas de seção */
const VISITED_SECTIONS_KEY = 'csc-visited-sections'

export function trackSectionVisit(sectionId: string) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(VISITED_SECTIONS_KEY)
    const visited = raw ? (JSON.parse(raw) as string[]) : []
    if (!visited.includes(sectionId)) {
      visited.push(sectionId)
      localStorage.setItem(VISITED_SECTIONS_KEY, JSON.stringify(visited))
      // Dispara conquistas baseadas em contagem
      if (visited.length >= 5) unlockAchievement('visited-5-sections')
      if (visited.length >= 21) unlockAchievement('visited-all-sections')
    }
  } catch {
    // ignore
  }
}

/* ─── Componente principal ─── */
export default function AchievementBadges() {
  // Inicializa vazio (igual no servidor e cliente) para evitar hydration mismatch.
  // Carrega do localStorage em useEffect.
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [showModal, setShowModal] = useState(false)
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement | null>(null)

  /* Carrega conquistas do localStorage após mount + garante primeira visita */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(loadUnlocked())
    // Pequeno delay para não competir com o carregamento
    const t = setTimeout(() => unlockAchievement('first-visit'), 2000)
    return () => clearTimeout(t)
  }, [])

  /* Escuta eventos de unlock */
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (!id) return
      setUnlocked((prev) => {
        if (prev.has(id)) return prev
        const next = new Set(prev)
        next.add(id)
        saveUnlocked(next)
        // Mostra toast de conquista
        const ach = ACHIEVEMENTS.find((a) => a.id === id)
        if (ach) {
          setRecentlyUnlocked(ach)
          // Auto-esconde o toast após 5s
          setTimeout(() => setRecentlyUnlocked(null), 5000)
        }
        return next
      })
    }
    window.addEventListener(UNLOCK_EVENT, handler)
    return () => window.removeEventListener(UNLOCK_EVENT, handler)
  }, [])

  const totalUnlocked = unlocked.size
  const totalAchievements = ACHIEVEMENTS.length
  const progressPct = Math.round((totalUnlocked / totalAchievements) * 100)

  /* Agrupa por categoria para o modal */
  const grouped = ACHIEVEMENTS.reduce(
    (acc, ach) => {
      if (!acc[ach.category]) acc[ach.category] = []
      acc[ach.category].push(ach)
      return acc
    },
    {} as Record<string, Achievement[]>
  )

  return (
    <>
      {/* Botão flutuante — canto inferior direito, discreto */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-3 py-2 rounded-full border border-lime/20 bg-surface/80 backdrop-blur-md hover:border-lime/40 hover:bg-surface/95 transition-all cursor-pointer shadow-lg shadow-lime/5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        aria-label={`Conquistas: ${totalUnlocked} de ${totalAchievements} desbloqueadas`}
        title="Suas conquistas"
      >
        <div className="relative">
          <Trophy className="size-5 text-amber-400" />
          {/* Badge de contagem */}
          <span className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-amber-400 text-navy text-[9px] font-bold inline-flex items-center justify-center">
            {totalUnlocked}
          </span>
        </div>
        <span className="hidden sm:inline text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">
          {progressPct}%
        </span>
      </motion.button>

      {/* Toast de nova conquista */}
      <AnimatePresence>
        {recentlyUnlocked && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 max-w-xs"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          >
            <div className={`rounded-xl border ${recentlyUnlocked.borderColor} bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden`}>
              <div className="flex items-center gap-3 p-3">
                <motion.div
                  initial={{ rotate: -30, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 12 }}
                  className={`w-11 h-11 rounded-lg ${recentlyUnlocked.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <recentlyUnlocked.icon className={`size-6 ${recentlyUnlocked.color}`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-0.5">
                    Conquista desbloqueada!
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {recentlyUnlocked.title}
                  </p>
                  <p className="text-xs text-muted-lavender line-clamp-2">
                    {recentlyUnlocked.description}
                  </p>
                </div>
                <button
                  onClick={() => setRecentlyUnlocked(null)}
                  className="text-muted-lavender hover:text-foreground transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Fechar notificação"
                >
                  <X className="size-4" />
                </button>
              </div>
              {/* Barra de progresso no rodapé do toast */}
              <motion.div
                className="h-1 bg-amber-400"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de conquistas */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievements-title"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setShowModal(false)}
              aria-hidden
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-amber-400/30 bg-surface/95 backdrop-blur-xl shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            >
              {/* Glow decorativo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-center justify-between p-5 border-b border-white/6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center">
                    <Trophy className="size-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 id="achievements-title" className="text-lg font-bold text-foreground">
                      Conquistas
                    </h2>
                    <p className="text-xs text-muted-lavender">
                      {totalUnlocked} de {totalAchievements} desbloqueadas
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-lavender hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
                  aria-label="Fechar conquistas"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Progress bar global */}
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between text-xs text-muted-lavender mb-1.5">
                  <span>Progresso total</span>
                  <span className="font-mono text-amber-400">{progressPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Lista rolável de conquistas agrupadas por categoria */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 csc-scroll">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xs uppercase tracking-wider text-muted-lavender font-semibold mb-3 flex items-center gap-2">
                      <span className="capitalize">{category}</span>
                      <span className="text-amber-400/60">
                        ({items.filter((i) => unlocked.has(i.id)).length}/{items.length})
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((ach) => {
                        const isUnlocked = unlocked.has(ach.id)
                        const Icon = ach.icon
                        return (
                          <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                              isUnlocked
                                ? `${ach.borderColor} ${ach.bgColor}`
                                : 'border-white/6 bg-white/[0.02] opacity-60'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                isUnlocked ? ach.bgColor : 'bg-white/5'
                              }`}
                            >
                              <Icon
                                className={`size-5 ${
                                  isUnlocked ? ach.color : 'text-muted-lavender/60'
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <h4 className="text-sm font-semibold text-foreground truncate">
                                  {ach.title}
                                </h4>
                                {isUnlocked && (
                                  <CheckCircle2 className="size-3.5 text-amber-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-lavender leading-relaxed">
                                {ach.description}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer com dica */}
              <div className="border-t border-white/6 p-4 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-muted-lavender">
                  <Sparkles className="size-3.5 text-amber-400/70" />
                  <span>
                    Conquistas são desbloqueadas conforme você explora o site. Continue navegando!
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Helper para integrar com biblioteca-prompts ───
 * Outros componentes podem importar estas funções para rastrear ações.
 */
export function trackPromptCopied(
  promptId: string,
  allCopiedCount: number,
  allCategoriesSeen: Set<string>
) {
  unlockAchievement('first-copy')
  if (allCopiedCount >= 5) unlockAchievement('copied-5-prompts')
  if (allCategoriesSeen.size >= 4) unlockAchievement('all-categories')
}

export function trackFavoriteAdded(totalFavorites: number) {
  unlockAchievement('first-favorite')
  if (totalFavorites >= 3) unlockAchievement('favorites-3')
}

export function trackBuilderUsed() {
  unlockAchievement('first-builder')
}
