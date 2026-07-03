'use client'

/**
 * AtalhosTeclado — Dialog de atalhos de teclado
 *
 * Mostra todos os atalhos disponíveis no site quando o usuário
 * pressiona a tecla "?" (ou Shift+/).
 *
 * Atalhos implementados:
 * - Ctrl+K / Cmd+K: Busca global
 * - ?: Mostra este dialog
 * - Esc: Fecha dialog/busca
 * - g u: Rola até o Guia
 * - g t: Rola até Teste 5min
 * - g b: Rola até Biblioteca
 * - g c: Rola até Construtor
 * - g f: Rola até FAQ
 * - Home: Volta ao topo
 * - End: Vai ao final
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X, Search, Home, ArrowDown, HelpCircle } from 'lucide-react'

interface Atalho {
  teclas: string[]
  descricao: string
  icone: React.ElementType
  acao?: () => void
}

const ATALHOS: Atalho[] = [
  {
    teclas: ['Ctrl', 'K'],
    descricao: 'Abrir busca global',
    icone: Search,
  },
  {
    teclas: ['?'],
    descricao: 'Mostrar esta tela de atalhos',
    icone: HelpCircle,
  },
  {
    teclas: ['g', 'u'],
    descricao: 'Ir para o Guia',
    icone: Keyboard,
  },
  {
    teclas: ['g', 't'],
    descricao: 'Ir para Teste em 5 minutos',
    icone: Keyboard,
  },
  {
    teclas: ['g', 'b'],
    descricao: 'Ir para a Biblioteca de prompts',
    icone: Keyboard,
  },
  {
    teclas: ['g', 'c'],
    descricao: 'Ir para o Construtor de prompt',
    icone: Keyboard,
  },
  {
    teclas: ['g', 'f'],
    descricao: 'Ir para o FAQ',
    icone: Keyboard,
  },
  {
    teclas: ['Home'],
    descricao: 'Voltar ao topo da página',
    icone: Home,
  },
  {
    teclas: ['End'],
    descricao: 'Ir ao final da página',
    icone: ArrowDown,
  },
  {
    teclas: ['Esc'],
    descricao: 'Fechar dialogs e buscas',
    icone: X,
  },
]

/** Mapa de seções para navegação rápida com tecla g + letra */
const SECOES_MAP: Record<string, string> = {
  u: 'guide',
  t: 'teste5min',
  b: 'biblioteca',
  c: 'builder',
  f: 'faq',
}

export default function AtalhosTeclado() {
  const [aberto, setAberto] = useState(false)
  const [esperandoG, setEsperandoG] = useState(false)

  const rolarParaSecao = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Não intercepta se estiver digitando em input/textarea
      const alvo = e.target as HTMLElement
      if (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.isContentEditable) {
        return
      }

      // Ctrl+K / Cmd+K — já tratado pelo BuscaGlobal, não interferir
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        return
      }

      // ? (Shift+/) — abre este dialog
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setAberto((prev) => !prev)
        return
      }

      // Esc — fecha
      if (e.key === 'Escape') {
        setAberto(false)
        setEsperandoG(false)
        return
      }

      // Home — topo
      if (e.key === 'Home') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      // End — final
      if (e.key === 'End') {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        return
      }

      // g + letra — navegação para seções
      if (e.key.toLowerCase() === 'g' && !esperandoG) {
        setEsperandoG(true)
        // Reset após 1.5s se nenhuma letra seguir
        setTimeout(() => setEsperandoG(false), 1500)
        return
      }

      if (esperandoG) {
        const letra = e.key.toLowerCase()
        const secaoId = SECOES_MAP[letra]
        if (secaoId) {
          e.preventDefault()
          rolarParaSecao(secaoId)
        }
        setEsperandoG(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [esperandoG, rolarParaSecao])

  return (
    <>
      {/* Botão flutuante de ajuda (canto inferior direito, discreto) */}
      <button
        onClick={() => setAberto(true)}
        className="fixed bottom-6 left-6 z-40 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lime/30 flex items-center justify-center text-muted-lavender hover:text-lime transition-all duration-200 group"
        aria-label="Mostrar atalhos de teclado (?)"
        title="Atalhos de teclado (?)"
      >
        <Keyboard className="size-4" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-lime/20 border border-lime/40 flex items-center justify-center text-[8px] font-bold text-lime opacity-0 group-hover:opacity-100 transition-opacity">
          ?
        </span>
      </button>

      {/* Dialog de atalhos */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setAberto(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="atalhos-titulo"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/8 bg-gradient-to-r from-lime/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center">
                    <Keyboard className="size-5 text-lime" />
                  </div>
                  <div>
                    <h2 id="atalhos-titulo" className="text-lg font-bold text-foreground">
                      Atalhos de Teclado
                    </h2>
                    <p className="text-xs text-muted-lavender">
                      Navegue mais rápido pelo guia
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAberto(false)}
                  className="p-1.5 rounded-lg text-muted-lavender hover:text-foreground hover:bg-white/5 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Lista de atalhos */}
              <div className="p-5 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  {ATALHOS.map((atalho, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <atalho.icone className="size-4 text-muted-lavender flex-shrink-0" />
                        <span className="text-sm text-foreground truncate">
                          {atalho.descricao}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {atalho.teclas.map((tecla, j) => (
                          <span key={j} className="flex items-center gap-1">
                            {j > 0 && (
                              <span className="text-xs text-muted-lavender/50 mx-0.5">+</span>
                            )}
                            <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-md bg-white/[0.06] border border-white/10 text-xs font-mono font-semibold text-foreground shadow-sm">
                              {tecla}
                            </kbd>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dica de uso */}
                <div className="mt-5 p-3 rounded-lg bg-lime/5 border border-lime/15">
                  <p className="text-xs text-muted-lavender leading-relaxed">
                    <strong className="text-lime">Dica:</strong> Para navegação com{' '}
                    <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono font-semibold text-foreground">
                      g
                    </kbd>
                    , pressione <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono font-semibold text-foreground">g</kbd> e
                    depois a letra da seção (ex: <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono font-semibold text-foreground">u</kbd> para Guia).
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/8 bg-white/[0.02]">
                <p className="text-xs text-muted-lavender/70 text-center">
                  Pressione{' '}
                  <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono font-semibold text-foreground">
                    Esc
                  </kbd>{' '}
                  para fechar
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
