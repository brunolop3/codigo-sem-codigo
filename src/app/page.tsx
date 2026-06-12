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
  BarChart3,
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Hero from '@/components/sections/hero'
import PatternShowcase from '@/components/sections/pattern-showcase'
import PerfectPrompt from '@/components/sections/perfect-prompt'

/* ─── Navigation ─── */
function Navigation() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#guide', label: 'Guia' },
    { href: '#patterns', label: 'Padrões' },
    { href: '#levels', label: 'Níveis' },
    { href: '#prompt', label: 'Prompt' },
    { href: '#tips', label: 'Dicas' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/6 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-lime flex items-center justify-center">
              <Zap className="size-4 text-navy" />
            </div>
            <span className="text-foreground">
              IA<span className="text-lime">Web</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-lavender hover:text-foreground transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-lavender hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={open ? 'M5 5L15 15M15 5L5 15' : 'M3 6H17M3 10H17M3 14H17'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/6"
            >
              <div className="py-3 space-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-muted-lavender hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-6">
            <BookOpen className="size-3.5" />
            Guia Prático
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Como Criar Ferramentas Web
            <br />
            <span className="text-lime">e Automações com IA</span>
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-muted-lavender leading-relaxed">
            <p>
              Este guia foi criado para ajudar <strong className="text-foreground">qualquer pessoa</strong> —
              mesmo quem nunca programou na vida — a construir formulários, painéis e automações usando
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

          {/* Highlight box */}
          <motion.div
            className="mt-8 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center mt-0.5">
                <Lightbulb className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  💡 Dica de Ouro: Dê preferência a IAs com &quot;Preview&quot; (Visualização)
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  Para facilitar imensamente a sua vida, use IAs que mostram o resultado na própria tela,
                  como o <strong className="text-foreground">Gemini</strong> (que abre o site do lado direito)
                  ou o <strong className="text-foreground">Claude</strong> (com o recurso Artifacts). Isso
                  significa que você não precisa baixar nenhum programa especial ou lidar com arquivos no
                  seu computador. Você escreve o pedido, a IA cria a página e você já testa ela funcionando
                  ali mesmo!
                </p>
              </div>
            </div>
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
      'Converse como se estivesse explicando a tarefa para um estagiário muito inteligente, mas que não conhece sua empresa. Em vez de "faça um site", diga "crie uma página com um formulário de cadastro de alunos".',
    color: 'lime',
  },
  {
    icon: FileText,
    title: 'Dê Contexto',
    description:
      'Explique para que serve. "Este formulário será usado por professores no celular para registrar a presença rápida dos alunos".',
    color: 'coral',
  },
  {
    icon: Layers,
    title: 'Peça Tudo em um Só Lugar',
    description:
      'Para você não ter que lidar com vários arquivos confusos de código, peça sempre para a IA colocar tudo (o texto, as cores e o funcionamento) em um único arquivo.',
    color: 'lime',
  },
  {
    icon: Sparkles,
    title: 'Descreva o Visual',
    description:
      'Diga se quer algo moderno, com cores específicas (ex: tons de azul), letras grandes, etc. A IA conhece milhares de estilos prontos.',
    color: 'coral',
  },
  {
    icon: Rocket,
    title: 'Vá por Partes',
    description:
      'Não peça um sistema gigante de uma vez. Comece pelo visual. Ficou bom? Aí sim você pede para ela adicionar o funcionamento.',
    color: 'lime',
  },
]

function PrinciplesSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <Target className="size-3.5" />
            Fundamentos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            5 Princípios para um{' '}
            <span className="text-lime">Bom Prompt</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Antes de copiar os exemplos, lembre-se destas regrinhas ao conversar com a IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <Card className="h-full bg-surface/80 border-white/6 hover:border-lime/20 transition-all duration-300 hover:bg-surface pattern-card">
                <CardContent className="p-5 sm:p-6">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      p.color === 'lime'
                        ? 'bg-lime/10 text-lime'
                        : 'bg-coral/10 text-coral'
                    }`}
                  >
                    <p.icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold ${
                        p.color === 'lime' ? 'text-lime' : 'text-coral'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors">
                      {p.title}
                    </h3>
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
    title: 'Páginas Simples',
    subtitle: 'Apenas o Visual',
    icon: MousePointerClick,
    description: 'O objetivo é apenas criar o "rosto" da ferramenta, sem que ela salve os dados ainda. É como desenhar a planta de uma casa.',
    examples: [
      {
        title: 'Formulário Rápido',
        objective: 'Criar um formulário bonitinho para coletar dados básicos.',
        prompt: `Atue como um criador de sites. Crie um arquivo único contendo um formulário de contato.\n\nO que precisa ter:\n- Os campos: Nome Completo, E-mail e "Sua Mensagem".\n- Um botão azul escrito "Enviar".\n- O visual deve ser moderno, limpo, com cantos arredondados e a caixinha do formulário deve ficar bem no meio da tela.\n- Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
      },
      {
        title: 'Quadro de Avisos',
        objective: 'Uma página simples para exibir mensagens importantes para a equipe.',
        prompt: `Preciso de uma página de "Quadro de Avisos" para a sala dos professores.\n\nComo deve ser:\n- Um título bem grande no topo: "Avisos Importantes".\n- Abaixo, três caixas coloridas separadas (como se fossem post-its ou cartões). Cada caixa deve ter um título e um texto de aviso fictício.\n- Use um visual bem profissional e bonito (você pode usar ferramentas de design prontas no código para deixar mais rápido).\n- Quero apenas um arquivo com tudo dentro.`,
      },
    ],
  },
  {
    level: 2,
    title: 'Páginas Inteligentes',
    subtitle: 'Que Fazem Cálculos',
    icon: Calculator,
    description: 'Agora vamos dar vida à página, fazendo com que ela faça contas ou responda a algo que você digita, tudo sem precisar de internet ou planilhas.',
    examples: [
      {
        title: 'Calculadora de Média',
        objective: 'O professor digita notas e a página já dá o resultado e a cor certa.',
        prompt: `Crie uma "Calculadora de Média Escolar" em um único arquivo.\n\nComo deve funcionar:\n- A tela deve ter três espaços para eu digitar números: Nota 1, Nota 2 e Nota 3. E um botão "Calcular Média".\n- Ao clicar no botão, a página deve somar as três notas e dividir por 3.\n- Mostre o resultado logo abaixo.\n- A regra de ouro: Se a média for 7 ou mais, escreva "Aprovado" em letras verdes. Se for menor que 7, escreva "Reprovado" em vermelho.\n- Capriche no visual para parecer um aplicativo de celular.`,
      },
    ],
  },
  {
    level: 3,
    title: 'A Mágica!',
    subtitle: 'Integração com Google Sheets',
    icon: Database,
    description: 'É aqui que as coisas ficam incríveis. Nós vamos transformar uma simples Planilha do Google no nosso "banco de dados".',
    attention: 'Para isso funcionar, a IA vai te dar duas coisas: o código do site (para você ver) e um código especial (Google Apps Script) para você colar escondido dentro da sua Planilha do Google.',
    examples: [
      {
        title: 'Formulário que Salva na Planilha',
        objective: 'Alguém preenche o site, e os dados aparecem magicamente em uma nova linha da sua planilha.',
        prompt: `Quero criar um sistema de "Pedido de Materiais" que envia os dados direto para uma Planilha do Google.\n\nParte 1: O Site (O Visual)\n- Crie um formulário bonito com: Nome da Pessoa, Setor e O que ela precisa.\n- O formulário deve ter um código que pega as respostas e envia para um link que eu vou te passar depois.\n- Quando o envio der certo, mostre uma mensagem de "Sucesso!" e limpe os campos. Tudo em um único arquivo.\n\nParte 2: O Motor da Planilha (O Apps Script)\n- Crie o código para eu colar dentro da minha Planilha do Google (no Apps Script).\n- Esse código deve apenas receber os dados do meu formulário e colar em uma nova linha na planilha. Na coluna A a data, na B o Nome, na C o Setor e na D o pedido.`,
      },
      {
        title: 'Dashboard que Lê a Planilha',
        objective: 'Um site que puxa informações da planilha e transforma em um gráfico bonito.',
        prompt: `Preciso criar um Painel de Gráficos (Dashboard) que lê informações de uma Planilha do Google.\n\nCenário: Eu tenho uma planilha. A Coluna A tem os meses do ano. A Coluna B tem a quantidade de alunos matriculados.\n\nParte 1: O Motor da Planilha (Apps Script)\n- Escreva o código para eu colar na minha planilha. Ele deve apenas ler as colunas A e B e preparar esses dados para serem enviados para o meu site.\n\nParte 2: O Site (O Visual)\n- Crie uma página de painel moderno.\n- A página deve se conectar com a minha planilha e puxar aqueles dados.\n- Use os dados para desenhar um Gráfico de Barras bem bonito mostrando os meses e os alunos.\n- Lembre-se: não sou programador, então escreva o código do site todo em um arquivo só e use ferramentas fáceis para gerar o gráfico.`,
      },
    ],
  },
]

