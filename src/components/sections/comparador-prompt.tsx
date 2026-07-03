'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightLeft, ThumbsDown, ThumbsUp, X, Check, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const badPrompt = `Cria um visualizador de tabela pra mim`

const goodPromptLines = [
  { text: 'Crie um visualizador de planilha em um único arquivo HTML com tema escuro. A ferramenta deve ter:', highlighted: false },
  { text: '', highlighted: false },
  { text: '1. Busca instantânea: um campo de busca que filtra a tabela em tempo real por qualquer coluna', highlighted: true, annotation: { title: 'Especificou cada recurso', desc: 'A IA sabe exatamente o que implementar' } },
  { text: '2. Filtros por dropdown: filtros combinados para Unidade (dropdown), Grau (dropdown) e Conceito (dropdown de 1 a 5)', highlighted: true, annotation: { title: 'Detalhou quantidades', desc: 'Sem isso, a IA decide por você (geralmente errado)' } },
  { text: '3. Paginação: exibir 25 itens por página com controles de navegação e seletor de itens por página (10, 25, 50, 100)', highlighted: true, annotation: { title: 'Detalhou quantidades', desc: 'Sem isso, a IA decide por você (geralmente errado)' } },
  { text: '4. Cabeçalho fixo: o cabeçalho da tabela deve permanecer visível ao rolar', highlighted: true, annotation: { title: 'Especificou cada recurso', desc: 'A IA sabe exatamente o que implementar' } },
  { text: '5. Ordenação: clicar em qualquer coluna ordena asc/desc', highlighted: true, annotation: { title: 'Especificou cada recurso', desc: 'A IA sabe exatamente o que implementar' } },
  { text: '', highlighted: false },
  { text: 'Os dados virão de uma planilha Google Sheets via Apps Script. Antes de gerar o código, pergunte quais são as colunas da minha planilha para que eu possa personalizar.', highlighted: true, annotation: { title: 'Mencionou Google Sheets + Pediu para a IA perguntar', desc: 'Integração inclusa + Personalização em vez de código genérico' } },
  { text: '', highlighted: false },
  { text: 'Coloque todo o código em um único arquivo HTML.', highlighted: true, annotation: { title: 'Único arquivo HTML', desc: 'Evita confusão com múltiplos arquivos' } },
]

const annotations = [
  { title: 'Especificou cada recurso', desc: 'A IA sabe exatamente o que implementar', icon: Check },
  { title: 'Detalhou quantidades', desc: 'Sem isso, a IA decide por você (geralmente errado)', icon: Check },
  { title: 'Mencionou Google Sheets', desc: 'A IA já inclui a integração', icon: Check },
  { title: 'Pediu para a IA perguntar', desc: 'Personalização em vez de código genérico', icon: Check },
  { title: 'Único arquivo HTML', desc: 'Evita confusão com múltiplos arquivos', icon: Check },
]

