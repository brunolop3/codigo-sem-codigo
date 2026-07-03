'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Copy,
  Check,
  Eye,
  FileSpreadsheet,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Pin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { toast } from 'sonner'

/* ─── Deterministic Mock Data Generation ─── */
const UNIDADES = [
  'Aquidauana',
  'Campo Grande',
  'Dourados',
  'Paranaíba',
  'Nova Andradina',
  'Naviraí',
  'Coxim',
  'Amambaí',
  'Ivinhema',
  'Ponta Porã',
]

const CURSOS = [
  'Administração',
  'Ciências Biológicas',
  'Pedagogia',
  'Direito',
  'Psicologia',
  'Enfermagem',
  'Medicina',
  'Letras',
  'Engenharia Civil',
  'Matemática',
  'Agronomia',
  'Zootecnia',
  'Ciência da Computação',
  'Sistemas de Informação',
  'Geografia',
  'Contabilidade',
  'Turismo',
  'Serviço Social',
  'Educação Física',
  'Fisioterapia',
]

const GRAUS = ['Bacharelado', 'Licenciatura', 'Tecnológico']
const CONCEITOS = [1, 2, 3, 4, 5]
const ANOS = [2019, 2020, 2021, 2022, 2023]

// Deterministic seed: combine unidade index + curso index + grau index + ano index
interface Registro {
  unidade: string
  codigo: string
  curso: string
  grau: string
  conceito: number
  ano: number
}

function generateData(): Registro[] {
  const records: Registro[] = []
  for (let u = 0; u < UNIDADES.length; u++) {
    for (let c = 0; c < 5; c++) {
      // 5 courses per unit = 50 total
      const cursoIdx = (u * 5 + c) % CURSOS.length
      const grauIdx = (u + c) % GRAUS.length
      const anoIdx = (u + c) % ANOS.length
      const conceitoIdx = (u * 3 + c * 7) % 5
      const codigo = String(1000 + u * 50 + c).padStart(4, '0')
      records.push({
        unidade: UNIDADES[u],
        codigo,
        curso: CURSOS[cursoIdx],
        grau: GRAUS[grauIdx],
        conceito: CONCEITOS[conceitoIdx],
        ano: ANOS[anoIdx],
      })
    }
  }
  return records
}

const DATA = generateData()

/* ─── Semáforo colors ─── */
function getSemaforoDot(conceito: number) {
  switch (conceito) {
    case 1:
      return 'bg-red-600 shadow-sm shadow-red-600/40'
    case 2:
      return 'bg-orange-500 shadow-sm shadow-orange-500/40'
    case 3:
      return 'bg-yellow-400 shadow-sm shadow-yellow-400/40'
    case 4:
      return 'bg-green-400 shadow-sm shadow-green-400/40'
    case 5:
      return 'bg-green-700 shadow-sm shadow-green-700/40'
    default:
      return 'bg-white/20'
  }
}

function getSemaforoLabel(conceito: number) {
  switch (conceito) {
    case 1: return 'Crítico'
    case 2: return 'Atenção'
    case 3: return 'Adequado'
    case 4: return 'Bom'
    case 5: return 'Excelente'
    default: return '-'
  }
}

/* ─── Chart config ─── */
const chartConfig = {
  quantidade: {
    label: 'Quantidade',
    color: '#C8FF2E',
  },
}

