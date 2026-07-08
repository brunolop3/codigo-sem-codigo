'use client'

import { motion } from 'framer-motion'
import {
  Settings,
  BookOpen,
  Cpu,
  MessageSquare,
  Code2,
  Lightbulb,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Globe,
  Zap,
  Brain,
  Eye,
  ArrowRight,
  Star,
  Shield,
  Palette,
  Layers,
  MousePointerClick,
  Search,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-muted-lavender hover:text-foreground transition-colors"
      title={copied ? 'Copiado!' : 'Copiar'}
    >
      {copied ? <Check className="size-4 text-lime" /> : <Copy className="size-4" />}
    </button>
  )
}

/* ─── System Instruction Example ─── */
const systemInstructionExample = `Você é um especialista em desenvolvimento web para a UEMS (Universidade Estadual de Mato Grosso do Sul).

REGRAS OBRIGATÓRIAS:
1. SEMPRE gere o código HTML completo em um único arquivo, sem omitir nenhuma parte
2. Use Google Fonts para tipografia (prefira Inter, Poppins ou Roboto)
3. Todo CSS deve estar dentro da tag <style> no <head>
4. Todo JavaScript deve estar dentro da tag <script> antes do </body>
5. NUNCA use placeholders como "// resto do código aqui" — gere TUDO completo
6. NUNCA use frameworks externos (React, Vue, etc.) — apenas HTML, CSS e JavaScript puros
7. Para ícones, use bibliotecas CDN como Lucide Icons ou FontAwesome
8. Para estilização, use Tailwind CSS via CDN
9. Para gráficos, use Chart.js via CDN
10. Para tabelas grandes, SEMPRE implemente paginação e busca
11. Para formulários, SEMPRE use validação no lado do cliente
12. Código deve ser responsivo (mobile-first) e acessível

CONTEXTO UEMS:
- A universidade usa Google Sheets como banco de dados
- Integração é feita via Google Apps Script
- O fluxo é: HTML → Apps Script → Google Sheets
- Dados sensíveis (CPF, nomes) NUNCA devem ir para a conversa com IA
- Use sempre dados fictícios nos prompts`

/* ─── System Instructions Steps ─── */
const systemInstructionSteps = [
  {
    step: 1,
    title: 'Acesse o Google AI Studio',
    description: 'Abra aistudio.google.com no navegador. Faça login com sua conta Google (pode ser a institucional @uems.br). É totalmente gratuito.',
    icon: ExternalLink,
  },
  {
    step: 2,
    title: 'Crie um novo prompt estruturado',
    description: 'Na tela inicial, clique em "Create new prompt" → "Structured prompt". Esse tipo de prompt permite definir System Instructions + exemplos de conversa.',
    icon: BookOpen,
  },
  {
    step: 3,
    title: 'Encontre o campo System Instructions',
    description: 'No painel direito do editor, procure a seção "System Instructions" (Instruções do Sistema). É um campo de texto grande, separado da área de chat.',
    icon: MessageSquare,
  },
  {
    step: 4,
    title: 'Cole as instruções do guia',
    description: 'Copie o conteúdo da caixa abaixo e cole no campo System Instructions. Essas instruções vão guiar TODAS as respostas da IA, sem precisar repetir em cada mensagem.',
    icon: Copy,
  },
  {
    step: 5,
    title: 'Salve o prompt e comece a conversar',
    description: 'Clique em "Save" para salvar o prompt com as instruções. Agora toda mensagem que você enviar seguirá automaticamente essas regras — para sempre!',
    icon: CheckCircle2,
  },
]