export default function ComparadorPrompt() {
  const [isGood, setIsGood] = useState(false)

  return (
    <section id="comparador" className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-coral/30 bg-coral/5 text-coral text-xs font-medium mb-4"
          >
            <ArrowRightLeft className="size-3.5" />
            Antes e Depois
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Veja a{' '}
            <span className="text-lime text-glow-lime">Diferença</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            O mesmo pedido, resultados completamente diferentes. Veja como melhorar seu prompt na prática.
          </p>
        </motion.div>

        {/* Toggle switch */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {/* Sliding background indicator */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg"
              animate={{
                left: isGood ? '50%' : '4px',
                width: isGood ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                backgroundColor: isGood ? 'rgba(200, 255, 46, 0.12)' : 'rgba(255, 107, 74, 0.12)',
                borderColor: isGood ? 'rgba(200, 255, 46, 0.3)' : 'rgba(255, 107, 74, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ border: '1px solid' }}
            />

            <button
              onClick={() => setIsGood(false)}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                !isGood ? 'text-coral' : 'text-muted-lavender hover:text-foreground/70'
              }`}
            >
              <ThumbsDown className="size-4" />
              <span className="hidden sm:inline">Antes</span>
              <span className="sm:hidden">Antes</span>
              <span className="text-xs opacity-70">(Prompt Ruim)</span>
            </button>

            <button
              onClick={() => setIsGood(true)}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isGood ? 'text-lime' : 'text-muted-lavender hover:text-foreground/70'
              }`}
            >
              <ThumbsUp className="size-4" />
              <span className="hidden sm:inline">Depois</span>
              <span className="sm:hidden">Depois</span>
              <span className="text-xs opacity-70">(Prompt Bom)</span>
            </button>
          </div>
        </motion.div>

        {/* Content area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main prompt display */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {!isGood ? (
                <motion.div
                  key="bad"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="code-block">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/70" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                          <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-xs text-muted-lavender ml-2 font-mono">
                          prompt-ruim.txt
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-coral/10 border border-coral/20">
                        <X className="size-3 text-coral" />
                        <span className="text-[0.65rem] font-medium text-coral uppercase tracking-wide">Ruim</span>
                      </div>
                    </div>

                    {/* Code content */}
                    <div className="p-4 sm:p-6">
                      <pre className="text-sm sm:text-[0.8rem] leading-[1.8] font-mono whitespace-pre-wrap">
                        <code>
                          <span className="text-muted-lavender/60">❌ </span>
                          <span className="text-foreground/70 line-through decoration-coral/40">{badPrompt}</span>
                        </code>
                      </pre>
                    </div>

                    {/* Issues footer */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="p-3 rounded-lg bg-coral/5 border border-coral/10">
                        <p className="text-xs text-coral font-medium mb-2">Problemas deste prompt:</p>
                        <ul className="space-y-1.5">
                          {[
                            'Vago — não especifica o que o visualizador deve ter',
                            'Sem detalhes — a IA decide tudo por você',
                            'Nenhum requisito técnico mencionado',
                            'Resultado: código genérico e provavelmente inútil',
                          ].map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-lavender">
                              <X className="size-3 text-coral mt-0.5 shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="good"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="code-block">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/70" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                          <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-xs text-muted-lavender ml-2 font-mono">
                          prompt-bom.txt
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-lime/10 border border-lime/20">
                        <Check className="size-3 text-lime" />
                        <span className="text-[0.65rem] font-medium text-lime uppercase tracking-wide">Bom</span>
                      </div>
                    </div>

                    {/* Code content with highlights */}
                    <div className="p-4 sm:p-6">
                      <pre className="text-sm sm:text-[0.8rem] leading-[1.8] font-mono whitespace-pre-wrap">
                        <code>
                          {goodPromptLines.map((line, i) => {
                            if (line.text === '') {
                              return <br key={i} />
                            }
                            if (line.highlighted) {
                              return (
                                <span key={i}>
                                  <span className="bg-lime/10 text-lime px-1 rounded border-l-2 border-lime/40">
                                    {line.text}
                                  </span>
                                  {i < goodPromptLines.length - 1 && '\n'}
                                </span>
                              )
                            }
                            return (
                              <span key={i}>
                                <span className="text-foreground/90">{line.text}</span>
                                {i < goodPromptLines.length - 1 && '\n'}
                              </span>
                            )
                          })}
                        </code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Annotation cards — side on desktop, below on mobile */}
          <motion.div
            className="w-full lg:w-72 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="size-4 text-lime" />
                <h3 className="text-sm font-semibold text-foreground">Por que funciona?</h3>
              </div>
              {annotations.map((annotation, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <Card className="bg-white/[0.03] border-white/[0.06] py-0 gap-0 overflow-hidden hover:bg-white/[0.05] transition-colors duration-200">
                    <CardContent className="p-3.5">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-lime/10 border border-lime/20">
                          <annotation.icon className="size-3.5 text-lime" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground leading-snug mb-0.5">
                            {annotation.title}
                          </p>
                          <p className="text-[0.7rem] text-muted-lavender leading-snug">
                            {annotation.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={() => setIsGood(!isGood)}
            variant="outline"
            className="gap-2 border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06] hover:text-lime"
          >
            <ArrowRightLeft className="size-4" />
            {isGood ? 'Ver Prompt Ruim' : 'Ver Prompt Bom'}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