function PromptCard({ example }: { example: { title: string; objective: string; prompt: string } }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = example.prompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <Card className="bg-card-bg/50 border-white/6 hover:border-lime/15 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="font-semibold text-foreground mb-1">{example.title}</h4>
            <p className="text-sm text-muted-lavender">{example.objective}</p>
          </div>
          <Badge variant="outline" className="border-lime/20 text-lime text-xs flex-shrink-0">
            Prompt
          </Badge>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-lime hover:text-lime-dark transition-colors flex items-center gap-1 mb-3"
        >
          {expanded ? 'Ocultar prompt' : 'Ver prompt completo'}
          <ChevronDown
            className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="code-block">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/6 bg-white/[0.02]">
                  <span className="text-xs text-muted-lavender font-mono">prompt.txt</span>
                  <button
                    onClick={handleCopy}
                    className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                      copied
                        ? 'text-lime bg-lime/10'
                        : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                    }`}
                  >
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
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <GraduationCap className="size-3.5" />
            Níveis de Aprendizado
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Do Simples ao{' '}
            <span className="text-lime">Avançado</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Avance no seu ritmo. Cada nível adiciona uma nova camada de funcionalidade.
          </p>
        </motion.div>

        {/* Level tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {levels.map((lvl, i) => (
            <button
              key={i}
              onClick={() => setActiveLevel(i)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 text-left ${
                activeLevel === i
                  ? 'border-lime/30 bg-lime/10 text-foreground'
                  : 'border-white/6 bg-surface/50 text-muted-lavender hover:border-white/10 hover:bg-surface'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeLevel === i
                    ? 'bg-lime text-navy'
                    : 'bg-white/5 text-muted-lavender'
                }`}
              >
                <lvl.icon className="size-4" />
              </div>
              <div>
                <div className="text-xs font-medium opacity-70">Nível {lvl.level}</div>
                <div className="text-sm font-semibold">{lvl.title}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active level content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-surface/80 border-white/6 mb-6">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Badge className="bg-lime text-navy font-bold hover:bg-lime">
                    Nível {levels[activeLevel].level}
                  </Badge>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {levels[activeLevel].title}
                    </h3>
                    <p className="text-sm text-muted-lavender">
                      {levels[activeLevel].subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-muted-lavender leading-relaxed">
                  {levels[activeLevel].description}
                </p>
                {levels[activeLevel].attention && (
                  <div className="mt-4 flex gap-3 p-3 rounded-lg bg-coral/5 border border-coral/15">
                    <AlertTriangle className="size-5 text-coral flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-coral/90 leading-relaxed">
                      {levels[activeLevel].attention}
                    </p>
                  </div>
                )}
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

/* ─── Tips Section ─── */
const tips = [
  {
    icon: MessageSquare,
    title: 'A IA esqueceu algo',
    description:
      'Apenas diga: "O visual ficou lindo, mas quando eu clico no botão não acontece nada. Você esqueceu de colocar o código que faz o botão funcionar? Pode me dar o código completo de novo, arrumado?"',
    type: 'fix' as const,
  },
  {
    icon: XCircle,
    title: 'Erro de Permissão na Planilha',
    description:
      'O erro mais comum ao ligar o site com a planilha é a planilha bloquear o acesso. Diga para a IA: "Está dando erro ao enviar os dados para a planilha. Como eu configuro o meu Google Apps Script para liberar o acesso público?"',
    type: 'fix' as const,
  },
  {
    icon: CheckCircle2,
    title: 'Resultado não ficou como esperava',
    description:
      'Descreva exatamente o que está diferente: "O botão está no lugar errado, deveria ficar centralizado" ou "As cores não estão como pedi, quero tons de azul". A IA ajusta na hora.',
    type: 'adjust' as const,
  },
  {
    icon: Code2,
    title: 'Não entendi o código',
    description:
      'Você não precisa entender o código! Mas se tiver curiosidade, pergunte: "Pode me explicar em linguagem simples o que cada parte do código faz?" A IA explica como se fosse um tutorial.',
    type: 'learn' as const,
  },
]

function TipsSection() {
  return (
    <section id="tips" className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="bg-surface/80 border-white/6 hover:border-lime/15 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        tip.type === 'fix'
                          ? 'bg-coral/10 text-coral'
                          : tip.type === 'adjust'
                          ? 'bg-lime/10 text-lime'
                          : 'bg-purple-500/10 text-purple-400'
                      }`}
                    >
                      <tip.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-lime transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Encouragement box */}
        <motion.div
          className="mt-10 rounded-xl border border-lime/20 bg-lime/5 p-6 text-center"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground font-semibold text-lg mb-2">
            Lembre-se: errar faz parte do processo! 🚀
          </p>
          <p className="text-sm text-muted-lavender">
            Cada erro é uma oportunidade de aprender e refinar seu prompt. A IA está ali para ajudar
            — basta perguntar.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/6 bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-lime flex items-center justify-center">
              <Zap className="size-3.5 text-navy" />
            </div>
            <span className="font-semibold text-sm">
              IA<span className="text-lime">Web</span>
            </span>
          </div>
          <p className="text-xs text-muted-lavender text-center">
            Guia criado para educadores e não-programadores. Feito com IA, para criar com IA.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-lavender">
            <a href="#guide" className="hover:text-foreground transition-colors">
              Guia
            </a>
            <a href="#patterns" className="hover:text-foreground transition-colors">
              Padrões
            </a>
            <a href="#prompt" className="hover:text-foreground transition-colors">
              Prompt
            </a>
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
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
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
      <Navigation />
      <main className="flex-1">
        <Hero />
        <GuideIntro />
        <PrinciplesSection />
        <PatternShowcase />
        <LevelsSection />
        <PerfectPrompt />
        <TipsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