/* ─── Model Selection Data ─── */
const models = [
  {
    name: 'Gemini 2.5 Flash',
    badge: 'Recomendado',
    badgeColor: 'bg-lime/15 text-lime',
    description: 'Rápido e eficiente. Ideal para a maioria das tarefas do dia a dia: formulários, dashboards simples, automações. Responde em segundos.',
    useCases: ['Formulários de coleta de dados', 'Dashboards com gráficos básicos', 'Páginas de visualização de planilhas', 'Automações e scripts do Apps Script', 'Protótipos rápidos'],
    speed: '⚡️⚡️⚡️',
    cost: 'Gratuito',
    recommended: true,
  },
  {
    name: 'Gemini 2.5 Pro',
    badge: 'Para código complexo',
    badgeColor: 'bg-purple-400/15 text-purple-400',
    description: 'Mais poderoso e analítico. Ideal para código complexo, lógicas elaboradas, ou quando o Flash não entendeu o pedido na primeira tentativa.',
    useCases: ['Código com lógicas complexas e múltiplas dependências', 'Sistemas com CRUD completo + paginação + filtros + exportação', 'Integrações elaboradas com Google Apps Script', 'Quando o Flash gera código incompleto ou com placeholders'],
    speed: '⚡️⚡️',
    cost: 'Gratuito (com limites)',
    recommended: false,
  },
  {
    name: 'Gemini 2.0 Flash',
    badge: 'Legado',
    badgeColor: 'bg-muted-lavender/15 text-muted-lavender',
    description: 'Versão anterior. Ainda funcional, mas o 2.5 Flash é mais rápido e preciso. Use apenas se o 2.5 não estiver disponível.',
    useCases: ['Compatibilidade com projetos existentes'],
    speed: '⚡️⚡️⚡️',
    cost: 'Gratuito',
    recommended: false,
  },
]

/* ─── How to Select Model Steps ─── */
const modelSelectionSteps = [
  {
    step: 1,
    title: 'Localize o seletor de modelo',
    description: 'No canto superior direito do AI Studio, você verá um dropdown com o nome do modelo atual (ex: "Gemini 2.5 Flash"). Clique nele.',
    icon: MousePointerClick,
  },
  {
    step: 2,
    title: 'Escolha o modelo desejado',
    description: 'O dropdown mostra todos os modelos disponíveis. Selecione "Gemini 2.5 Flash" para tarefas comuns ou "Gemini 2.5 Pro" para código complexo.',
    icon: Search,
  },
  {
    step: 3,
    title: 'Ajuste a temperatura (opcional)',
    description: 'Na barra lateral direita, em "Advanced settings", você pode ajustar a Temperature. Use 0.0-0.3 para código (mais preciso) ou 0.7-1.0 para texto criativo.',
    icon: Settings,
  },
]

/* ─── AI Platforms Comparison ─── */
const aiPlatforms = [
  {
    name: 'Google AI Studio',
    url: 'aistudio.google.com',
    icon: Layers,
    color: 'lime',
    colorClasses: {
      bg: 'bg-lime/10',
      border: 'border-lime/20',
      text: 'text-lime',
      badge: 'bg-lime/15 text-lime',
      glow: 'bg-lime/5',
      ring: 'ring-lime/20',
    },
    badge: 'Recomendado para começar',
    tagline: 'O canivete suíço da IA',
    description: 'Plataforma profissional gratuita do Google com System Instructions, seleção de modelo e maior janela de contexto. A melhor opção para quem quer controle total sobre as respostas da IA.',
    highlights: [
      { icon: Shield, text: 'System Instructions — instruções permanentes que a IA nunca esquece' },
      { icon: Cpu, text: 'Escolha entre Flash (rápido) e Pro (poderoso)' },
      { icon: BookOpen, text: 'Maior janela de contexto — lê documentos enormes' },
      { icon: Star, text: 'Totalmente gratuito com conta Google' },
    ],
    idealFor: 'Tarefas repetitivas, código web, projetos UEMS, quando você quer que a IA sempre siga as mesmas regras',
    artifacts: false,
  },
  {
    name: 'Gemini',
    url: 'gemini.google.com',
    icon: Zap,
    color: 'sky-400',
    colorClasses: {
      bg: 'bg-sky-400/10',
      border: 'border-sky-400/20',
      text: 'text-sky-400',
      badge: 'bg-sky-400/15 text-sky-400',
      glow: 'bg-sky-400/5',
      ring: 'ring-sky-400/20',
    },
    badge: 'Rápido e direto',
    tagline: 'A IA conversacional do Google',
    description: 'Interface simples e direta do Google. Basta digitar e receber. Ideal para tarefas rápidas, perguntas pontuais e quando você não precisa de System Instructions.',
    highlights: [
      { icon: Zap, text: 'Interface simples — digite e receba, sem configuração' },
      { icon: Globe, text: 'Acesso a informações em tempo real (busca web integrada)' },
      { icon: Eye, text: 'Análise de imagens e documentos enviados' },
      { icon: Star, text: 'Gratuito com conta Google' },
    ],
    idealFor: 'Perguntas rápidas, brainstorming, quando não precisa de instruções permanentes, análises pontuais',
    artifacts: false,
  },
  {
    name: 'Claude',
    url: 'claude.ai',
    icon: Brain,
    color: 'coral',
    colorClasses: {
      bg: 'bg-coral/10',
      border: 'border-coral/20',
      text: 'text-coral',
      badge: 'bg-coral/15 text-coral',
      glow: 'bg-coral/5',
      ring: 'ring-coral/20',
    },
    badge: 'Melhor para código longo',
    tagline: 'O especialista em código e Artifacts',
    description: 'IA da Anthropic excelente para código longo e complexo. O recurso Artifacts mostra o resultado em tempo real dentro do chat — perfeito para visualizar HTML, CSS e JavaScript sem sair da conversa.',
    highlights: [
      { icon: Eye, text: 'Artifacts — visualiza HTML/CSS/JS em tempo real no chat' },
      { icon: Code2, text: 'Excelente para código longo sem omitir partes' },
      { icon: Shield, text: 'System Prompt — instruções permanentes (similar ao AI Studio)' },
      { icon: Palette, text: 'Versão gratuita generosa para uso diário' },
    ],
    idealFor: 'Código HTML/CSS/JS complexo, quando quer ver o resultado sem abrir arquivo separado, projetos grandes com muito código',
    artifacts: true,
  },
]

