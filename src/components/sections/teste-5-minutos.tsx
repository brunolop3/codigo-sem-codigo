'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Copy,
  Check,
  ClipboardPaste,
  FileCode2,
  Globe,
  ChevronRight,
  Timer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const promptText = `Crie uma Calculadora de Prazos Administrativos em um único arquivo HTML com tema escuro. Essa ferramenta é para servidores da UEMS (Universidade Estadual de Mato Grosso do Sul).

Requisitos:

1. Campo de seleção do tipo de processo, com os seguintes tipos e prazos:
   - Resolução CONSU: 60 dias corridos
   - Portaria: 30 dias corridos
   - Memorando: 15 dias úteis
   - Ofício: 30 dias corridos
   - Requerimento: 45 dias corridos
   - Processo Licitatório: 60 dias úteis

2. Campo para informar a data de início (date picker).

3. Ao clicar em "Calcular Prazo", a ferramenta deve:
   - Calcular a data limite considerando se o prazo é em dias corridos ou úteis
   - Para dias úteis: não contar sábados e domingos (simplificado, sem feriados)
   - Mostrar a data limite formatada (dd/mm/aaaa)
   - Mostrar quantos dias restam a partir de hoje
   - Indicar com cor diferente se o prazo já expirou (vermelho), está próximo (laranja, <=5 dias) ou está dentro do prazo (verde)

4. Mostrar uma timeline visual horizontal:
   - Marcador da data de início (à esquerda)
   - Marcador de "hoje" (se estiver dentro do prazo)
   - Marcador da data limite (à direita)
   - Barra colorida entre os marcadores conforme o status

5. Design:
   - Tema escuro com fundo #0A0A0F, cards #12121A, texto claro
   - Cor de destaque #C8FF2E (verde-limão)
   - Responsivo (funciona no celular)
   - Interface limpa, sem complicação, para quem não é de TI

6. Tudo em um único arquivo HTML (CSS + JS embutidos). Não use frameworks externos, apenas HTML, CSS e JavaScript puro.`

const steps = [
  {
    number: 1,
    title: 'Copie o prompt',
    description: 'Clique no botão de copiar abaixo',
    icon: Copy,
  },
  {
    number: 2,
    title: 'Cole na IA',
    description: 'No Google AI Studio, Gemini ou Claude',
    icon: ClipboardPaste,
  },
  {
    number: 3,
    title: 'Salve como .html',
    description: 'Copie o código e salve no computador',
    icon: FileCode2,
  },
  {
    number: 4,
    title: 'Abra no navegador',
    description: 'Clique duas vezes no arquivo — pronto!',
    icon: Globe,
  },
]

export default function Teste5Minutos() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText)
      setCopied(true)
      toast.success('Prompt copiado!', {
        description: 'Agora cole na IA e veja a mágica acontecer.',
      })
      setTimeout(() => setCopied(false), 3000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = promptText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      toast.success('Prompt copiado!', {
        description: 'Agora cole na IA e veja a mágica acontecer.',
      })
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <section
      id="teste5min"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-lime/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-5 w-60 h-60 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Rocket className="size-3.5" />
            Vitória Rápida
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Teste em{' '}
            <span className="text-lime text-glow-lime">5 Minutos</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Antes de qualquer teoria, você vai criar uma ferramenta real agora mesmo.
            Um prompt, uma ferramenta funcional — sem instalar nada, sem configurar nada.
          </p>
        </motion.div>

        {/* Timer visual */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface/80 border border-white/6"
              animate={{ borderColor: ['rgba(255,255,255,0.06)', 'rgba(200,255,46,0.25)', 'rgba(255,255,255,0.06)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Timer className="size-5 text-lime" />
              <span className="font-mono text-xl font-bold tracking-widest text-foreground">
                5:00
              </span>
              <span className="text-xs text-muted-lavender">min</span>
            </motion.div>
            {/* Subtle pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-lime/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Desktop: horizontal, Mobile: vertical */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex flex-col md:flex-row items-center">
                  {/* Step card */}
                  <motion.div
                    className="flex md:flex-col items-center gap-3 md:gap-2 text-center w-full md:w-40"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {/* Number circle */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-lime/10 border border-lime/25 flex items-center justify-center">
                        <span className="text-lime font-bold text-sm">{step.number}</span>
                      </div>
                    </div>
                    {/* Icon + text */}
                    <div className="flex md:flex-col items-center gap-2 md:gap-1.5">
                      <Icon className="size-4 text-lime/70 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-lavender leading-snug">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <>
                      {/* Desktop: horizontal arrow */}
                      <motion.div
                        className="hidden md:flex items-center px-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.05 }}
                      >
                        <ChevronRight className="size-5 text-lime/30" />
                      </motion.div>
                      {/* Mobile: vertical line */}
                      <motion.div
                        className="md:hidden flex justify-center py-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.05 }}
                      >
                        <div className="w-px h-4 bg-lime/20" />
                      </motion.div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Prompt code block */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Card className="bg-surface/80 border-white/6 overflow-hidden">
            <CardContent className="p-0">
              {/* Code block header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-2 text-[10px] font-mono bg-lime/10 text-lime border-lime/20"
                  >
                    calculadora-prazos
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className={`h-8 gap-1.5 text-xs font-medium transition-all cursor-pointer ${
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

              {/* Prompt content */}
              <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                <pre className="text-sm sm:text-[0.8rem] leading-[1.8] font-mono text-foreground/90 whitespace-pre-wrap">
                  <code>{promptText}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Copy CTA + Share buttons */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleCopy}
            size="lg"
            className={`font-semibold text-base px-8 h-12 rounded-lg transition-all cursor-pointer ${
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
                Copiar Prompt Completo
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const text = encodeURIComponent('🚀 Acabei de descobrir o Código sem Código! Um guia para criar ferramentas web com IA sem saber programar. Confira: ' + window.location.href)
              window.open(`https://wa.me/?text=${text}`, '_blank')
            }}
            className="font-medium text-base px-6 h-12 rounded-lg border-white/10 text-foreground hover:bg-green-500/10 hover:border-green-500/20 hover:text-green-400 cursor-pointer transition-all"
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Compartilhar
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
          Cole no Google AI Studio, Gemini, Claude ou qualquer IA geradora de código. Salve o resultado como <span className="text-lime font-mono">.html</span> e abra no navegador.
        </motion.p>
      </div>
    </section>
  )
}
