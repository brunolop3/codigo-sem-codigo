'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Wand2,
  CheckCircle2,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { unlockAchievement } from '@/components/sections/achievement-badges'

/* ─── Onboarding Tour para primeiros visitantes ───
 * Apresenta 4 passos curtos explicando o que o usuário encontra no site.
 * Persiste no localStorage (chave `csc-tour-completed`) para não repetir.
 * Pode ser reativado via window.dispatchEvent(new Event('csc-restart-tour')).
 */

const TOUR_KEY = 'csc-tour-completed'
const TOUR_VERSION_KEY = 'csc-tour-version'
const TOUR_VERSION = '2' // bump para re-exibir o tour após mudanças importantes

interface TourStep {
  id: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  description: string
  highlight?: string
  cta?: { label: string; target: string }
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    icon: Rocket,
    iconColor: 'text-lime',
    iconBg: 'bg-lime/15',
    title: 'Bem-vindo ao Código sem Código!',
    description:
      'Este guia mostra como criar ferramentas web com IA — mesmo sem saber programar. Tudo integrado ao Google Sheets, do jeito que a UEMS precisa. Vamos fazer um tour rápido de 30 segundos?',
  },
  {
    id: 'guide',
    icon: BookOpen,
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/15',
    title: 'Comece pelo Guia',
    description:
      'O Guia passo a passo explica o fluxo completo: pedir à IA, conectar ao Sheets, publicar. Leva 15 minutos para ler e dá uma visão geral do processo todo.',
    highlight: '#guide',
    cta: { label: 'Ir para o Guia', target: '#guide' },
  },
  {
    id: 'biblioteca',
    icon: Sparkles,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/15',
    title: 'Biblioteca de Prompts prontos',
    description:
      'Mais de 15 prompts testados e categorizados por situação real (formulários, dashboards, calculadoras). Clique em "Ver prompt completo" e copie com um botão. Marque seus favoritos com a estrela.',
    highlight: '#biblioteca',
    cta: { label: 'Ver Biblioteca', target: '#biblioteca' },
  },
  {
    id: 'builder',
    icon: Wand2,
    iconColor: 'text-coral',
    iconBg: 'bg-coral/15',
    title: 'Construa seu próprio prompt',
    description:
      'No Construtor de Prompt você monta um prompt personalizado escolhendo tipo de ferramenta, recursos e estilo. O resultado é um texto pronto para colar na IA. Ideal para casos que a Biblioteca não cobre.',
    highlight: '#builder',
    cta: { label: 'Abrir Construtor', target: '#builder' },
  },
]

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  /* Verifica no mount se devemos mostrar o tour */
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const completed = localStorage.getItem(TOUR_KEY)
      const version = localStorage.getItem(TOUR_VERSION_KEY)
      // Mostra se nunca completou OU se a versão mudou
      if (!completed || version !== TOUR_VERSION) {
        // Pequeno delay para não competir com o carregamento inicial
        const t = setTimeout(() => setIsOpen(true), 1200)
        return () => clearTimeout(t)
      }
    } catch {
      // ignore
    }
  }, [])

  /* Permite reabrir o tour via evento customizado */
  useEffect(() => {
    const restart = () => {
      setStep(0)
      setIsOpen(true)
    }
    window.addEventListener('csc-restart-tour', restart)
    return () => window.removeEventListener('csc-restart-tour', restart)
  }, [])

  const complete = useCallback(() => {
    setIsOpen(false)
    try {
      localStorage.setItem(TOUR_KEY, '1')
      localStorage.setItem(TOUR_VERSION_KEY, TOUR_VERSION)
    } catch {
      // ignore
    }
    // Dispara conquista "Orientado" (tour concluído)
    unlockAchievement('tour-completed')
  }, [])

  const goNext = useCallback(() => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1)
    } else {
      complete()
    }
  }, [step, complete])

  const goPrev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1)
  }, [step])

  const goToTarget = useCallback(
    (target: string) => {
      complete()
      // Pequeno delay para o modal fechar antes do scroll
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    },
    [complete]
  )

  const current = tourSteps[step]
  const isLast = step === tourSteps.length - 1
  const Icon = current.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
        >
          {/* Backdrop com blur */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={complete}
            aria-hidden
          />

          {/* Card do tour */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-lime/30 bg-surface/95 backdrop-blur-xl shadow-2xl shadow-lime/10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
          >
            {/* Glow decorativo no topo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-lime/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={complete}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-muted-lavender hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Fechar tour"
            >
              <X className="size-4" />
            </button>

            {/* Step indicator (progress dots) */}
            <div className="absolute top-5 left-5 flex gap-1.5 z-10" aria-hidden>
              {tourSteps.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? 'w-6 bg-lime'
                      : i < step
                      ? 'w-1.5 bg-lime/50'
                      : 'w-1.5 bg-white/15'
                  }`}
                />
              ))}
            </div>

            <div className="relative pt-14 pb-6 px-6 sm:px-8">
              {/* Icon */}
              <motion.div
                key={`icon-${current.id}`}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, type: 'spring', damping: 18 }}
                className={`w-16 h-16 rounded-2xl ${current.iconBg} flex items-center justify-center mb-5 mx-auto`}
              >
                <Icon className={`size-8 ${current.iconColor}`} />
              </motion.div>

              {/* Title */}
              <motion.h3
                key={`title-${current.id}`}
                id="tour-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-xl sm:text-2xl font-bold text-center text-foreground mb-3"
              >
                {current.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                key={`desc-${current.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-sm sm:text-base text-foreground/75 text-center leading-relaxed mb-6"
              >
                {current.description}
              </motion.p>

              {/* Step counter */}
              <div className="text-center text-xs text-muted-lavender mb-5">
                Passo {step + 1} de {tourSteps.length}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goPrev}
                    className="text-muted-lavender hover:text-foreground hover:bg-white/5 cursor-pointer"
                  >
                    <ChevronLeft className="size-4 mr-1" />
                    Voltar
                  </Button>
                )}

                <div className="flex-1" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={complete}
                  className="text-muted-lavender hover:text-foreground hover:bg-white/5 cursor-pointer"
                >
                  Pular tour
                </Button>

                {current.cta && (
                  <Button
                    size="sm"
                    onClick={() => goToTarget(current.cta!.target)}
                    className="bg-coral/15 text-coral border border-coral/30 hover:bg-coral/25 hover:text-coral cursor-pointer font-medium"
                  >
                    {current.cta.label}
                    <ChevronRight className="size-4 ml-1" />
                  </Button>
                )}

                {!current.cta && (
                  <Button
                    size="sm"
                    onClick={goNext}
                    className="bg-lime text-navy hover:bg-lime-dark font-semibold cursor-pointer"
                  >
                    {isLast ? (
                      <>
                        <CheckCircle2 className="size-4 mr-1.5" />
                        Começar!
                      </>
                    ) : (
                      <>
                        Próximo
                        <ChevronRight className="size-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Decorative bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-lime/0 via-lime/60 to-lime/0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