/* ─── Active platform tab state ─── */
function PlatformDetail({ platform, isActive }: { platform: typeof aiPlatforms[0]; isActive: boolean }) {
  const c = platform.colorClasses
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      className={isActive ? 'block' : 'hidden'}
    >
      <Card className={`bg-surface/80 border-white/6 ${c.ring} ring-1`}>
        <CardContent className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                <platform.icon className={`size-6 ${c.text}`} />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">{platform.name}</h4>
                <span className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.badge}`}>
                  {platform.badge}
                </span>
              </div>
            </div>
            <a
              href={`https://${platform.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs ${c.text} hover:underline`}
            >
              {platform.url}
              <ExternalLink className="size-3" />
            </a>
          </div>

          <p className="text-sm text-muted-lavender mb-1 font-medium italic">{platform.tagline}</p>
          <p className="text-sm text-muted-lavender leading-relaxed mb-5">{platform.description}</p>

          {/* Highlights */}
          <div className="space-y-2.5 mb-5">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Destaques</span>
            {platform.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center mt-0.5`}>
                  <h.icon className={`size-3.5 ${c.text}`} />
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>

          {/* Ideal for */}
          <div className={`p-3 rounded-lg ${c.glow} border ${c.border}`}>
            <p className="text-xs text-foreground font-semibold mb-1">Ideal para:</p>
            <p className="text-xs text-muted-lavender leading-relaxed">{platform.idealFor}</p>
          </div>

          {/* Artifacts badge */}
          {platform.artifacts && (
            <div className={`mt-4 p-3 rounded-lg ${c.glow} border ${c.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <Eye className={`size-4 ${c.text}`} />
                <span className="text-sm font-semibold text-foreground">Recurso Artifacts</span>
              </div>
              <p className="text-xs text-muted-lavender leading-relaxed">
                O Claude tem um recurso único chamado <strong className="text-foreground">Artifacts</strong>: quando ele gera código HTML, CSS ou JavaScript,
                o resultado aparece em uma janela de visualização <strong className="text-foreground">dentro do próprio chat</strong>. Você vê a ferramenta
                funcionando sem precisar copiar o código para um arquivo separado — é como ter um navegador embutido na conversa!
                Para ativar, basta pedir código HTML e o Claude automaticamente mostra o resultado.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AiStudioGuide() {
  const [activePlatform, setActivePlatform] = useState(0)

  return (
    <section id="ai-studio" className="relative py-20 sm:py-28">
      {/* Decorative glows */}
      <div className="absolute top-10 left-0 w-60 h-60 bg-lime/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-400/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-coral/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Settings className="size-3.5" />
            Configuração Avançada
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Domine as{' '}
            <span className="text-lime">IAs</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Conheça as três IAs recomendadas, aprenda a configurar System Instructions no AI Studio e escolher o modelo ideal para cada tarefa.
          </p>
        </motion.div>

        {/* ─── PART 1: AI Platforms Comparison ─── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
              <Globe className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Três IAs Recomendadas</h3>
              <p className="text-sm text-muted-lavender">Google AI Studio • Gemini • Claude</p>
            </div>
          </div>

          {/* Platform selector tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {aiPlatforms.map((platform, i) => (
              <button
                key={i}
                onClick={() => setActivePlatform(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activePlatform === i
                    ? `${platform.colorClasses.bg} ${platform.colorClasses.border} border ${platform.colorClasses.text}`
                    : 'bg-white/[0.03] border border-white/6 text-muted-lavender hover:bg-white/[0.06] hover:text-foreground'
                }`}
              >
                <platform.icon className="size-4" />
                {platform.name}
              </button>
            ))}
          </div>

          {/* Platform details */}
          {aiPlatforms.map((platform, i) => (
            <PlatformDetail key={i} platform={platform} isActive={activePlatform === i} />
          ))}

          {/* Quick comparison table */}
          <Card className="bg-surface/80 border-white/6 mt-6">
            <CardContent className="p-5 sm:p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <ChevronRight className="size-4 text-lime" />
                Comparação Rápida
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/6">
                      <th className="text-left py-2 pr-4 text-muted-lavender font-medium text-xs uppercase tracking-wider">Recurso</th>
                      <th className="text-left py-2 px-3 text-lime font-medium text-xs">AI Studio</th>
                      <th className="text-left py-2 px-3 text-sky-400 font-medium text-xs">Gemini</th>
                      <th className="text-left py-2 px-3 text-coral font-medium text-xs">Claude</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-muted-lavender">
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-2.5 pr-4 font-medium text-foreground">System Instructions</td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-lime" /></td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-coral" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-2.5 pr-4 font-medium text-foreground">Escolha de modelo</td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-lime" /></td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-2.5 pr-4 font-medium text-foreground">Artifacts (preview)</td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-coral" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-2.5 pr-4 font-medium text-foreground">Busca web integrada</td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-sky-400" /></td>
                      <td className="py-2.5 px-3"><AlertCircle className="size-4 text-muted-lavender/40" /></td>
                    </tr>
                    <tr className="border-b border-white/[0.03]">
                      <td className="py-2.5 pr-4 font-medium text-foreground">Gratuito</td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-lime" /></td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-sky-400" /></td>
                      <td className="py-2.5 px-3"><CheckCircle2 className="size-4 text-coral" /></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-foreground">Melhor para código UEMS</td>
                      <td className="py-2.5 px-3"><Star className="size-4 text-lime fill-lime" /></td>
                      <td className="py-2.5 px-3 text-muted-lavender/50">—</td>
                      <td className="py-2.5 px-3"><Star className="size-4 text-coral fill-coral" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-lime/5 border border-lime/10">
                <p className="text-xs text-lime leading-relaxed">
                  <Lightbulb className="size-3 inline mr-1" />
                  <strong>Dica:</strong> A melhor estratégia é usar mais de uma IA! Use o <strong>AI Studio</strong> como base (com System Instructions)
                  para tarefas repetitivas, o <strong>Gemini</strong> para buscas rápidas e o <strong>Claude</strong> com Artifacts para visualizar código
                  em tempo real. Teste o mesmo prompt nas três e compare os resultados.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── PART 2: System Instructions (detailed) ─── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
              <MessageSquare className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">System Instructions no AI Studio</h3>
              <p className="text-sm text-muted-lavender">Instruções permanentes que a IA nunca esquece</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Explanation */}
            <div className="space-y-4">
              {/* What are System Instructions? */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Lightbulb className="size-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">O que são System Instructions?</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        System Instructions são instruções <strong className="text-foreground">permanentes</strong> que definem o comportamento da IA
                        em <strong className="text-foreground">todas</strong> as mensagens da conversa. Diferente de colar as regras em cada mensagem,
                        as System Instructions ficam salvas no prompt e a IA sempre as segue — sem repetir, sem esquecer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <AlertCircle className="size-4 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Por que você precisa disso?</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        Sem System Instructions, toda vez que você manda uma mensagem, a IA pode: omitir partes do código
                        (&quot;// resto do código aqui...&quot;), usar frameworks que você não pediu, ou esquecer regras que você
                        definiu lá no início da conversa. Com System Instructions, essas regras ficam fixas para sempre.
                      </p>
                    </div>
                  </div>

                  {/* Analogy */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center">
                      <BookOpen className="size-4 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Analogia simples</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        Pense nas System Instructions como as <strong className="text-foreground">regras da casa</strong>:
                        quando alguém visita, você explica as regras uma vez (tire os sapatos, feche a porta, etc.).
                        Com System Instructions, a IA já chega sabendo todas as regras — você não precisa repetir
                        em cada interação. É como ter um funcionário que já conhece o manual da empresa.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Without vs With comparison */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-3">Sem vs. Com System Instructions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-coral/5 border border-coral/10">
                      <p className="text-xs font-semibold text-coral mb-2">❌ Sem System Instructions</p>
                      <ul className="space-y-1.5">
                        {[
                          'Regras somem ao longo da conversa',
                          'IA omite código ("// resto aqui")',
                          'Usa frameworks não pedidos',
                          'Precisa repetir regras toda hora',
                          'Resultado inconsistente',
                        ].map((item, i) => (
                          <li key={i} className="text-xs text-muted-lavender flex items-start gap-1.5">
                            <span className="text-coral mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-lime/5 border border-lime/10">
                      <p className="text-xs font-semibold text-lime mb-2">✅ Com System Instructions</p>
                      <ul className="space-y-1.5">
                        {[
                          'Regras fixas para toda conversa',
                          'Código sempre completo e funcional',
                          'Segue suas preferências sempre',
                          'Configure uma vez, use para sempre',
                          'Resultado consistente e previsível',
                        ].map((item, i) => (
                          <li key={i} className="text-xs text-muted-lavender flex items-start gap-1.5">
                            <CheckCircle2 className="size-3 text-lime mt-0.5 shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claude also has system prompts */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <Brain className="size-4 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Claude também tem System Prompt!</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        O Claude tem um recurso equivalente chamado <strong className="text-foreground">System Prompt</strong>,
                        acessível em &quot;Project Settings&quot; ao criar um projeto. Funciona da mesma forma: instruções permanentes
                        que a IA segue em todas as mensagens. Se preferir o Claude, copie as mesmas instruções do AI Studio
                        e cole no System Prompt do Claude — funciona igualmente bem!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Step by step + Code example */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ChevronRight className="size-4 text-lime" />
                  Passo a passo para configurar no AI Studio
                </h4>

                {systemInstructionSteps.map((item) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: item.step * 0.05 }}
                  >
                    <Card className="bg-surface/80 border-white/6">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center text-lime font-bold text-sm">
                          {item.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <item.icon className="size-4 text-lime" />
                            <span className="font-medium text-sm text-foreground">{item.title}</span>
                          </div>
                          <p className="text-xs text-muted-lavender leading-relaxed">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* System Instructions code block */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6">
                    <Code2 className="size-4 text-lime" />
                    <span className="text-sm font-medium text-foreground">Exemplo completo de System Instructions</span>
                    <Badge variant="outline" className="ml-auto text-[10px] border-lime/20 text-lime">Copie e cole no AI Studio</Badge>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-xs text-muted-lavender overflow-x-auto max-h-72 overflow-y-auto custom-scrollbar">
                      <code>{systemInstructionExample}</code>
                    </pre>
                    <CopyButton text={systemInstructionExample} />
                  </div>
                  <div className="px-4 py-3 border-t border-white/6 bg-lime/5">
                    <p className="text-xs text-lime leading-relaxed">
                      <Lightbulb className="size-3 inline mr-1" />
                      Copie o conteúdo acima, cole no campo System Instructions do AI Studio e pronto — a IA sempre vai gerar código completo e seguir as regras da UEMS.
                      Funciona também no System Prompt do Claude!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* ─── PART 3: Model Selection (detailed) ─── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
              <Cpu className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Como Selecionar o Modelo no AI Studio</h3>
              <p className="text-sm text-muted-lavender">Gemini 2.5 Flash, Pro e mais — quando usar cada um</p>
            </div>
          </div>

          {/* Step-by-step for model selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* LEFT: How to select */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ChevronRight className="size-4 text-lime" />
                Como trocar de modelo
              </h4>

              {modelSelectionSteps.map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: item.step * 0.05 }}
                >
                  <Card className="bg-surface/80 border-white/6">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center text-lime font-bold text-sm">
                        {item.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <item.icon className="size-4 text-lime" />
                          <span className="font-medium text-sm text-foreground">{item.title}</span>
                        </div>
                        <p className="text-xs text-muted-lavender leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Temperature tip */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
                      <Settings className="size-4 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">O que é Temperature?</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                        Temperature controla a <strong className="text-foreground">criatividade</strong> da IA. Valores baixos = respostas mais precisas
                        e previsíveis. Valores altos = respostas mais criativas e variadas.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-lime/5 border border-lime/10">
                          <p className="text-xs font-semibold text-lime mb-1">0.0 — 0.3</p>
                          <p className="text-[11px] text-muted-lavender">Para código: preciso, determinístico, segue instruções à risca</p>
                        </div>
                        <div className="p-2 rounded-md bg-amber-400/5 border border-amber-400/10">
                          <p className="text-xs font-semibold text-amber-400 mb-1">0.7 — 1.0</p>
                          <p className="text-[11px] text-muted-lavender">Para texto criativo: brainstorm, redação, ideias variadas</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-lavender mt-2 leading-relaxed">
                        <strong className="text-foreground">Recomendação:</strong> Para gerar código, use Temperature baixa (0.1-0.2).
                        Para criatividade (nomes, textos, ideias), use Temperature alta (0.7-0.9).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Model cards */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ChevronRight className="size-4 text-lime" />
                Modelos disponíveis
              </h4>

              {models.map((model, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className={`bg-surface/80 border-white/6 ${model.recommended ? 'ring-1 ring-lime/20' : ''}`}>
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{model.name}</h4>
                          <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${model.badgeColor}`}>
                            {model.badge}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-muted-lavender mb-0.5">{model.speed}</div>
                          <div className="text-xs text-lime font-medium">{model.cost}</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-lavender leading-relaxed mb-4">{model.description}</p>

                      <div className="mb-3">
                        <span className="text-xs font-medium text-foreground mb-2 block">Ideal para:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {model.useCases.map((useCase, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.03] border border-white/6 text-xs text-muted-lavender"
                            >
                              <CheckCircle2 className="size-3 text-lime flex-shrink-0" />
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>

                      {model.recommended && (
                        <div className="p-3 rounded-lg bg-lime/5 border border-lime/10">
                          <p className="text-xs text-lime leading-relaxed">
                            <Sparkles className="size-3 inline mr-1" />
                            Para 90% das tarefas do dia a dia (formulários, dashboards, páginas de visualização), o Flash é tudo que você precisa.
                            É mais rápido, gratuito e gera código completo. Comece pelo Flash e só troque para o Pro se o resultado não estiver satisfatório.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Quick decision guide */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ArrowRight className="size-4 text-lime" />
                    Guia de decisão rápida
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <div className="px-2 py-1 rounded bg-lime/10 text-lime font-mono text-xs whitespace-nowrap">2.5 Flash</div>
                      <p className="text-xs text-muted-lavender">Rápido, gratuito, resolve 90% dos casos. <strong className="text-foreground">Comece por aqui.</strong></p>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <div className="px-2 py-1 rounded bg-purple-400/10 text-purple-400 font-mono text-xs whitespace-nowrap">2.5 Pro</div>
                      <p className="text-xs text-muted-lavender">Mais poderoso para código complexo. Use quando o Flash não gerar código completo ou tiver lógicas muito elaboradas.</p>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <div className="px-2 py-1 rounded bg-muted-lavender/10 text-muted-lavender font-mono text-xs whitespace-nowrap">2.0 Flash</div>
                      <p className="text-xs text-muted-lavender">Versão anterior. Prefira o 2.5.</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/6">
                    <p className="text-xs text-muted-lavender leading-relaxed">
                      <strong className="text-foreground">Estratégia recomendada:</strong> Comece com <strong className="text-lime">Gemini 2.5 Flash</strong> para todas as tarefas.
                      Se a resposta não estiver satisfatória (código incompleto, placeholders, lógica errada), troque para <strong className="text-purple-400">Gemini 2.5 Pro</strong>.
                      Se ainda assim não resolver, tente o mesmo prompt no <strong className="text-coral">Claude com Artifacts</strong> para visualizar o resultado em tempo real.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-lime text-lime-foreground hover:bg-lime/90 rounded-full px-8"
            >
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">
                Abrir Google AI Studio
                <ExternalLink className="size-4 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-coral/30 text-coral hover:bg-coral/5 rounded-full px-8"
            >
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                Abrir Claude
                <ExternalLink className="size-4 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sky-400/30 text-sky-400 hover:bg-sky-400/5 rounded-full px-8"
            >
              <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                Abrir Gemini
                <ExternalLink className="size-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