/* ─── Copy button helper ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Prompt copiado!', { description: 'Cole no seu AI favorito' })
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className="absolute top-3 right-3 h-8 gap-1.5 text-xs border-white/10 bg-white/5 hover:bg-white/10 hover:text-lime"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copiado!' : 'Copiar'}
    </Button>
  )
}

/* ─── Mini Table Component (reused across demos) ─── */
function MiniTable({
  data,
  columns,
  maxRows,
}: {
  data: Registro[]
  columns?: { key: keyof Registro; label: string }[]
  maxRows?: number
}) {
  const cols = columns ?? [
    { key: 'unidade' as keyof Registro, label: 'Unidade' },
    { key: 'codigo' as keyof Registro, label: 'Código' },
    { key: 'curso' as keyof Registro, label: 'Curso' },
    { key: 'grau' as keyof Registro, label: 'Grau' },
    { key: 'conceito' as keyof Registro, label: 'Conceito' },
    { key: 'ano' as keyof Registro, label: 'Ano' },
  ]
  const display = maxRows ? data.slice(0, maxRows) : data
  return (
    <div className="overflow-x-auto rounded-lg border border-white/6">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-white/5">
            {cols.map((col) => (
              <th key={col.key} className="px-3 py-2 text-left font-medium text-muted-lavender whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {display.map((row, i) => (
            <tr key={i} className="border-t border-white/4 hover:bg-white/3 transition-colors">
              {cols.map((col) => (
                <td key={col.key} className="px-3 py-1.5 whitespace-nowrap text-foreground/80">
                  {col.key === 'conceito' ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${getSemaforoDot(row[col.key] as number)}`} />
                      {row[col.key]}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Demo a) Busca Instantânea ─── */
function BuscaDemo() {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    if (!search.trim()) return DATA.slice(0, 6)
    const q = search.toLowerCase()
    return DATA.filter(
      (r) =>
        r.unidade.toLowerCase().includes(q) ||
        r.codigo.includes(q) ||
        r.curso.toLowerCase().includes(q) ||
        r.grau.toLowerCase().includes(q) ||
        String(r.conceito).includes(q) ||
        String(r.ano).includes(q)
    ).slice(0, 8)
  }, [search])

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-lavender" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busque em qualquer coluna..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-lavender focus:outline-none focus:border-lime/40 focus:ring-1 focus:ring-lime/20 transition-all"
        />
        {search && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-lavender">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <MiniTable data={filtered} maxRows={8} />
      {search && filtered.length === 0 && (
        <p className="text-center text-sm text-muted-lavender py-4">Nenhum registro encontrado para &quot;{search}&quot;</p>
      )}
    </div>
  )
}

/* ─── Demo b) Filtros Combinados ─── */
function FiltrosCombinadosDemo() {
  const [unidade, setUnidade] = useState('')
  const [grau, setGrau] = useState('')
  const [conceito, setConceito] = useState('')

  const filtered = useMemo(() => {
    return DATA.filter((r) => {
      if (unidade && r.unidade !== unidade) return false
      if (grau && r.grau !== grau) return false
      if (conceito && r.conceito !== Number(conceito)) return false
      return true
    }).slice(0, 8)
  }, [unidade, grau, conceito])

  const uniqueUnidades = [...new Set(DATA.map((r) => r.unidade))].sort()
  const uniqueGraus = [...new Set(DATA.map((r) => r.grau))].sort()
  const uniqueConceitos = [...new Set(DATA.map((r) => r.conceito))].sort((a, b) => a - b)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-foreground focus:outline-none focus:border-lime/40 transition-all"
        >
          <option value="">Todas as Unidades</option>
          {uniqueUnidades.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select
          value={grau}
          onChange={(e) => setGrau(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-foreground focus:outline-none focus:border-lime/40 transition-all"
        >
          <option value="">Todos os Graus</option>
          {uniqueGraus.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={conceito}
          onChange={(e) => setConceito(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-foreground focus:outline-none focus:border-lime/40 transition-all"
        >
          <option value="">Todos os Conceitos</option>
          {uniqueConceitos.map((c) => (
            <option key={c} value={c}>{c} — {getSemaforoLabel(c)}</option>
          ))}
        </select>
      </div>
      <p className="text-xs text-muted-lavender">
        {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>
      <MiniTable data={filtered} maxRows={8} />
    </div>
  )
}

/* ─── Demo c) Paginação ─── */
function PaginacaoDemo() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const totalPages = Math.ceil(DATA.length / perPage)
  const start = (page - 1) * perPage
  const paginatedData = useMemo(() => DATA.slice(start, start + perPage), [start, perPage])

  const pageNumbers: (number | string)[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pageNumbers.push(i)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return (
    <div className="space-y-3">
      <MiniTable data={paginatedData} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-lavender">
          <span>
            Mostrando {start + 1}–{Math.min(start + perPage, DATA.length)} de {DATA.length}
          </span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value))
              setPage(1)
            }}
            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-foreground focus:outline-none"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="h-7 w-7 p-0 border-white/10 bg-white/5 hover:bg-white/10"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          {pageNumbers.map((p, i) =>
            typeof p === 'string' ? (
              <span key={`dots-${i}`} className="px-1 text-xs text-muted-lavender">...</span>
            ) : (
              <Button
                key={p}
                size="sm"
                variant={p === page ? 'default' : 'outline'}
                onClick={() => setPage(p)}
                className={
                  p === page
                    ? 'h-7 w-7 p-0 bg-lime text-navy font-bold hover:bg-lime-dark'
                    : 'h-7 w-7 p-0 border-white/10 bg-white/5 hover:bg-white/10'
                }
              >
                {p}
              </Button>
            )
          )}
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="h-7 w-7 p-0 border-white/10 bg-white/5 hover:bg-white/10"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Demo d) Cabeçalho Fixo ─── */
function CabecalhoFixoDemo() {
  return (
    <div className="space-y-3">
      <div className="max-h-48 overflow-y-auto rounded-lg border border-white/6">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-surface/95 backdrop-blur-sm border-b border-white/10">
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">
                <Pin className="inline h-3 w-3 mr-1" />Unidade
              </th>
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">Código</th>
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">Curso</th>
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">Grau</th>
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">Conceito</th>
              <th className="px-3 py-2 text-left font-medium text-lime whitespace-nowrap">Ano</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((row, i) => (
              <tr key={i} className="border-t border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.unidade}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.codigo}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.curso}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.grau}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${getSemaforoDot(row.conceito)}`} />
                    {row.conceito}
                  </span>
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.ano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-lavender bg-white/3 rounded-lg px-3 py-2">
        <Pin className="h-3.5 w-3.5 text-lime" />
        <span>O cabeçalho permanece visível enquanto você rola. Role a tabela acima para ver!</span>
      </div>
    </div>
  )
}

/* ─── Demo e) Ordenação ─── */
function OrdenacaoDemo() {
  type SortKey = keyof Registro
  const [sortKey, setSortKey] = useState<SortKey>('unidade')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sorted = useMemo(() => {
    return [...DATA].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const mod = sortDir === 'asc' ? 1 : -1
      if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mod
      return String(aVal).localeCompare(String(bVal)) * mod
    }).slice(0, 8)
  }, [sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'unidade', label: 'Unidade' },
    { key: 'codigo', label: 'Código' },
    { key: 'curso', label: 'Curso' },
    { key: 'grau', label: 'Grau' },
    { key: 'conceito', label: 'Conceito' },
    { key: 'ano', label: 'Ano' },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-lavender">Clique em qualquer cabeçalho para ordenar</p>
      <div className="overflow-x-auto rounded-lg border border-white/6">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer hover:text-lime transition-colors select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="h-3 w-3 text-lime" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-lime" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 text-muted-lavender/50" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={i} className="border-t border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.unidade}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.codigo}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.curso}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.grau}</td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${getSemaforoDot(row.conceito)}`} />
                    {row.conceito}
                  </span>
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-foreground/80">{row.ano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Copy-ready prompt text ─── */
const PROMPT_TEXT = `Crie um Visualizador de Planilha Gigante — uma ferramenta web em um único arquivo HTML com tema escuro.

REGRAS IMPORTANTES:
1. ANTES de gerar o código, pergunte quais são as colunas da minha planilha e qual é o conteúdo aproximado
2. Use tema escuro (fundo #0A0A0F, texto #F0F0F5, acentos #C8FF2E)
3. Tudo deve funcionar em um ÚNICO arquivo HTML (CSS + JS inline)

FUNCIONALIDADES OBRIGATÓRIAS:

1. BUSCA INSTANTÂNEA
   - Campo de busca no topo que filtra em TODAS as colunas em tempo real
   - Destaque (highlight) do termo buscado nos resultados

2. FILTROS COMBINADOS
   - Dropdowns para cada coluna categórica
   - Os filtros funcionam JUNTOS (AND), não isolados
   - Mostrar contagem de resultados filtrados

3. PAGINAÇÃO COMPLETA
   - Controles: Anterior, números de página, Próximo
   - Seletor de itens por página (10, 25, 50, Todos)
   - Texto "Mostrando X–Y de Z registros"

4. CABEÇALHO FIXO
   - Cabeçalho sticky que permanece visível ao rolar
   - Colunas com largura adequada, sem quebra de linha

5. ORDENAÇÃO
   - Clicar no cabeçalho ordena asc/desc
   - Indicador visual (▲/▼) mostrando direção atual
   - Ordenação numérica para números, alfabética para texto

DESIGN:
- Tabela com linhas alternadas sutis
- Hover nas linhas
- Responsivo (scroll horizontal em telas pequenas)
- Semáforo de cores para valores 1-5 (vermelho→verde)
- Badge com total de registros e filtros ativos

DADOS: Cole aqui um trecho da sua planilha (5-10 linhas) para eu adaptar.`

/* ─── Main Component ─── */
export default function DomandoTabelas() {
  const [promptCopied, setPromptCopied] = useState(false)

  // Chart data
  const conceitoDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0]
    DATA.forEach((r) => {
      dist[r.conceito - 1]++
    })
    return CONCEITOS.map((c, i) => ({
      conceito: `${c} — ${getSemaforoLabel(c)}`,
      quantidade: dist[i],
    }))
  }, [])

  // KPI data
  const kpiData = useMemo(() => {
    const total = DATA.length
    const media = DATA.reduce((sum, r) => sum + r.conceito, 0) / total
    const excelentes = DATA.filter((r) => r.conceito >= 4).length
    const criticos = DATA.filter((r) => r.conceito <= 2).length
    return { total, media, excelentes, criticos }
  }, [])

  return (
    <section id="tabelas" className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* ─── 1. Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <Badge variant="outline" className="border-coral/30 text-coral bg-coral/10 px-4 py-1.5 text-sm gap-2">
            <Database className="h-4 w-4" />
            O Desafio Real
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Domando{' '}
            <span className="text-coral underline decoration-coral/40 underline-offset-8 decoration-4">
              Tabelas
            </span>
          </h2>
          <p className="text-lg text-muted-lavender max-w-2xl mx-auto">
            A dor de lidar com planilhas gigantes — milhares de linhas, nenhuma informação encontrável.
            <br />
            Aqui está como transformar isso.
          </p>
        </motion.div>

        {/* ─── 2. The Problem Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-coral/20 bg-surface overflow-hidden">
            <CardContent className="p-6 space-y-5">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-coral" />
                O Pesadelo da Planilha
              </h3>

              {/* Mock spreadsheet nightmare */}
              <div className="rounded-lg border border-white/6 overflow-hidden bg-white/[0.02]">
                {/* Fake toolbar */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border-b border-white/6 text-[10px] text-muted-lavender">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2">Planilha1 — Google Sheets</span>
                </div>
                {/* Fake formula bar */}
                <div className="px-3 py-1 bg-white/3 border-b border-white/4 text-[9px] text-muted-lavender font-mono">
                  fx = 
                </div>
                {/* Fake spreadsheet grid */}
                <div className="overflow-hidden" style={{ maxHeight: '140px' }}>
                  <table className="w-full text-[8px] leading-tight">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-1 py-0.5 text-muted-lavender font-normal border-r border-white/4"></th>
                        {Array.from({ length: 26 }, (_, i) => (
                          <th key={i} className="px-1 py-0.5 text-muted-lavender font-normal border-r border-white/4 min-w-[48px]">
                            {String.fromCharCode(65 + i)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 20 }, (_, row) => (
                        <tr key={row} className={row % 2 === 0 ? 'bg-white/[0.01]' : ''}>
                          <td className="px-1 py-0.5 text-muted-lavender border-r border-white/4 text-center">{row + 1}</td>
                          {Array.from({ length: 26 }, (_, col) => (
                            <td key={col} className="px-1 py-0.5 border-r border-white/4 text-foreground/40 truncate">
                              {row === 0
                                ? ['Unidade', 'Código', 'Curso', 'Grau', 'Conceito', 'Ano', 'Situação', 'Observação', 'Carga H.', 'Vagas', 'Concluintes', 'Docentes', 'Mestre', 'Doutor', 'IC', 'PIBIC', 'PROEX', 'Resolução', 'Portaria', 'Processo', 'Deliberação', 'Parecer', 'Relatório', 'Status', 'Ação', 'Nota'][col]
                                : row < 8
                                  ? ['Aquidauana', '1011', 'Administração', 'Bacharelado', '3', '2021', 'Ativo', 'Renovação', '2800h', '60', '45', '22', '15', '7', '8', '4', '3', 'RES 01/19', 'PORT 23/20', 'PROC 456', 'DEL 78/21', 'PAREC 12', 'REL 2021', 'Regular', 'Revisar', '7.2'][col]
                                  : '...'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Fake sheet tabs */}
                <div className="flex gap-0 px-2 py-1 bg-white/3 border-t border-white/4">
                  <span className="px-2 py-0.5 text-[8px] bg-white/5 rounded-t text-foreground/60">Planilha1</span>
                  <span className="px-2 py-0.5 text-[8px] text-muted-lavender">Planilha2</span>
                  <span className="px-2 py-0.5 text-[8px] text-muted-lavender">Planilha3</span>
                  <span className="px-2 py-0.5 text-[8px] text-muted-lavender/40">+</span>
                </div>
              </div>

              <p className="text-sm text-muted-lavender italic text-center">
                Você reconhece isso? Uma planilha com milhares de linhas onde ninguém encontra nada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Search className="h-4 w-4 text-coral" />,
                    text: 'Ctrl+F não resolve — são muitas colunas para achar o que importa',
                  },
                  {
                    icon: <AlertTriangle className="h-4 w-4 text-orange-400" />,
                    text: 'Cada um formata de um jeito — ninguém segue o mesmo padrão',
                  },
                  {
                    icon: <Eye className="h-4 w-4 text-yellow-400" />,
                    text: 'Impossível ter visão geral — 3.000+ linhas não cabem na tela',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-white/3 rounded-lg p-3">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <p className="text-xs text-foreground/80 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── 3. The 5 Solutions ─── */}
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center"
          >
            5 Soluções que Transformam Sua Planilha
          </motion.h3>

          <div className="grid grid-cols-1 gap-6">
            {/* a) Busca Instantânea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <Card className="border-lime/15 bg-surface overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Search className="h-4 w-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Busca Instantânea</h4>
                      <p className="text-xs text-muted-lavender">Digite e veja resultados em todas as colunas em tempo real</p>
                    </div>
                  </div>
                  <BuscaDemo />
                </CardContent>
              </Card>
            </motion.div>

            {/* b) Filtros Combinados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-lime/15 bg-surface overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Filter className="h-4 w-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Filtros Combinados</h4>
                      <p className="text-xs text-muted-lavender">Dropdowns que funcionam juntos — refinar por múltiplos critérios</p>
                    </div>
                  </div>
                  <FiltrosCombinadosDemo />
                </CardContent>
              </Card>
            </motion.div>

            {/* c) Paginação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Card className="border-lime/15 bg-surface overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Paginação</h4>
                      <p className="text-xs text-muted-lavender">Navegue por páginas — com seletor de itens por página</p>
                    </div>
                  </div>
                  <PaginacaoDemo />
                </CardContent>
              </Card>
            </motion.div>

            {/* d) Cabeçalho Fixo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-lime/15 bg-surface overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <Pin className="h-4 w-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Cabeçalho Fixo</h4>
                      <p className="text-xs text-muted-lavender">O cabeçalho nunca sai da vista — mesmo rolando centenas de linhas</p>
                    </div>
                  </div>
                  <CabecalhoFixoDemo />
                </CardContent>
              </Card>
            </motion.div>

            {/* e) Ordenação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <Card className="border-lime/15 bg-surface overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <ArrowUpDown className="h-4 w-4 text-lime" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Ordenação</h4>
                      <p className="text-xs text-muted-lavender">Clique no cabeçalho para ordenar — ascendente ou descendente</p>
                    </div>
                  </div>
                  <OrdenacaoDemo />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ─── 4. Beyond Tables: Visualizations ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Além da Tabela:{' '}
              <span className="text-lime">Visualizações</span>
            </h3>
            <p className="text-sm text-muted-lavender">
              Os mesmos 50 registros, vistos de 3 formas diferentes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Semáforo de Cores */}
            <Card className="border-lime/15 bg-surface overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  Semáforo de Cores
                </h4>
                <p className="text-xs text-muted-lavender">Cada conceito vira uma cor — visão instantânea da situação</p>
                <div className="space-y-1.5">
                  {/* Legend */}
                  <div className="flex items-center gap-2 text-[10px] text-muted-lavender mb-2">
                    {[1, 2, 3, 4, 5].map((c) => (
                      <span key={c} className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${getSemaforoDot(c)}`} />
                        {c}
                      </span>
                    ))}
                  </div>
                  {/* Mini semáforo grid */}
                  <div className="overflow-x-auto rounded-lg border border-white/6">
                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="bg-white/5">
                          <th className="px-2 py-1 text-left text-muted-lavender font-medium">Unidade</th>
                          <th className="px-2 py-1 text-left text-muted-lavender font-medium">Curso</th>
                          <th className="px-2 py-1 text-center text-muted-lavender font-medium">Conceito</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DATA.slice(0, 8).map((r, i) => (
                          <tr key={i} className="border-t border-white/4">
                            <td className="px-2 py-1 text-foreground/80">{r.unidade}</td>
                            <td className="px-2 py-1 text-foreground/80">{r.curso}</td>
                            <td className="px-2 py-1 text-center">
                              <span className={`inline-block w-5 h-5 rounded-full ${getSemaforoDot(r.conceito)} text-[9px] font-bold leading-5 text-white`}>
                                {r.conceito}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Cards */}
            <Card className="border-lime/15 bg-surface overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-lime" />
                  Cards KPI
                </h4>
                <p className="text-xs text-muted-lavender">Resumo em números — o essencial num piscar de olhos</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{kpiData.total}</p>
                    <p className="text-[10px] text-muted-lavender mt-0.5">Total Cursos</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-lime">{kpiData.media.toFixed(1)}</p>
                    <p className="text-[10px] text-muted-lavender mt-0.5">Média Conceito</p>
                  </div>
                  <div className="bg-green-700/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">{kpiData.excelentes}</p>
                    <p className="text-[10px] text-muted-lavender mt-0.5 flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      Excelentes
                    </p>
                  </div>
                  <div className="bg-red-600/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-red-400">{kpiData.criticos}</p>
                    <p className="text-[10px] text-muted-lavender mt-0.5 flex items-center justify-center gap-1">
                      <TrendingDown className="h-3 w-3 text-red-400" />
                      Críticos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-lavender bg-white/3 rounded px-2 py-1.5">
                  <Minus className="h-3 w-3" />
                  <span>Excelentes = conceito 4 ou 5 · Críticos = conceito 1 ou 2</span>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="border-lime/15 bg-surface overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-lime" />
                  Gráfico de Distribuição
                </h4>
                <p className="text-xs text-muted-lavender">Distribuição dos conceitos — visualize o padrão</p>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <BarChart data={conceitoDistribution} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="conceito"
                      tick={{ fontSize: 10, fill: '#8888A0' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#8888A0' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="quantidade"
                      fill="var(--color-quantidade)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* ─── 5. Copy-Ready Prompt ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-lime/20 bg-surface overflow-hidden glow-lime">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
                  <Copy className="h-5 w-5 text-lime" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Prompt Pronto para Copiar</h3>
                  <p className="text-xs text-muted-lavender">Visualizador de Planilha Gigante — cole no seu AI favorito</p>
                </div>
              </div>

              <div className="relative code-block">
                <CopyButton text={PROMPT_TEXT} />
                <pre className="p-4 text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto pr-20">
                  {PROMPT_TEXT}
                </pre>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-lavender bg-lime/5 border border-lime/10 rounded-lg p-3">
                <span className="text-lime font-bold mt-0.5">💡</span>
                <span>
                  Este prompt já inclui todas as 5 funcionalidades demonstradas acima.
                  O AI vai perguntar sobre suas colunas antes de gerar — assim o resultado sai perfeito.
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
