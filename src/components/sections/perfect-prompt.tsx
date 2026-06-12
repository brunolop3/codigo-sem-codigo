'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Braces, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const promptLines = [
  { text: 'Atue como um criador de sites profissional. Crie um arquivo único contendo ', placeholder: 'DESCRIÇÃO DA FERRAMENTA' },
  { text: '', type: 'blank' },
  { text: 'O que precisa ter:' },
  { text: '- ', placeholder: 'CAMPO 1', textAfter: ': ', placeholderAfter: 'DESCRIÇÃO' },
  { text: '- ', placeholder: 'CAMPO 2', textAfter: ': ', placeholderAfter: 'DESCRIÇÃO' },
  { text: '- ', placeholder: 'CAMPO 3', textAfter: ': ', placeholderAfter: 'DESCRIÇÃO' },
  { text: '', type: 'blank' },
  { text: 'Visual: ', placeholder: 'ESTILO DESEJADO - ex: moderno, minimalista, com cores de azul' },
  { text: 'Funcionamento: ', placeholder: 'O QUE DEVE ACONTECER - ex: ao clicar no botão, calcule a média' },
  { text: 'Integração: ', placeholder: 'SE PRECISAR - ex: envie os dados para o Google Sheets' },
  { text: '', type: 'blank' },
  { text: 'Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.' },
]

const fullPromptText = `Atue como um criador de sites profissional. Crie um arquivo único contendo [DESCRIÇÃO DA FERRAMENTA].

O que precisa ter:
- [CAMPO 1]: [DESCRIÇÃO]
- [CAMPO 2]: [DESCRIÇÃO]
- [CAMPO 3]: [DESCRIÇÃO]

Visual: [ESTILO DESEJADO - ex: moderno, minimalista, com cores de azul]
Funcionamento: [O QUE DEVE ACONTECER - ex: ao clicar no botão, calcule a média]
Integração: [SE PRECISAR - ex: envie os dados para o Google Sheets]

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`

function PlaceholderSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-lime font-semibold bg-lime/10 px-1 rounded">
      {children}
    </span>
  )
}

function PlaceholderCoralSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-coral font-semibold bg-coral/10 px-1 rounded">
      {children}
    </span>
  )
}

export default function PerfectPrompt() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPromptText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = fullPromptText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section
      id="prompt"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <Terminal className="size-3.5" />
            Template de Prompt
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            O Prompt{' '}
            <span className="text-lime text-glow-lime">Perfeito</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Use este template sempre que for pedir à IA para criar uma ferramenta web.
            Preencha os campos em destaque e obtenha resultados muito melhores.
          </p>
        </motion.div>

        {/* Prompt code block */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Decorative quote marks */}
          <Quote className="absolute -top-6 -left-4 size-12 text-lime/10 -rotate-12 pointer-events-none hidden sm:block" />
          <Braces className="absolute -bottom-4 -right-4 size-10 text-coral/10 rotate-12 pointer-events-none hidden sm:block" />

          <div className="code-block relative">
            {/* Code block header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-muted-lavender ml-2 font-mono">
                  prompt-template.txt
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`h-8 gap-1.5 text-xs font-medium transition-all ${
                  copied
                    ? 'text-lime bg-lime/10 hover:bg-lime/15'
                    : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copiar Prompt
                  </>
                )}
              </Button>
            </div>

            {/* Code content */}
            <div className="p-4 sm:p-6">
              <pre className="text-sm sm:text-[0.8rem] leading-[1.8] font-mono text-foreground/90 whitespace-pre-wrap">
                <code>
                  <span className="text-muted-lavender">Atue como um criador de sites profissional. Crie um arquivo único contendo </span>
                  <PlaceholderCoralSpan>[DESCRIÇÃO DA FERRAMENTA]</PlaceholderCoralSpan>
                  {'\n\n'}
                  <span className="text-foreground/90">O que precisa ter:</span>
                  {'\n'}
                  <span className="text-foreground/90">- </span>
                  <PlaceholderSpan>[CAMPO 1]</PlaceholderSpan>
                  <span className="text-foreground/90">: </span>
                  <PlaceholderCoralSpan>[DESCRIÇÃO]</PlaceholderCoralSpan>
                  {'\n'}
                  <span className="text-foreground/90">- </span>
                  <PlaceholderSpan>[CAMPO 2]</PlaceholderSpan>
                  <span className="text-foreground/90">: </span>
                  <PlaceholderCoralSpan>[DESCRIÇÃO]</PlaceholderCoralSpan>
                  {'\n'}
                  <span className="text-foreground/90">- </span>
                  <PlaceholderSpan>[CAMPO 3]</PlaceholderSpan>
                  <span className="text-foreground/90">: </span>
                  <PlaceholderCoralSpan>[DESCRIÇÃO]</PlaceholderCoralSpan>
                  {'\n\n'}
                  <span className="text-foreground/90">Visual: </span>
                  <PlaceholderCoralSpan>[ESTILO DESEJADO - ex: moderno, minimalista, com cores de azul]</PlaceholderCoralSpan>
                  {'\n'}
                  <span className="text-foreground/90">Funcionamento: </span>
                  <PlaceholderCoralSpan>[O QUE DEVE ACONTECER - ex: ao clicar no botão, calcule a média]</PlaceholderCoralSpan>
                  {'\n'}
                  <span className="text-foreground/90">Integração: </span>
                  <PlaceholderCoralSpan>[SE PRECISAR - ex: envie os dados para o Google Sheets]</PlaceholderCoralSpan>
                  {'\n\n'}
                  <span className="text-foreground/90">Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Copy button (mobile-friendly, below the code block) */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleCopy}
              size="lg"
              className={`font-semibold text-base px-8 h-12 rounded-lg transition-all ${
                copied
                  ? 'bg-lime text-navy glow-lime'
                  : 'bg-lime text-navy hover:bg-lime-dark glow-lime'
              }`}
            >
              {copied ? (
                <>
                  <Check className="size-5 mr-2" />
                  Prompt Copiado!
                </>
              ) : (
                <>
                  <Copy className="size-5 mr-2" />
                  Copiar Prompt
                </>
              )}
            </Button>
          </motion.div>

          {/* Helper tip */}
          <motion.p
            className="text-center text-xs text-muted-lavender mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Dica: Substitua os campos em <span className="text-lime">verde</span> e <span className="text-coral">laranja</span> com suas informações específicas.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
