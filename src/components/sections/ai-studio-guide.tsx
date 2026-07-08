'use client'

import { motion } from 'framer-motion'
import {
  Settings,
  BookOpen,
  Cpu,
  MessageSquare,
  Code2,
  FileCode2,
  Lightbulb,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

const systemInstructionSteps = [
  {
    step: 1,
    title: 'Acesse o Google AI Studio',
    description: 'Abra o site aistudio.google.com no navegador. Faça login com sua conta Google (pode ser a institucional @uems.br).',
    icon: ExternalLink,
  },
  {
    step: 2,
    title: 'Crie um novo prompt',
    description: 'Na tela inicial, clique em "Create new prompt" ou "Criar novo prompt". Isso abrirá o editor de System Instructions.',
    icon: BookOpen,
  },
  {
    step: 3,
    title: 'Encontre o campo System Instructions',
    description: 'No lado direito do editor, procure o campo "System Instructions" (Instruções do Sistema). É um campo de texto grande, separado da área de chat.',
    icon: MessageSquare,
  },
  {
    step: 4,
    title: 'Cole as instruções',
    description: 'Copie o conteúdo da caixa ao lado e cole no campo System Instructions. Essas instruções vão guiar TODAS as respostas da IA, sem precisar repetir em cada mensagem.',
    icon: Copy,
  },
]

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

export default function AiStudioGuide() {
  return (
    <section id="ai-studio" className="relative py-20 sm:py-28">
      {/* Decorative glows */}
      <div className="absolute top-10 left-0 w-60 h-60 bg-lime/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-400/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            Domine o{' '}
            <span className="text-lime">Google AI Studio</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Aprenda a configurar System Instructions e escolher o modelo ideal para cada tarefa — e nunca mais repita as mesmas instruções.
          </p>
        </motion.div>

        {/* Two-column layout: System Instructions + Model Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: System Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">System Instructions</h3>
                <p className="text-sm text-muted-lavender">Instruções permanentes para a IA</p>
              </div>
            </div>

            {/* What are System Instructions? */}
            <div className="space-y-4">
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Lightbulb className="size-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">O que são System Instructions?</h4>
                      <p className="text-sm text-muted-lavender leading-relaxed">
                        System Instructions são instruções <strong className="text-foreground">permanentess</strong> que definem o comportamento da IA
                        em <strong className="text-foreground">todas</strong> as mensagens da conversa. Diferente de colar as regras em cada mensagem,
                        as System Instructions ficam salvas no prompt e a IA sempre as segue — sem repetir, sem esquecer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
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
                </CardContent>
              </Card>

              {/* Step by step */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ChevronRight className="size-4 text-lime" />
                  Passo a passo para configurar
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

                {/* System Instructions code block */}
                <Card className="bg-surface/80 border-white/6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6">
                      <Code2 className="size-4 text-lime" />
                      <span className="text-sm font-medium text-foreground">Exemplo completo de System Instructions</span>
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
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Model Selection */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
                <Cpu className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Escolhendo o Modelo</h3>
                <p className="text-sm text-muted-lavender">Gemini 2.5 Flash vs Pro</p>
              </div>
            </div>

            <div className="space-y-4">
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
                            Para 90% das tarefas do dia a dia (formulários, dashboards, páginas de visualização), o Flash é tudo que você precisa. É mais rápido, gratuito e gera código completo. Comece pelo Flash e só troque para o Pro se o resultado não estiver satisfatório.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Quick comparison card */}
              <Card className="bg-surface/80 border-white/6">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ChevronRight className="size-4 text-lime" />
                    Resumo rápido
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <div className="px-2 py-1 rounded bg-lime/10 text-lime font-mono text-xs whitespace-nowrap">2.5 Flash</div>
                      <p className="text-xs text-muted-lavender">Rápido, gratuito, resolve 90% dos casos. Comece por aqui.</p>
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
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}
