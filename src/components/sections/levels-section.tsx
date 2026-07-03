'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  Database,
  GraduationCap,
  ChevronDown,
  Play,
  Copy,
  Check,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const levels = [
  {
    level: 1,
    title: 'Ferramentas com Cálculos e Lógica',
    subtitle: 'Funcionalidade Primeiro',
    icon: Calculator,
    description: 'Vamos criar uma ferramenta que faz contas ou responde a algo que você digita, sem precisar de internet ou planilhas. Aplicamos a regra de ouro: primeiro a função, depois o visual.',
    examples: [
      {
        title: 'Calculadora de Carga Horária',
        objective: 'O servidor digita as horas e a página já calcula e avisa se passou do limite.',
        step: 1,
        stepLabel: 'Passo 1: A Funcionalidade',
        prompt: `Crie a estrutura de uma 'Calculadora de Carga Horária' em um único arquivo.
Foque primeiro apenas em fazer funcionar, não se preocupe com o visual agora:

Crie 2 campos numéricos: Horas Trabalhadas na Semana e Horas de Plantão.

Crie um botão 'Calcular Total'.

Ao clicar no botão, a página deve somar os dois campos e mostrar o resultado embaixo.

Regra: Se a soma der 40 ou menos, escreva 'Carga Regular'. Se passar de 40, escreva 'Atenção: Limite Excedido'.`,
      },
      {
        title: 'Calculadora de Carga Horária',
        objective: 'Agora que funciona, vamos deixar bonito.',
        step: 2,
        stepLabel: 'Passo 2: O Visual',
        prompt: `Perfeito, a lógica está funcionando muito bem! Agora, por favor, melhore o visual desta página.
Quero um design limpo e institucional, com cara de sistema corporativo. Use tons de azul na tela, deixe a caixa centralizada, coloque cantos arredondados e faça o texto 'Carga Regular' ficar verde e 'Limite Excedido' ficar vermelho. Mantenha tudo em um único arquivo.`,
      },
    ],
  },
  {
    level: 2,
    title: 'Integração com Google Sheets',
    subtitle: 'A Mágica!',
    icon: Database,
    description: 'É aqui que as coisas ficam incríveis. Nós vamos transformar uma simples Planilha do Google no nosso "banco de dados" para receber informações.',
    examples: [
      {
        title: 'Pedido de Materiais',
        objective: 'Alguém preenche o site, e os dados aparecem na planilha.',
        step: 1,
        stepLabel: 'Passo 1: A Estrutura e Conexão',
        prompt: `Quero criar um 'Pedido de Materiais' que envia os dados para uma Planilha do Google. Foque apenas na funcionalidade por enquanto, use um visual básico. Preciso de duas partes:

Parte 1: O Site (Estrutura)

Crie uma aplicação simples em um arquivo único com os campos: Nome do Solicitante, Setor e Material Pedido, além de um botão Enviar.

A aplicação deve estar preparada para enviar esses dados para um link que adicionarei depois. Limpe os campos após o envio.

Parte 2: O Código da Planilha (Apps Script)

Crie o código para eu colar no meu Google Apps Script. Ele deve receber os dados do site e colar em uma nova linha na planilha.
Minha planilha tem o seguinte formato:
Data | Nome do Solicitante | Setor | Material Pedido
10/05/2024 | Carlos Silva | TI | 2 Mouses`,
      },
      {
        title: 'Pedido de Materiais',
        objective: 'Agora que a integração funciona, vamos melhorar o visual.',
        step: 2,
        stepLabel: 'Passo 2: O Visual',
        prompt: `A integração com a planilha funcionou perfeitamente! Os dados estão chegando.
Agora, sem alterar a lógica de envio que já está funcionando, deixe o visual do meu site (aplicação) bem profissional. Quero que a página tenha um fundo cinza claro, a aplicação fique em uma caixa branca no centro com uma leve sombra. O botão 'Enviar' deve ser grande e destacar-se. Lembre-se de manter todo o código em um arquivo só.`,
      },
    ],
  },
]

function PromptCard({ example }: { example: { title: string; objective: string; prompt: string; step: number; stepLabel: string } }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.prompt)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = example.prompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Card className="bg-card-bg/50 border-white/6 hover:border-lime/15 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`text-[10px] font-bold ${example.step === 1 ? 'bg-lime/15 text-lime border-lime/20' : 'bg-coral/15 text-coral border-coral/20'}`}>
                {example.stepLabel}
              </Badge>
            </div>
            <h4 className="font-semibold text-foreground">{example.title}</h4>
            <p className="text-sm text-muted-lavender">{example.objective}</p>
          </div>
        </div>

        <button onClick={() => setExpanded(!expanded)} className="text-sm text-lime hover:text-lime-dark transition-colors flex items-center gap-1 mb-3">
          <Play className="size-3" />
          {expanded ? 'Ocultar prompt' : 'Ver prompt completo'}
          <ChevronDown className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="code-block">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/6 bg-white/[0.02]">
                  <span className="text-xs text-muted-lavender font-mono">prompt.txt</span>
                  <button onClick={handleCopy} className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${copied ? 'text-lime bg-lime/10' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'}`}>
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <pre className="p-3 text-xs leading-relaxed font-mono text-foreground/80 whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {example.prompt}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default function LevelsSection() {
  const [activeLevel, setActiveLevel] = useState(0)

  return (
    <section id="levels" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <GraduationCap className="size-3.5" />
            Níveis de Aprendizado
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Do Simples ao{' '}
            <span className="text-lime">Avançado</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Cada nível segue a mesma lógica: primeiro a funcionalidade, depois o visual.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {levels.map((lvl, i) => (
            <button key={i} onClick={() => setActiveLevel(i)} className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 text-left ${activeLevel === i ? 'border-lime/30 bg-lime/10 text-foreground' : 'border-white/6 bg-surface/50 text-muted-lavender hover:border-white/10 hover:bg-surface'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeLevel === i ? 'bg-lime text-navy' : 'bg-white/5 text-muted-lavender'}`}>
                <lvl.icon className="size-4" />
              </div>
              <div>
                <div className="text-xs font-medium opacity-70">Nível {lvl.level}</div>
                <div className="text-sm font-semibold">{lvl.title}</div>
              </div>
              {activeLevel === i && (
                <motion.div layoutId="activeLevelIndicator" className="ml-auto w-2 h-2 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeLevel} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            <Card className="bg-surface/80 border-white/6 mb-6">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Badge className="bg-lime text-navy font-bold hover:bg-lime">Nível {levels[activeLevel].level}</Badge>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{levels[activeLevel].title}</h3>
                    <p className="text-sm text-muted-lavender">{levels[activeLevel].subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-lavender leading-relaxed">{levels[activeLevel].description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {levels[activeLevel].examples.map((ex, j) => (
                <PromptCard key={j} example={ex} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
