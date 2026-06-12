'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Layers,
  PanelTop,
  Search,
  Bell,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const visualTerms = [
  {
    id: 'kpi',
    icon: BarChart3,
    title: 'KPI Cards (Cartões de Indicadores)',
    description:
      'São aquelas caixinhas que ficam no topo da tela com números grandes resumindo a informação (ex: "Total de Alunos: 150").',
    howToAsk: 'Crie 4 KPI Cards no topo da página mostrando o resumo dos dados.',
    color: 'lime',
  },
  {
    id: 'modais',
    icon: Layers,
    title: 'Modais (Janelas Pop-up)',
    description:
      'É aquela janela que abre "por cima" da tela atual (borrando o fundo) para você preencher um formulário ou ler um aviso, sem precisar sair da página.',
    howToAsk: "Ao clicar no botão 'Novo Cadastro', abra um Modal centralizado contendo o formulário.",
    color: 'coral',
  },
  {
    id: 'abas',
    icon: PanelTop,
    title: 'Abas (Tabs)',
    description:
      'Perfeitas para organizar muita informação sem poluir a tela. Você clica nos botões (ex: "Visualizar Vagas", "Visualizar Concluintes") e a tela muda o conteúdo na mesma página.',
    howToAsk: 'Divida o painel usando 3 Abas navegáveis para separar os assuntos.',
    color: 'lime',
  },
  {
    id: 'filtros',
    icon: Search,
    title: 'Filtros e Barras de Busca',
    description:
      'Menus suspensos e caixas de texto que ajudam a encontrar dados específicos em tabelas gigantes.',
    howToAsk: 'Adicione uma barra de pesquisa e menus de Filtro (por Curso e Unidade) acima da tabela.',
    color: 'coral',
  },
  {
    id: 'toasts',
    icon: Bell,
    title: 'Toasts (Notificações Flutuantes)',
    description:
      'Aqueles avisos pequenos e elegantes (geralmente verdes ou vermelhos) que aparecem no canto inferior da tela dizendo "Salvo com sucesso!" e somem sozinhos após alguns segundos.',
    howToAsk:
      'Quando o usuário enviar os dados, mostre um Toast verde no canto da tela confirmando o envio.',
    color: 'lime',
  },
]

export default function VisualDictionary() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
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
    setCopied(id)
    setTimeout(() => setCopied(null), 2500)
  }

  return (
    <section id="dicionario" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <BookOpen className="size-3.5" />
            Dicionário Visual
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            O &quot;Dicionário&quot; do{' '}
            <span className="relative inline-block">
              Visual
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-lime/60 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Peças incríveis que você pode pedir para a IA. Quando desenvolvemos painéis avançados,
            usamos elementos visuais que dão aquela &quot;cara de sistema oficial&quot;. Você não
            precisa saber programar nada disso, mas saber o nome dessas peças ajuda muito na hora
            de pedir para a Inteligência Artificial.
          </p>
        </motion.div>

        {/* Visual terms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visualTerms.map((term, i) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full bg-surface/80 border-white/6 hover:border-lime/20 transition-all duration-300 pattern-card group">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        term.color === 'lime'
                          ? 'bg-lime/10 text-lime'
                          : 'bg-coral/10 text-coral'
                      }`}
                    >
                      <term.icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors text-sm leading-snug">
                      {term.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                    {term.description}
                  </p>

                  {/* Como pedir */}
                  <div
                    className={`rounded-lg border p-3 ${
                      term.color === 'lime'
                        ? 'bg-lime/5 border-lime/15'
                        : 'bg-coral/5 border-coral/15'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                        term.color === 'lime' ? 'text-lime' : 'text-coral'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Como pedir:
                    </p>
                    <p className="text-xs text-foreground/80 leading-relaxed italic">
                      &quot;{term.howToAsk}&quot;
                    </p>
                    <button
                      onClick={() => handleCopy(term.howToAsk, term.id)}
                      className={`mt-2 text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors cursor-pointer ${
                        copied === term.id
                          ? 'text-lime bg-lime/10'
                          : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {copied === term.id ? (
                        <>
                          <Check className="size-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          Copiar frase
                        </>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tip box */}
        <motion.div
          className="mt-8 rounded-xl border border-lime/20 bg-lime/5 p-5 sm:p-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
              <BookOpen className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Se você usar esses termos no seu prompt, a IA saberá exatamente o que fazer!
              </h3>
              <p className="text-sm text-muted-lavender leading-relaxed">
                Esses são os nomes técnicos que desenvolvedores usam. Quando você pede um &quot;Modal&quot;
                ou um &quot;Toast&quot;, a IA entende perfeitamente o componente visual que você quer
                e já entrega algo muito mais próximo do resultado final.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
