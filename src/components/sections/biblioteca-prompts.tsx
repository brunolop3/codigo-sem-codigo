'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  Table2,
  ClipboardList,
  Calculator,
  FileText,
  BarChart3,
  FileSearch,
  ScanSearch,
  ListChecks,
  Map,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Types ─── */
type Category = 'Visualização' | 'Formulários' | 'Calculadoras' | 'Documentos'

interface PromptData {
  id: string
  title: string
  category: Category
  difficulty: number
  caso: string
  prompt: string
  icon: React.ElementType
}

/* ─── Category Colors ─── */
const categoryColors: Record<Category, { bg: string; text: string; border: string; iconBg: string }> = {
  Visualização: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/15 text-sky-400',
  },
  Formulários: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/15 text-violet-400',
  },
  Calculadoras: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  Documentos: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
}

/* ─── Filter Categories ─── */
const filterCategories = [
  { key: 'Todos', label: 'Todos' },
  { key: 'Formulários', label: 'Formulários/Cadastro' },
  { key: 'Visualização', label: 'Visualização de Tabelas' },
  { key: 'Calculadoras', label: 'Calculadoras/Lógica' },
  { key: 'Documentos', label: 'Documentos/Padronização' },
] as const

/* ─── 12 Prompt Cards ─── */
const prompts: PromptData[] = [
  {
    id: 'tabela-grande',
    title: 'Visualizador de Tabela Grande',
    category: 'Visualização',
    difficulty: 2,
    caso: 'Monitoramento ENADE com milhares de registros',
    icon: Table2,
    prompt: `Crie um visualizador de tabela grande em um único arquivo HTML com Google Apps Script.

Contexto: Preciso visualizar e monitorar dados do ENADE que possuem milhares de registros em uma planilha do Google Sheets.

O que precisa ter:
- Tabela com cabeçalho fixo (sticky header) que não rola com os dados
- Paginação com seletor de quantos registros por página (25, 50, 100)
- Campo de busca que filtra os dados em tempo real por qualquer coluna
- Ordenação ao clicar no cabeçalho da coluna (crescente/decrescente)
- Filtros por coluna com dropdown (ex: filtrar por Conceito, Unidade, Ano)
- Indicador de total de registros e registros filtrados
- Destaque visual na linha ao passar o mouse

Integração: Os dados vêm de uma aba chamada "Dados ENADE" no Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'formulario-cadastro',
    title: 'Formulário de Cadastro Padronizado',
    category: 'Formulários',
    difficulty: 2,
    caso: 'DIGES/secretaria cadastrando processos com dados limpos',
    icon: ClipboardList,
    prompt: `Crie um formulário de cadastro padronizado em um único arquivo HTML com Google Apps Script.

Contexto: A DIGES/secretaria precisa cadastrar processos com dados limpos e padronizados, sem erros de preenchimento.

O que precisa ter:
- Campos com dropdowns para evitar digitação livre (Tipo de Processo, Setor de Origem, Status)
- Validação obrigatória nos campos essenciais (número do processo, interessado, assunto)
- Auto-fill: ao digitar o número do processo, buscar dados parciais se já existir
- Formatação automática (CPF com máscara, datas no padrão DD/MM/AAAA)
- Campo de observações com limite de caracteres
- Botão "Limpar Formulário" e botão "Cadastrar"
- Toast verde de confirmação ao cadastrar com sucesso

Integração: Os dados devem ser salvos em uma aba chamada "Processos" no Google Sheets, cada campo em sua coluna.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'calculadora-prazos',
    title: 'Calculadora de Prazos Administrativos',
    category: 'Calculadoras',
    difficulty: 1,
    caso: 'Servidor calculando prazos de Resoluções e Portarias',
    icon: Calculator,
    prompt: `Crie uma calculadora de prazos administrativos em um único arquivo HTML com Google Apps Script.

Contexto: Servidores precisam calcular prazos de Resoluções e Portarias, considerando apenas dias úteis.

O que precisa ter:
- Seletor do tipo de processo (Resolução, Portaria, Despacho, Ofício)
- Campo de data inicial com seletor de calendário
- Campo de número de dias úteis
- Resultado mostrando a data final do prazo
- Timeline visual mostrando os dias úteis contados
- Alerta automático se o prazo cair em feriado nacional (lista embutida)
- Botão para inverter: dado a data final, calcular quantos dias úteis restam
- Histórico dos últimos cálculos na mesma página

Funcionamento: Ao selecionar o tipo e informar a data + prazo, calcular automaticamente considerando apenas dias úteis (segunda a sexta) e feriados.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'painel-indicadores',
    title: 'Painel de Indicadores (KPIs)',
    category: 'Visualização',
    difficulty: 2,
    caso: 'PROE acompanhando planos de ação das unidades',
    icon: BarChart3,
    prompt: `Crie um painel de indicadores (KPIs) em um único arquivo HTML com Google Apps Script.

Contexto: O PROE precisa acompanhar os planos de ação das unidades universitárias, com visão consolidada dos indicadores.

O que precisa ter:
- 4 KPI Cards no topo: Total de Ações, Em Andamento, Concluídas, Atrasadas
- Gráfico de barras mostrando andamento por unidade
- Filtros por Unidade, Semestre e Status
- Tabela detalhada abaixo com todas as ações
- Indicador visual de percentual de conclusão com barra de progresso
- Atualização automática ao trocar filtros

Integração: Os dados vêm de uma aba chamada "Planos de Ação" no Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'controle-tramitacao',
    title: 'Controle de Tramitação',
    category: 'Formulários',
    difficulty: 2,
    caso: 'Setor de diplomas controlando entrada/saída de documentos',
    icon: FileSearch,
    prompt: `Crie um sistema de controle de tramitação em um único arquivo HTML com Google Apps Script.

Contexto: O setor de diplomas precisa controlar a entrada e saída de documentos, sabendo exatamente onde cada documento está.

O que precisa ter:
- Formulário de registro: protocolo, tipo de documento, setor de origem, setor de destino, data
- Atualização de status: Recebido, Em Análise, Encaminhado, Concluído
- Busca por número de protocolo com visualização da timeline do documento
- Lista de documentos no setor atual do usuário
- Timeline visual mostrando o histórico de tramitações de cada documento
- Filtro por status e por setor

Integração: Dados salvos em duas abas no Google Sheets: "Documentos" e "Tramitações".

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'faxina-planilha',
    title: 'Faxina de Planilha',
    category: 'Documentos',
    difficulty: 3,
    caso: 'Planilha que foi preenchida de forma inconsistente ao longo dos anos',
    icon: ScanSearch,
    prompt: `Crie um script de faxina de planilha usando Google Apps Script.

Contexto: Temos uma planilha que foi preenchida de forma inconsistente ao longo dos anos por diferentes pessoas. Precisamos identificar e relatar os problemas sem modificar os dados originais.

O que precisa ter (Script apenas, sem interface):
- Detectar linhas com células vazias em colunas obrigatórias
- Identificar datas em formatos diferentes (DD/MM/AAAA vs MM/DD/AAAA vs texto)
- Encontrar duplicatas baseado em colunas-chave que o usuário define
- Detectar textos onde deveriam haver números (ex: "cinco" em vez de "5")
- Identificar células com espaços extras no início ou fim
- Gerar relatório em uma nova aba chamada "Relatório Faxina" com: tipo de problema, linha, coluna, valor encontrado, sugestão de correção
- NÃO modificar a aba original de forma alguma
- Mostrar resumo no final: total de problemas encontrados por tipo

Funcionamento: O script roda na planilha ativa e gera apenas o relatório.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'registro-portaria',
    title: 'Registro de Portaria',
    category: 'Formulários',
    difficulty: 1,
    caso: 'Portaria registrando entrada/saída de malotes',
    icon: ClipboardList,
    prompt: `Crie um formulário de registro de portaria em um único arquivo HTML com Google Apps Script.

Contexto: O porteiro precisa registrar de forma rápida a entrada e saída de malotes e correspondências na portaria da UEMS.

O que precisa ter:
- Data e hora preenchidos automaticamente (agora)
- Dropdown: Tipo (Entrada/Saída)
- Dropdown: Tipo de Item (Malote, Correspondência, Encomenda, Documento)
- Campo: Remetente/Destino
- Campo: Setor
- Campo: Observações (opcional)
- Botão "Registrar" grande e visível
- Após registrar, limpar o formulário e mostrar Toast verde de confirmação
- Lista dos últimos 10 registros do dia na mesma página

Integração: Salvar cada registro como uma linha na aba "Registros Portaria" do Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'gerador-relatorio',
    title: 'Gerador de Relatório',
    category: 'Documentos',
    difficulty: 2,
    caso: 'Coletar dados da planilha e gerar relatório formatado',
    icon: FileText,
    prompt: `Crie um gerador de relatório em um único arquivo HTML com Google Apps Script.

Contexto: Preciso coletar dados de uma planilha e gerar relatórios formatados automaticamente para apresentação ou envio por e-mail.

O que precisa ter:
- Seletor de período (data inicial e data final)
- Seletor de tipo de relatório (Resumido, Detalhado, Comparativo)
- Seção de KPIs com os totais do período
- Tabela com os dados filtrados e formatados
- Gráfico simples (barras ou pizza) mostrando distribuição
- Botão "Gerar Relatório" que monta tudo na tela
- Botão "Exportar HTML" que gera versão para impressão/salvamento

Integração: Lê dados da aba "Dados" no Google Sheets. O relatório é gerado na tela e pode ser exportado.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'agenda-reunioes',
    title: 'Agenda de Reuniões',
    category: 'Formulários',
    difficulty: 1,
    caso: 'Secretaria organizando reuniões com pauta e participantes',
    icon: ClipboardList,
    prompt: `Crie uma agenda de reuniões em um único arquivo HTML com Google Apps Script.

Contexto: A secretaria precisa organizar reuniões com pauta e lista de participantes, de forma centralizada.

O que precisa ter:
- Formulário: Data/Hora, Local, Pauta (itens separados), Lista de Participantes
- Calendário visual mensal mostrando os dias com reunião marcada
- Lista de próximas reuniões ordenada por data
- Ao clicar em uma reunião, ver detalhes completos (pauta e participantes)
- Indicador de conflito: avisar se já existe reunião no mesmo horário/local
- Status: Agendada, Realizada, Cancelada

Integração: Dados salvos na aba "Reuniões" do Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'consulta-processos',
    title: 'Consulta de Processos',
    category: 'Visualização',
    difficulty: 2,
    caso: 'Servidor consultando situação de processos por número ou setor',
    icon: ScanSearch,
    prompt: `Crie uma interface de consulta de processos em um único arquivo HTML com Google Apps Script.

Contexto: Servidores precisam consultar a situação de processos por número ou setor, de forma rápida e intuitiva.

O que precisa ter:
- Campo de busca principal por número de protocolo (busca instantânea)
- Filtro por setor e por status
- Resultado mostrado em card com: protocolo, interessado, assunto, setor atual, status, última movimentação
- Histórico de tramitações do processo consultado (timeline)
- Se não encontrar, mostrar mensagem amigável
- Lista de processos recentes na tela inicial
- Busca também por nome do interessado

Integração: Consulta os dados na aba "Processos" do Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'checklist-conformidade',
    title: 'Checklist de Conformidade',
    category: 'Documentos',
    difficulty: 1,
    caso: 'Verificar se processos estão com todos os documentos obrigatórios',
    icon: ListChecks,
    prompt: `Crie um checklist de conformidade em um único arquivo HTML com Google Apps Script.

Contexto: Preciso verificar se os processos estão com todos os documentos obrigatórios antes de encaminhar, garantindo que nada esteja faltando.

O que precisa ter:
- Lista de documentos obrigatórios com checkbox (Requerimento, RG, CPF, Comprovante de Residência, Diploma, Histórico, etc.)
- Barra de progresso mostrando percentual de conformidade
- Ao marcar/desmarcar, atualizar a barra automaticamente
- Campo para adicionar observação em cada item
- Indicador visual: verde (conforme), vermelho (não conforme), amarelo (parcial)
- Botão "Salvar Avaliação" que registra no Google Sheets
- Resumo final: quantos itens conforme, não conforme e percentual total

Integração: Salvar na aba "Avaliações" do Google Sheets com data, número do processo e status de cada item.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
  {
    id: 'mapa-cursos',
    title: 'Mapa de Cursos por Unidade',
    category: 'Visualização',
    difficulty: 3,
    caso: 'Reitoria visualizando distribuição de cursos entre campus',
    icon: Map,
    prompt: `Crie um mapa de cursos por unidade em um único arquivo HTML com Google Apps Script.

Contexto: A Reitoria precisa visualizar a distribuição de cursos entre os campus da UEMS, para planejamento e tomada de decisão.

O que precisa ter:
- Tabela interativa: Unidades nas linhas, áreas de conhecimento nas colunas, número de cursos nas células
- Filtros por área de conhecimento, modalidade (Presencial/EAD), turno
- Cards de resumo no topo: Total de Cursos, Unidade com mais cursos, Área com mais oferta
- Gráfico de barras horizontais mostrando cursos por unidade
- Gráfico de pizza mostrando distribuição por área
- Ao clicar em uma célula da tabela, mostrar detalhes dos cursos daquela unidade/área
- Destaque visual para unidades com menos de 3 cursos (sinal de alerta)

Integração: Os dados vêm da aba "Cursos" do Google Sheets.

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`,
  },
]

/* ─── Difficulty Stars ─── */
function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="text-xs tracking-wide" aria-label={`Dificuldade ${level} de 3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={i < level ? 'text-amber-400' : 'text-white/15'}>
          {i < level ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

/* ─── Main Component ─── */
export default function BibliotecaPrompts() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts =
    activeFilter === 'Todos'
      ? prompts
      : prompts.filter((p) => p.category === activeFilter)

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
    setCopiedId(id)
    toast.success('Prompt copiado!', {
      description: 'Cole no ChatGPT, Gemini ou outra IA.',
    })
    setTimeout(() => setCopiedId(null), 2500)
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="biblioteca" className="relative py-20 sm:py-28">
      {/* Decorative glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-lime/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <BookOpen className="size-3.5" />
            Pronto para Usar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Biblioteca de{' '}
            <span className="text-lime">Prompts</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Prompts completos e testados para situações reais da UEMS
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveFilter(cat.key)
                  setExpandedId(null)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-lime text-navy border-lime shadow-lg shadow-lime/20'
                    : 'bg-white/[0.04] text-muted-lavender border-white/8 hover:bg-white/[0.08] hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt, i) => {
              const colors = categoryColors[prompt.category]
              const isExpanded = expandedId === prompt.id
              const Icon = prompt.icon

              return (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card
                    className={`h-full bg-surface/80 border-white/6 hover:border-lime/20 transition-all duration-300 group ${
                      isExpanded ? 'sm:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <CardContent className="p-5 sm:p-6">
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`}>
                            <Icon className="size-4.5" />
                          </div>
                          <Badge
                            className={`${colors.bg} ${colors.text} border ${colors.border} text-[10px] font-medium px-2 py-0.5`}
                          >
                            {prompt.category}
                          </Badge>
                        </div>
                        <DifficultyStars level={prompt.difficulty} />
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors text-sm leading-snug mb-2">
                        {prompt.title}
                      </h3>

                      {/* Use case */}
                      <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                        {prompt.caso}
                      </p>

                      {/* Expand toggle */}
                      <button
                        onClick={() => toggleExpand(prompt.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-lime/80 hover:text-lime transition-colors cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="size-3.5" />
                        </motion.div>
                        {isExpanded ? 'Fechar prompt' : 'Ver prompt completo'}
                      </button>

                      {/* Expandable prompt area */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 rounded-lg border border-white/8 bg-[hsl(240,6%,6%)] p-4 relative">
                              {/* Copy button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(prompt.prompt, prompt.id)}
                                className={`absolute top-2 right-2 h-7 gap-1.5 text-xs font-medium transition-all z-10 ${
                                  copiedId === prompt.id
                                    ? 'text-lime bg-lime/10 hover:bg-lime/15'
                                    : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
                                }`}
                              >
                                {copiedId === prompt.id ? (
                                  <>
                                    <Check className="size-3" />
                                    Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" />
                                    Copiar
                                  </>
                                )}
                              </Button>

                              <pre className="text-xs leading-[1.7] font-mono text-foreground/80 whitespace-pre-wrap pr-16">
                                {prompt.prompt}
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom tip */}
        <motion.div
          className="mt-10 rounded-xl border border-lime/20 bg-lime/5 p-5 sm:p-6 relative overflow-hidden"
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
              <h3 className="font-semibold text-foreground mb-1.5">
                Copie, cole e adapte!
              </h3>
              <p className="text-sm text-muted-lavender leading-relaxed">
                Todos os prompts estão prontos para uso. Clique em &quot;Ver prompt completo&quot;, copie o texto
                e cole diretamente no ChatGPT, Gemini ou outra IA. Adapte os campos entre colchetes
                para a realidade do seu setor — quanto mais específico, melhor o resultado.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
