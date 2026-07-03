'use client'

/**
 * TrilhaJornada — Trilha de progresso do leitor
 *
 * Componente flutuante (lateral, desktop) / bottom sheet (mobile)
 * que mostra ao leitor onde ele está na jornada de aprendizado.
 *
 * Os checkboxes são persistidos em localStorage para que o leitor
 * não perca o progresso ao recarregar a página.
 *
 * Quando o leitor completa 100%, uma celebração sutil aparece.
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, X, Trophy, ChevronRight } from 'lucide-react'

/* ─── Etapas da jornada do leitor ─── */
const journeySteps = [
  { id: 'entendeu', label: 'Entendi os princípios', section: '#guide' },
  { id: 'testou', label: 'Testei em 5 minutos', section: '#teste5min' },
  { id: 'domou', label: 'Domei uma tabela', section: '#tabelas' },
  { id: 'padronizou', label: 'Padronizei um formulário', section: '#padronizacao' },
  { id: 'conectou', label: 'Conectei ao Sheets', section: '#conectar' },
  { id: 'publicou', label: 'Publiquei', section: '#publicar' },
]

const STORAGE_KEY = 'csc-jornada-progresso'

export default function TrilhaJornada() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    /* Carrega progresso salvo do localStorage na inicialização (lazy state) */
    if (typeof window === 'undefined') return new Set()
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: string[] = JSON.parse(saved)
        return new Set(parsed)
      }
    } catch {
      // Ignora erro de parse — recomeça do zero
    }
    return new Set()
  })
  const [isOpen, setIsOpen] = useState(false)
  const [celebrated, setCelebrated] = useState(false)
  const celebratedRef = useRef(false)

  /* Persiste progresso no localStorage e dispara celebração se completar */
  const toggleStep = (stepId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(stepId)) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // Ignora erro de escrita
      }
      // Dispara celebração se acabou de completar tudo
      if (next.size === journeySteps.length && !celebratedRef.current) {
        celebratedRef.current = true
        setCelebrated(true)
        setIsOpen(true)
        window.setTimeout(() => setIsOpen(false), 6000)
      }
      return next
    })
  }

  const progress = (completed.size / journeySteps.length) * 100
  const isComplete = completed.size === journeySteps.length

  const scrollToSection = (section: string) => {
    document.querySelector(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Botão flutuante — desktop (canto inferior esquerdo) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface/95 backdrop-blur-sm border border-white/10 hover:border-lime/30 transition-all shadow-lg group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        aria-label="Abrir trilha de progresso"
      >
        <div className="relative w-6 h-6">
          <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#C8FF2E"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-lime">
            {Math.round(progress)}%
          </span>
        </div>
        <span className="text-xs font-medium text-foreground group-hover:text-lime transition-colors">
          Sua Jornada
        </span>
      </motion.button>

      {/* Botão flutuante — mobile (canto inferior direito, acima do scroll-to-top) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-40 lg:hidden w-12 h-12 rounded-full bg-surface/95 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Abrir trilha de progresso"
      >
        <div className="relative w-7 h-7">
          <svg className="w-7 h-7 -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2.5"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#C8FF2E"
              strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-lime">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.button>

      {/* Painel da jornada — overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Painel principal */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[480px] z-50 bg-surface border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: '100%', opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className={`size-4 ${isComplete ? 'text-lime' : 'text-muted-lavender'}`} />
                    <h3 className="font-semibold text-foreground">Sua Jornada</h3>
                  </div>
                  <p className="text-xs text-muted-lavender">
                    {isComplete
                      ? 'Parabéns! Você completou a trilha 🎉'
                      : `${completed.size} de ${journeySteps.length} etapas concluídas`}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-lavender hover:text-foreground transition-colors p-1"
                  aria-label="Fechar"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Barra de progresso */}
              <div className="px-5 sm:px-6 pt-4">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-lime/60 to-lime rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-[10px] text-muted-lavender/60 mt-1.5 text-right">
                  {Math.round(progress)}% completo
                </p>
              </div>

              {/* Lista de etapas */}
              <div className="p-5 sm:p-6 space-y-1 max-h-[60vh] overflow-y-auto">
                {journeySteps.map((step, index) => {
                  const isDone = completed.has(step.id)
                  const isLast = index === journeySteps.length - 1
                  return (
                    <div key={step.id} className="relative">
                      {/* Linha conectora */}
                      {!isLast && (
                        <div
                          className={`absolute left-[15px] top-9 bottom-0 w-0.5 ${
                            isDone ? 'bg-lime/30' : 'bg-white/8'
                          }`}
                        />
                      )}
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors text-left group"
                      >
                        {/* Checkbox circular */}
                        <div className="flex-shrink-0">
                          {isDone ? (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 15 }}
                            >
                              <CheckCircle2 className="size-8 text-lime" />
                            </motion.div>
                          ) : (
                            <Circle className="size-8 text-white/20 group-hover:text-white/40 transition-colors" />
                          )}
                        </div>

                        {/* Texto */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              isDone ? 'text-lime line-through/0' : 'text-foreground'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-[11px] text-muted-lavender/60">
                            {isDone ? '✓ Concluído' : 'Clique para marcar como feito'}
                          </p>
                        </div>

                        {/* Botão ir para seção */}
                        <ChevronRight className="size-4 text-muted-lavender/40 group-hover:text-lime group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Footer com CTA para próxima etapa pendente */}
              {!isComplete && (
                <div className="px-5 sm:px-6 py-4 border-t border-white/6 bg-white/[0.01]">
                  <button
                    onClick={() => {
                      const nextStep = journeySteps.find((s) => !completed.has(s.id))
                      if (nextStep) {
                        scrollToSection(nextStep.section)
                        setIsOpen(false)
                      }
                    }}
                    className="w-full h-10 rounded-lg bg-lime/10 border border-lime/20 text-lime text-sm font-medium hover:bg-lime/20 transition-colors flex items-center justify-center gap-2"
                  >
                    Continuar de onde parei
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}

              {/* Mensagem de celebração */}
              {isComplete && (
                <motion.div
                  className="px-5 sm:px-6 py-4 border-t border-white/6 bg-lime/5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-sm text-lime text-center font-medium">
                    🎉 Você dominou o Código sem Código!
                  </p>
                  <p className="text-xs text-muted-lavender text-center mt-1">
                    Agora você tem tudo para revolucionar seu setor.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
