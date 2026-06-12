'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Lightbulb,
  Eye,
  FileText,
  Layers,
  Rocket,
  BookOpen,
  Calculator,
  Database,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Copy,
  Check,
  Zap,
  Target,
  Code2,
  GraduationCap,
  MousePointerClick,
  ArrowUp,
  Play,
  Shield,
  FileOutput,
  Search,
  BarChart3,
  ClipboardCheck,
  Palette,
  Wrench,
  Brain,
  FileWarning,
  Ghost,
  Lock,
  Unlock,
  Mail,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Hero from '@/components/sections/hero'
import PatternShowcase from '@/components/sections/pattern-showcase'
import PerfectPrompt from '@/components/sections/perfect-prompt'
import ReadingProgress from '@/components/sections/reading-progress'
import FloatingNav from '@/components/sections/floating-nav'
import PromptBuilder from '@/components/sections/prompt-builder'
import FormSheetDemo from '@/components/sections/form-sheet-demo'
import SectionDivider from '@/components/sections/section-divider'
import VisualDictionary from '@/components/sections/visual-dictionary'
import EnadeDashboard from '@/components/sections/enade-dashboard'

/* ─── Navigation ─── */
function Navigation() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const links = [
    { href: '#guide', label: 'Guia' },
    { href: '#demo', label: 'Demo' },
    { href: '#dicionario', label: 'Dicionário' },
    { href: '#enade', label: 'ENADE' },
    { href: '#levels', label: 'Níveis' },
    { href: '#prompt', label: 'Prompt' },
    { href: '#builder', label: 'Construtor' },
    { href: '#ideas', label: 'Ideias' },
    { href: '#bastidores', label: 'Bastidores' },
    { href: '#seguranca', label: 'Segurança' },
    { href: '#tips', label: 'Dicas' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = links.map((l) => l.href.replace('#', ''))
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sectionIds[i])
            return
          }
        }
      }
      setActiveSection(null)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/6 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
              <Zap className="size-4 text-navy" />
            </div>
            <span className="text-foreground">
              Código<span className="text-lime">semCódigo</span>
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-all duration-200 ${
                    isActive ? 'text-lime bg-lime/10 font-medium' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
          <button className="lg:hidden p-2 text-muted-lavender hover:text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={open ? 'M5 5L15 15M15 5L5 15' : 'M3 6H17M3 10H17M3 14H17'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden border-t border-white/6">
              <div className="py-3 space-y-1">
                {links.map((link) => {
                  const id = link.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm rounded-md transition-all ${isActive ? 'text-lime bg-lime/10 font-medium' : 'text-muted-lavender hover:text-foreground hover:bg-white/5'}`}>
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

/* ─── Guide Introduction ─── */
function GuideIntro() {
  return (
    <section id="guide" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-6">
            <BookOpen className="size-3.5" />
            Guia Prático para Servidores UEMS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-lime">Código sem Código:</span>
            <br />
            Guia Prático para Criar Ferramentas Web com IA
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-muted-lavender leading-relaxed">
            <p>
              Este guia foi criado para ajudar <strong className="text-foreground">qualquer pessoa</strong> —
              mesmo quem nunca programou na vida — a construir aplicações, painéis e automações usando
              Inteligência Artificial (como Gemini, ChatGPT, Claude) integrados ao Google Sheets.
            </p>
            <p>
              A chave para o sucesso é saber como &quot;pedir&quot; para a IA. O que chamamos de &quot;pedir&quot;
              é o <strong className="text-lime">Prompt</strong>. A regra de ouro é:{' '}
              <em className="text-foreground not-italic font-semibold">
                você explica O QUE quer, e a IA descobre COMO programar isso.
              </em>
            </p>
          </div>

          {/* Dica de Ouro */}
          <motion.div className="mt-8 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center mt-0.5">
                <Lightbulb className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Dica de Ouro: Dê preferência a IAs com &quot;Preview&quot; (Visualização)
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  Para facilitar imensamente a sua vida, use IAs que mostram o resultado na própria tela,
                  como o <strong className="text-foreground">Gemini</strong> (que abre o site do lado direito)
                  ou o <strong className="text-foreground">Claude</strong> (com o recurso Artifacts). Você
                  escreve o pedido, a IA cria a página e você já testa ela funcionando ali mesmo!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dica de Segurança - Spreadsheet Privacy */}
          <motion.div className="mt-6 rounded-xl border border-coral/20 bg-coral/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral/15 flex items-center justify-center mt-0.5">
                <Shield className="size-5 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Dica de Segurança: Minha planilha precisa ficar pública?
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                  <strong className="text-coral">NÃO!</strong> Você nunca precisa (e nem deve) deixar sua planilha com dados sensíveis pública na internet, e muito menos enviar o link dela para a Inteligência Artificial.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                    <p className="text-sm text-foreground font-medium mb-1">Para a IA entender sua planilha:</p>
                    <p className="text-xs text-muted-lavender leading-relaxed">
                      Você não manda o link para ela. O truque mais rápido e eficiente é simplesmente ir na sua planilha, copiar a linha do cabeçalho (os títulos) e pelo menos uma linha com dados preenchidos, e colar direto na conversa com a IA. Com isso, ela entende as colunas e que tipo de informação vai em cada uma.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                    <p className="text-sm text-foreground font-medium mb-1">Para o Site conseguir enviar dados para a Planilha:</p>
                    <p className="text-xs text-muted-lavender leading-relaxed">
                      Sua planilha continua privada e segura no seu Google Drive. O que você vai liberar para &quot;Qualquer Pessoa&quot; é apenas o código (o Apps Script) que recebe os dados. É como se a sua planilha fosse um cofre trancado: o código é apenas uma fenda na porta onde as pessoas inserem papéis (dados), mas ninguém além de você consegue abrir o cofre para ver o que tem dentro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow visual */}
          <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            {[
              { step: '01', icon: Eye, title: 'Descreva', desc: 'Explique o que precisa em linguagem simples' },
              { step: '02', icon: Wrench, title: 'Construa', desc: 'Funcionalidade primeiro, sem se preocupar com o visual' },
              { step: '03', icon: Palette, title: 'Pinte', desc: 'Com tudo funcionando, melhore o visual' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-white/6">
                <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon className="size-3.5 text-lime" />
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  </div>
                  <p className="text-xs text-muted-lavender">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Principles Section ─── */
const principles = [
  {
    icon: Eye,
    title: 'Seja Claro e Específico',
    description:
      'Converse como se estivesse explicando a tarefa para um estagiário muito inteligente, mas que não conhece sua empresa. Em vez de "faça um site", diga "crie uma página com uma aplicação de cadastro de processos administrativos".',
    color: 'lime',
  },
  {
    icon: FileText,
    title: 'Dê Contexto',
    description:
      'Explique para que serve. "Esta aplicação será usada por servidores no celular para registrar rapidamente o recebimento de malotes na portaria".',
    color: 'coral',
  },
  {
    icon: Layers,
    title: 'Peça Tudo em um Só Lugar',
    description:
      'Para você não ter que lidar com vários arquivos confusos, peça sempre para a IA colocar todo o código do site em um único arquivo.',
    color: 'lime',
  },
  {
    icon: Wrench,
    title: 'A Regra da Construção',
    description:
      'Funcionalidade PRIMEIRO, Visual DEPOIS! Construa as paredes antes de pintar a casa. Peça primeiro a estrutura e o funcionamento. Só depois que estiver tudo funcionando sem erros, peça para caprichar no visual.',
    color: 'coral',
    isHighlighted: true,
  },
]

function PrinciplesSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <Target className="size-3.5" />
            Fundamentos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Princípios para um{' '}
            <span className="text-lime">Bom Prompt</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Lembre-se destas regrinhas ao conversar com a IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className={`h-full transition-all duration-300 hover:bg-surface pattern-card ${
                p.isHighlighted
                  ? 'bg-coral/5 border-coral/20 hover:border-coral/30'
                  : 'bg-surface/80 border-white/6 hover:border-lime/20'
              }`}>
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    p.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'
                  }`}>
                    <p.icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${p.color === 'lime' ? 'text-lime' : 'text-coral'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors">
                      {p.title}
                    </h3>
                    {p.isHighlighted && (
                      <Badge className="bg-coral/15 text-coral text-[10px] border-coral/20">Regra de Ouro</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-lavender leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Levels Section ─── */
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

function LevelsSection() {
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

/* ─── Ideas Section ─── */
const ideas = [
  {
    icon: FileOutput,
    title: 'Tramitação de Documentos',
    subtitle: 'Registro rápido no celular',
    description: 'Ideal para setores que precisam registrar a entrada e saída de documentos, processos ou malotes. Com uma aplicação no celular, o servidor registra rapidamente sem precisar abrir a planilha pesada.',
    color: 'lime',
    prompt: `Crie uma 'Tramitação de Documentos Rápida' focada para uso em celular (mobile-first). O HTML deve ter um campo para o Número do Documento/Processo, um para o Nome do Servidor, um dropdown para o Setor de Destino, e botões grandes de 'Registrar Envio' e 'Registrar Recebimento'. Gere também o código Google Apps Script para receber esses dados e salvar numa planilha com as colunas: Data/Hora, Documento, Servidor, Setor Destino, Tipo de Movimento (Envio ou Recebimento). Ao salvar, exiba um 'Toast' de sucesso. Foque primeiro apenas na funcionalidade.`,
  },
  {
    icon: Search,
    title: 'Consulta de Situação',
    subtitle: 'Painel de Requerimentos/Processos',
    description: 'O fluxo é inverso: o site vai ler a planilha em vez de escrever nela. Ótimo para tirar a carga de atendimento telefônico ou WhatsApp do seu setor.',
    color: 'coral',
    prompt: `Quero criar um site de 'Consulta de Situação de Processo'. O site deve ter uma barra de pesquisa onde o usuário digita o Número do Protocolo dele e clica em 'Buscar'. Gere o HTML e o Google Apps Script correspondente. O script deve procurar esse Protocolo na minha planilha e retornar para o site o 'Status' e o 'Parecer'. Exemplo da planilha:
Protocolo | Nome | Assunto | Status | Parecer
112233 | João Silva | Progressão Funcional | Deferido | Aprovado pela comissão.
Foque apenas em fazer a integração funcionar primeiro.`,
  },
  {
    icon: BarChart3,
    title: 'Painel de Indicadores',
    subtitle: 'Dashboard em HTML',
    description: 'Se o seu setor já tem uma planilha cheia de dados (processos abertos, concluídos, licitações em andamento), você pode pedir para a IA criar painéis visuais iguais aos sistemas modernos.',
    color: 'lime',
    prompt: `Tenho uma planilha do Google com dados de processos administrativos e criei uma API no Apps Script que me retorna esses dados em JSON. Crie um Dashboard em HTML de arquivo único (usando Tailwind CSS para o visual moderno e Chart.js para gráficos). Quero que o painel exiba 'Cards' com indicadores totais no topo e uma tabela listando as informações embaixo. Por enquanto, coloque dados fictícios (mockados) no código só para eu ver a estrutura funcionando e aprovar o layout.`,
  },
  {
    icon: ClipboardCheck,
    title: 'Aplicação de Padronização',
    subtitle: 'Administrativa',
    description: 'Um dos maiores problemas das rotinas é que muitas pessoas editam a mesma planilha de forma bagunçada. Um escreve "Diplomas", outro "Setor de Diplomas". Usar uma aplicação HTML resolve isso na raiz! Você cria regras que preenchem e tratam a informação antes dela ir para a tabela.',
    color: 'coral',
    prompt: `Crie uma 'Aplicação de Tramitação de Documentos' em arquivo único HTML. O objetivo principal é padronização. Em vez de texto livre, crie um menu suspenso (dropdown) obrigatório para 'Setor de Destino' com as opções: Divisão de Matrículas, Divisão de Diplomas e Divisão de Estágios. Quando o usuário selecionar o setor, a página deve preencher automaticamente um campo bloqueado com a 'Sigla do Setor' correspondente (ex: DIMAT, DIDIP, DIEST). Gere o Google Apps Script para salvar. Foque primeiro na lógica de validação.`,
  },
]

function IdeasSection() {
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

/* ─── Bastidores Section (NEW) ─── */
const bastidores = [
  {
    icon: Brain,
    title: 'A "Amnésia" da IA',
    description: 'Em conversas muito longas, a IA gratuita pode "esquecer" como o código estava no início ou se perder nas regras que você pediu lá atrás.',
    solution: 'Se o código quebrar muito e a IA começar a rodar em círculos, o melhor é abrir um chat novo, colar o último código que estava funcionando e continuar dali.',
    color: 'coral',
  },
  {
    icon: FileWarning,
    title: 'A "Preguiça" (Snippets Incompletos)',
    description: 'Às vezes a IA responde apenas com a parte do código que mudou (exemplo: // resto do código aqui...). Para quem não programa, juntar esses pedaços é terrível.',
    solution: 'Sempre reforce no seu prompt: "Me envie o código HTML completo e atualizado em um único arquivo, sem omitir nenhuma parte".',
    color: 'lime',
  },
  {
    icon: Ghost,
    title: 'Alucinações',
    description: 'A IA pode inventar funções que não existem ou que não funcionam bem no Google Apps Script.',
    solution: 'É por isso que a "Regra da Construção" é tão importante: teste um passo de cada vez.',
    color: 'coral',
  },
]

function BastidoresSection() {
  return (
    <section id="bastidores" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <AlertTriangle className="size-3.5" />
            Os Bastidores
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Dificuldades Reais com{' '}
            <span className="text-coral">IAs Gratuitas</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Construir tudo isso usando versões gratuitas das IAs é incrível, mas tem seus percalços. No nosso processo de aprendizado, enfrentamos alguns desafios que você também pode encontrar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bastidores.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full bg-surface/80 border-white/6 hover:border-coral/20 transition-all duration-300 pattern-card">
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${item.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'}`}>
                    <item.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-lavender leading-relaxed mb-4">{item.description}</p>
                  <div className="p-3 rounded-lg bg-lime/5 border border-lime/10">
                    <p className="text-xs text-foreground font-medium mb-1 flex items-center gap-1.5">
                      <Lightbulb className="size-3 text-lime" />
                      O que fazer:
                    </p>
                    <p className="text-xs text-muted-lavender leading-relaxed">{item.solution}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Security Section (NEW) ─── */
function SecuritySection() {
  return (
    <section id="seguranca" className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Shield className="size-3.5" />
            Segurança
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            O Equilíbrio entre{' '}
            <span className="text-lime">Praticidade</span> e{' '}
            <span className="text-coral">Proteção</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Como estamos criando ferramentas ágeis, o nível de segurança depende do tipo de dado que você está manipulando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quando usar acesso público */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-lime/5 border-lime/20 hover:border-lime/30 transition-all duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
                    <Unlock className="size-5 text-lime" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Acesso Público</h3>
                    <p className="text-xs text-lime font-medium">&quot;Qualquer Pessoa&quot;</p>
                  </div>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  Se você está criando um painel de indicadores (Dashboard) com dados públicos (como notas do Enade, histórico de vagas) para colocar embutido dentro de uma página do Moodle ou no site da universidade, a configuração deve ser &quot;Qualquer Pessoa&quot;.
                </p>
                <div className="space-y-2">
                  {[
                    'Não há problema — os dados são de domínio público',
                    'Exigir login quebraria o painel dentro do Moodle',
                    'Vale também para aplicações simples de uso interno, onde a praticidade fala mais alto',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-lime flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-lavender leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quando aplicar regras rígidas */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full bg-coral/5 border-coral/20 hover:border-coral/30 transition-all duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-coral/15 flex items-center justify-center">
                    <Lock className="size-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Dados Sensíveis</h3>
                    <p className="text-xs text-coral font-medium">Regras Rígidas</p>
                  </div>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  Se você for lidar com dados sensíveis (informações pessoais, avaliações, processos sigilosos), aplique estas regras de ouro:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Validação Dupla',
                      desc: 'Não confie apenas na aplicação (HTML). Peça para a IA fazer com que o Apps Script também verifique se os dados chegaram corretamente antes de salvar.',
                    },
                    {
                      title: 'Nunca exponha senhas no HTML',
                      desc: 'O código do site pode ser lido por qualquer pessoa (F12 → Inspecionar). Tudo que é "secreto" deve ficar no Apps Script.',
                    },
                    {
                      title: 'Restrição de Acesso (@uems.br)',
                      desc: 'Peça para a IA criar um Web App no Apps Script com HtmlService. Na hora de publicar, restrinja o acesso apenas para usuários @uems.br.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                      <p className="text-xs text-foreground font-medium mb-1">{item.title}</p>
                      <p className="text-xs text-muted-lavender leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Tips Section ─── */
const tips = [
  {
    icon: MessageSquare,
    title: 'A IA mudou a funcionalidade ao alterar o visual',
    description:
      'Diga: "Você alterou o visual e ficou lindo, mas o botão de enviar parou de funcionar e não manda mais para a planilha. Por favor, junte o visual novo com a lógica do botão da versão anterior."',
    type: 'fix' as const,
  },
  {
    icon: XCircle,
    title: 'Erro de Permissão na Planilha',
    description:
      'Diga: "Está dando erro ao enviar os dados para a planilha. Como eu configuro o meu Google Apps Script para liberar o acesso público (qualquer pessoa) corretamente no momento de implantar (Deploy)?" Ela vai te dar o passo a passo exato.',
    type: 'fix' as const,
  },
]

function TipsSection() {
  return (
    <section id="tips" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <AlertTriangle className="size-3.5" />
            Solução de Problemas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Quando Algo Der{' '}
            <span className="text-coral">Errado</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            É normal! Não se assuste. Apenas &quot;jogue&quot; o problema de volta para a IA resolver por você.
          </p>
        </motion.div>

        <div className="space-y-4">
          {tips.map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Card className="bg-surface/80 border-white/6 hover:border-lime/15 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-coral/10 text-coral">
                      <tip.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-lime transition-colors">{tip.title}</h3>
                      <p className="text-sm text-muted-lavender leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Author box */}
        <motion.div className="mt-10 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
                <Building2 className="size-5 text-lime" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-lg">
                  O segredo é não ter medo de errar!
                </p>
                <p className="text-xs text-muted-lavender">Vá ajustando com a IA aos poucos.</p>
              </div>
            </div>

            <p className="text-sm text-muted-lavender leading-relaxed mb-4">
              Em caso de dúvidas sobre como estruturar os seus prompts ou conectar as planilhas, eu posso tentar ajudar! Sinta-se à vontade para me enviar um e-mail.
            </p>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/6 mb-4">
              <Mail className="size-4 text-lime" />
              <a href="mailto:bruno.lopes@uems.br" className="text-sm text-lime hover:underline font-medium">
                bruno.lopes@uems.br
              </a>
            </div>

            <div className="pt-4 border-t border-lime/10">
              <p className="text-xs text-muted-lavender/70 leading-relaxed italic">
                Vale deixar claro que eu não sou programador — minha formação é em Direito! Sou apenas alguém que está aprendendo a utilizar essas ferramentas a cada dia mais para facilitar as nossas rotinas institucionais. O segredo é não ter medo de errar e ir ajustando com a IA aos poucos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/6 bg-surface/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-lime flex items-center justify-center">
              <Zap className="size-3.5 text-navy" />
            </div>
            <span className="font-semibold text-sm">
              Código<span className="text-lime">semCódigo</span>
            </span>
          </div>
          <p className="text-xs text-muted-lavender text-center">
            Guia prático para servidores UEMS — Pró-Reitoria de Ensino. Feito com IA, para criar com IA.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-lavender">
            <a href="#guide" className="hover:text-foreground transition-colors">Guia</a>
            <a href="#ideas" className="hover:text-foreground transition-colors">Ideias</a>
            <a href="#seguranca" className="hover:text-foreground transition-colors">Segurança</a>
            <a href="mailto:bruno.lopes@uems.br" className="hover:text-lime transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Scroll to Top ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-lime text-navy flex items-center justify-center shadow-lg hover:bg-lime-dark transition-colors glow-lime"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgress />
      <Navigation />
      <FloatingNav />
      <main className="flex-1">
        <Hero />
        <SectionDivider variant="lime" />
        <GuideIntro />
        <SectionDivider variant="mixed" />
        <PrinciplesSection />
        <SectionDivider variant="coral" />
        <PatternShowcase />
        <SectionDivider variant="lime" />
        <FormSheetDemo />
        <SectionDivider variant="coral" />
        <VisualDictionary />
        <SectionDivider variant="coral" />
        <EnadeDashboard />
        <SectionDivider variant="mixed" />
        <LevelsSection />
        <SectionDivider variant="mixed" />
        <PerfectPrompt />
        <SectionDivider variant="lime" />
        <PromptBuilder />
        <SectionDivider variant="coral" />
        <IdeasSection />
        <SectionDivider variant="mixed" />
        <BastidoresSection />
        <SectionDivider variant="lime" />
        <SecuritySection />
        <SectionDivider variant="coral" />
        <TipsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
