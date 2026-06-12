'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Filter,
  Search,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Database,
  Download,
  FileText,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

/* ─── Mock Data (simulating Google Sheets API response) ─── */
interface EnadeRecord {
  u: string
  cod: string
  cur: string
  g: string
  n: Record<string, number>
}

const mockData: EnadeRecord[] = [
  { u: 'UEMS/Aquidauana', cod: '1011', cur: 'Administração', g: 'Bacharelado', n: { 2017: 3, 2020: 4, 2023: 4 } },
  { u: 'UEMS/Aquidauana', cod: '1012', cur: 'Ciências Biológicas', g: 'Licenciatura', n: { 2017: 3, 2020: 3, 2023: 4 } },
  { u: 'UEMS/Aquidauana', cod: '1013', cur: 'Pedagogia', g: 'Licenciatura', n: { 2017: 4, 2020: 4, 2023: 5 } },
  { u: 'UEMS/Campo Grande', cod: '2001', cur: 'Direito', g: 'Bacharelado', n: { 2017: 2, 2020: 3, 2023: 3 } },
  { u: 'UEMS/Campo Grande', cod: '2002', cur: 'Psicologia', g: 'Bacharelado', n: { 2017: 3, 2020: 3, 2023: 4 } },
  { u: 'UEMS/Dourados', cod: '3001', cur: 'Enfermagem', g: 'Bacharelado', n: { 2017: 3, 2020: 4, 2023: 4 } },
  { u: 'UEMS/Dourados', cod: '3002', cur: 'Medicina', g: 'Bacharelado', n: { 2017: 4, 2020: 5, 2023: 5 } },
  { u: 'UEMS/Dourados', cod: '3003', cur: 'Letras', g: 'Licenciatura', n: { 2017: 2, 2020: 3, 2023: 3 } },
  { u: 'UEMS/Paranaíba', cod: '4001', cur: 'Engenharia Civil', g: 'Bacharelado', n: { 2017: 2, 2020: 2, 2023: 3 } },
  { u: 'UEMS/Paranaíba', cod: '4002', cur: 'Matemática', g: 'Licenciatura', n: { 2017: 3, 2020: 4, 2023: 4 } },
  { u: 'UEMS/Nova Andradina', cod: '5001', cur: 'Agronomia', g: 'Bacharelado', n: { 2017: 3, 2020: 3, 2023: 4 } },
  { u: 'UEMS/Nova Andradina', cod: '5002', cur: 'Zootecnia', g: 'Bacharelado', n: { 2017: 2, 2020: 3, 2023: 3 } },
  { u: 'UEMS/Naviraí', cod: '6001', cur: 'Ciência da Computação', g: 'Bacharelado', n: { 2017: 3, 2020: 4, 2023: 5 } },
  { u: 'UEMS/Naviraí', cod: '6002', cur: 'Sistemas de Informação', g: 'Tecnológico', n: { 2017: 2, 2020: 3, 2023: 4 } },
  { u: 'UEMS/Coxim', cod: '7001', cur: 'Geografia', g: 'Licenciatura', n: { 2017: 3, 2020: 3, 2023: 4 } },
  { u: 'UEMS/Amambai', cod: '8001', cur: 'Enfermagem', g: 'Bacharelado', n: { 2017: 3, 2020: 4, 2023: 4 } },
  { u: 'UEMS/Ivinhema', cod: '9001', cur: 'Administração', g: 'Bacharelado', n: { 2017: 2, 2020: 3, 2023: 3 } },
  { u: 'UEMS/Maracaju', cod: '9101', cur: 'Contabilidade', g: 'Bacharelado', n: { 2017: 2, 2020: 2, 2023: 3 } },
  { u: 'UEMS/Bonito', cod: '9201', cur: 'Turismo', g: 'Bacharelado', n: { 2017: 3, 2020: 4, 2023: 4 } },
  { u: 'UEMS/Ponta Porã', cod: '9301', cur: 'Serviço Social', g: 'Bacharelado', n: { 2017: 3, 2020: 3, 2023: 4 } },
]

/* ─── Extract years from data ─── */
const anos = (() => {
  const anosSet = new Set<number>()
  mockData.forEach((item) => {
    Object.keys(item.n).forEach((ano) => anosSet.add(Number(ano)))
  })
  return Array.from(anosSet).sort((a, b) => a - b)
})()

/* ─── Semáforo colors adapted for dark theme ─── */
function getSemaforoClass(nota: number) {
  switch (nota) {
    case 1:
      return 'bg-red-600 text-white shadow-sm shadow-red-600/40'
    case 2:
      return 'bg-orange-500 text-white shadow-sm shadow-orange-500/40'
    case 3:
      return 'bg-yellow-400 text-slate-900 shadow-sm shadow-yellow-400/40'
    case 4:
      return 'bg-green-400 text-slate-900 shadow-sm shadow-green-400/40'
    case 5:
      return 'bg-green-700 text-white shadow-sm shadow-green-700/40'
    default:
      return 'bg-white/10 text-muted-lavender'
  }
}

function getSemaforoGlow(nota: number) {
  switch (nota) {
    case 1: return 'hover:shadow-red-600/60'
    case 2: return 'hover:shadow-orange-500/60'
    case 3: return 'hover:shadow-yellow-400/60'
    case 4: return 'hover:shadow-green-400/60'
    case 5: return 'hover:shadow-green-700/60'
    default: return ''
  }
}

function getSemaforoLabel(nota: number) {
  switch (nota) {
    case 1: return 'Crítico'
    case 2: return 'Atenção'
    case 3: return 'Adequado'
    case 4: return 'Bom'
    case 5: return 'Excelente'
    default: return '-'
  }
}

/* ─── Sparkline component ─── */
function Sparkline({ data, color = 'lime' }: { data: number[]; color?: 'lime' | 'coral' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 48
  const h = 20
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color === 'lime' ? '#C8FF2E' : '#FF6B4A'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
    </svg>
  )
}

/* ─── Sort types ─── */
type SortKey = 'u' | 'cod' | 'cur' | 'g' | 'nota'
type SortDir = 'asc' | 'desc'

/* ─── Sort icon helper ─── */
function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (sortKey !== column) return <ArrowUpDown className="size-2.5 opacity-30" />
  return sortDir === 'asc'
    ? <ArrowUp className="size-2.5 text-coral" />
    : <ArrowDown className="size-2.5 text-coral" />
}

/* ─── KPI calculation ─── */
function calculateKpis(data: EnadeRecord[]) {
  const allNotas = data.flatMap((d) => Object.values(d.n))
  const totalCursos = data.length
  const mediaGeral = allNotas.length > 0
    ? (allNotas.reduce((a, b) => a + b, 0) / allNotas.length).toFixed(1)
    : '-'
  const excelentes = data.filter((d) => {
    const notas = Object.values(d.n)
    return notas.length > 0 && notas[notas.length - 1] >= 5
  }).length
  const criticos = data.filter((d) => {
    const notas = Object.values(d.n)
    return notas.length > 0 && notas[notas.length - 1] <= 2
  }).length

  // Trend sparkline data: average by year
  const sparkData = anos.map((ano) => {
    const notasAno = data.filter((d) => d.n[ano]).map((d) => d.n[ano])
    return notasAno.length > 0
      ? Number((notasAno.reduce((a, b) => a + b, 0) / notasAno.length).toFixed(1))
      : 0
  })

  // Calculate trend direction
  const ultimoAno = anos[anos.length - 1]
  const penultimoAno = anos[anos.length - 2]
  let tendencia: 'up' | 'down' | 'stable' = 'stable'
  if (penultimoAno && ultimoAno) {
    const notasPenultimo = data.filter((d) => d.n[penultimoAno]).map((d) => d.n[penultimoAno])
    const notasUltimo = data.filter((d) => d.n[ultimoAno]).map((d) => d.n[ultimoAno])
    const mediaPen = notasPenultimo.reduce((a, b) => a + b, 0) / notasPenultimo.length
    const mediaUlt = notasUltimo.reduce((a, b) => a + b, 0) / notasUltimo.length
    if (mediaUlt > mediaPen + 0.2) tendencia = 'up'
    else if (mediaUlt < mediaPen - 0.2) tendencia = 'down'
  }

  return { totalCursos, mediaGeral, excelentes, criticos, tendencia, sparkData }
}

/* ─── Export handlers ─── */
function handleExport(format: string) {
  toast.success(`Exportação ${format} iniciada!`, {
    description: 'No dashboard real, o arquivo seria baixado automaticamente.',
  })
}

export default function EnadeDashboard() {
  const [filtroUnidade, setFiltroUnidade] = useState('')
  const [filtroCod, setFiltroCod] = useState('')
  const [filtroCurso, setFiltroCurso] = useState('')
  const [filtroGrau, setFiltroGrau] = useState('')
  const [kpiFilter, setKpiFilter] = useState<'excelentes' | 'criticos' | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('u')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  // Extract filter options
  const unidades = useMemo(() => [...new Set(mockData.map((d) => d.u))].sort(), [])
  const cursos = useMemo(() => [...new Set(mockData.map((d) => d.cur))].sort(), [])
  const graus = useMemo(() => [...new Set(mockData.map((d) => d.g))].sort(), [])

  // Filtered data
  const filteredData = useMemo(() => {
    let data = mockData.filter((item) => {
      return (
        (filtroUnidade === '' || item.u === filtroUnidade) &&
        (filtroCod === '' || item.cod.toLowerCase().includes(filtroCod.toLowerCase())) &&
        (filtroCurso === '' || item.cur === filtroCurso) &&
        (filtroGrau === '' || item.g === filtroGrau)
      )
    })

    // KPI click filter
    if (kpiFilter === 'excelentes') {
      data = data.filter((d) => {
        const notas = Object.values(d.n)
        return notas.length > 0 && notas[notas.length - 1] >= 5
      })
    } else if (kpiFilter === 'criticos') {
      data = data.filter((d) => {
        const notas = Object.values(d.n)
        return notas.length > 0 && notas[notas.length - 1] <= 2
      })
    }

    return data
  }, [filtroUnidade, filtroCod, filtroCurso, filtroGrau, kpiFilter])

  // Sorted data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      let valA: string | number
      let valB: string | number
      if (sortKey === 'nota') {
        const ultimoAno = anos[anos.length - 1]
        valA = a.n[ultimoAno] || 0
        valB = b.n[ultimoAno] || 0
      } else {
        valA = a[sortKey]
        valB = b[sortKey]
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [filteredData, sortKey, sortDir])

  const kpis = useMemo(() => calculateKpis(filteredData), [filteredData])

  const hasActiveFilter = filtroUnidade || filtroCod || filtroCurso || filtroGrau || kpiFilter

  const clearFilters = () => {
    setFiltroUnidade('')
    setFiltroCod('')
    setFiltroCurso('')
    setFiltroGrau('')
    setKpiFilter(null)
  }

  const handleSort = useCallback((key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortDir('asc')
      }
      return key
    })
  }, [])

  return (
    <section id="enade" className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <GraduationCap className="size-3.5" />
            Exemplo Real
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Exemplo de{' '}
            <span className="relative inline-block">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-coral/60 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Um dashboard real, desenvolvido com IA e disponibilizado no Moodle da UEMS.
            Dados conectados ao Google Sheets — este é o tipo de ferramenta que você pode construir.
          </p>

          {/* Simulated data notice */}
          <motion.div
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-xs font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AlertTriangle className="size-3.5" />
            Os dados abaixo são simulados para demonstração. O dashboard real se conecta ao Google Sheets via Apps Script.
          </motion.div>

        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-surface/90 border-white/8 overflow-hidden backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Dashboard Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-white/6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-coral/10 flex items-center justify-center">
                    <BarChart3 className="size-4.5 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Evolução de Notas ENADE</h3>
                    <p className="text-xs text-muted-lavender">Dados integrados do Google Sheets</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-muted-lavender bg-white/5 px-3 py-1.5 rounded-md border border-white/8">
                    Exibindo: <span className="font-bold text-coral">{filteredData.length}</span> cursos
                  </div>
                  {/* Export buttons */}
                  <div className="flex items-center gap-1">
                    {['PDF', 'CSV', 'XLSX'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => handleExport(fmt)}
                        className="text-[9px] font-bold px-2 py-1.5 rounded-md border border-white/8 bg-white/5 text-muted-lavender hover:text-foreground hover:border-coral/20 hover:bg-coral/5 transition-all cursor-pointer"
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-lavender bg-white/5 px-2.5 py-1.5 rounded-md border border-white/8">
                    <Database className="size-3" />
                    Moodle
                  </div>
                </div>
              </div>

              {/* KPI Cards — clickable for filtering */}
              <div className="px-5 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: 'Total de Cursos',
                    value: kpis.totalCursos,
                    icon: GraduationCap,
                    color: 'lime' as const,
                    kpiKey: null as 'excelentes' | 'criticos' | null,
                  },
                  {
                    label: 'Média Geral',
                    value: kpis.mediaGeral,
                    icon: BarChart3,
                    color: kpis.tendencia === 'up' ? 'lime' : kpis.tendencia === 'down' ? 'coral' : ('lime' as const),
                    trend: kpis.tendencia,
                    sparkData: kpis.sparkData,
                    kpiKey: null as 'excelentes' | 'criticos' | null,
                  },
                  {
                    label: 'Excelentes (5)',
                    value: kpis.excelentes,
                    icon: TrendingUp,
                    color: 'lime' as const,
                    kpiKey: 'excelentes' as 'excelentes' | 'criticos' | null,
                  },
                  {
                    label: 'Críticos (1-2)',
                    value: kpis.criticos,
                    icon: TrendingDown,
                    color: 'coral' as const,
                    kpiKey: 'criticos' as 'excelentes' | 'criticos' | null,
                  },
                ].map((kpi) => {
                  const isActive = kpiFilter === kpi.kpiKey && kpi.kpiKey !== null
                  return (
                    <motion.button
                      key={kpi.label}
                      onClick={() => {
                        if (kpi.kpiKey) {
                          setKpiFilter(kpiFilter === kpi.kpiKey ? null : kpi.kpiKey)
                        }
                      }}
                      className={`rounded-lg border p-3 text-left transition-all duration-200 relative cursor-${
                        kpi.kpiKey ? 'pointer' : 'default'
                      } ${
                        isActive
                          ? 'ring-2 ring-coral/40 border-coral/30 scale-[1.02]'
                          : kpi.color === 'lime'
                          ? 'bg-lime/5 border-lime/15 hover:border-lime/25'
                          : 'bg-coral/5 border-coral/15 hover:border-coral/25'
                      }`}
                      whileHover={kpi.kpiKey ? { scale: 1.03, y: -2 } : { scale: 1.01 }}
                      whileTap={kpi.kpiKey ? { scale: 0.98 } : undefined}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-1.5 right-1.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <X className="size-3 text-coral" />
                        </motion.div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <kpi.icon
                          className={`size-3.5 ${
                            kpi.color === 'lime' ? 'text-lime' : 'text-coral'
                          }`}
                        />
                        <div className="flex items-center gap-1">
                          {'trend' in kpi && kpi.trend && (
                            <span className={`text-[10px] font-medium ${
                              kpi.trend === 'up' ? 'text-lime' : kpi.trend === 'down' ? 'text-coral' : 'text-muted-lavender'
                            }`}>
                              {kpi.trend === 'up' ? '↑ Subindo' : kpi.trend === 'down' ? '↓ Caindo' : '→ Estável'}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-foreground leading-none">{kpi.value}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] text-muted-lavender">{kpi.label}</p>
                        {'sparkData' in kpi && kpi.sparkData && (
                          <Sparkline data={kpi.sparkData} color={kpi.color} />
                        )}
                      </div>
                      {kpi.kpiKey && (
                        <p className="text-[8px] text-muted-lavender/50 mt-0.5">
                          Clique para filtrar
                        </p>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="px-5 sm:px-6 pb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {[
                  { nota: 1, label: 'Crítico', dot: 'bg-red-600' },
                  { nota: 2, label: 'Atenção', dot: 'bg-orange-500' },
                  { nota: 3, label: 'Adequado', dot: 'bg-yellow-400' },
                  { nota: 4, label: 'Bom', dot: 'bg-green-400' },
                  { nota: 5, label: 'Excelente', dot: 'bg-green-700' },
                ].map((item) => (
                  <span
                    key={item.nota}
                    className="flex items-center gap-1.5 text-[10px] text-muted-lavender"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                    {item.nota} ({item.label})
                  </span>
                ))}
              </div>

              {/* Filters */}
              <div className="px-5 sm:px-6 py-3 border-t border-b border-white/6 bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-2.5">
                  <Filter className="size-3.5 text-muted-lavender" />
                  <span className="text-xs font-medium text-muted-lavender">Filtros</span>
                  {hasActiveFilter && (
                    <button
                      onClick={clearFilters}
                      className="text-[10px] text-coral hover:text-coral/80 ml-auto cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <X className="size-2.5" />
                      Limpar filtros
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Unidade */}
                  <div>
                    <label className="block text-[9px] font-bold text-muted-lavender/60 uppercase mb-1 tracking-wider">
                      Unidade
                    </label>
                    <select
                      value={filtroUnidade}
                      onChange={(e) => setFiltroUnidade(e.target.value)}
                      className="w-full text-[11px] p-2 rounded-md bg-white/[0.04] border border-white/10 text-foreground focus:border-coral/30 focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Todas</option>
                      {unidades.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  {/* Código */}
                  <div>
                    <label className="block text-[9px] font-bold text-muted-lavender/60 uppercase mb-1 tracking-wider">
                      Código
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-lavender" />
                      <input
                        type="text"
                        value={filtroCod}
                        onChange={(e) => setFiltroCod(e.target.value)}
                        placeholder="Buscar..."
                        className="w-full text-[11px] p-2 pl-7 rounded-md bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/40 focus:border-coral/30 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Curso */}
                  <div>
                    <label className="block text-[9px] font-bold text-muted-lavender/60 uppercase mb-1 tracking-wider">
                      Curso
                    </label>
                    <select
                      value={filtroCurso}
                      onChange={(e) => setFiltroCurso(e.target.value)}
                      className="w-full text-[11px] p-2 rounded-md bg-white/[0.04] border border-white/10 text-foreground focus:border-coral/30 focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Todos</option>
                      {cursos.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  {/* Grau */}
                  <div>
                    <label className="block text-[9px] font-bold text-muted-lavender/60 uppercase mb-1 tracking-wider">
                      Grau
                    </label>
                    <select
                      value={filtroGrau}
                      onChange={(e) => setFiltroGrau(e.target.value)}
                      className="w-full text-[11px] p-2 rounded-md bg-white/[0.04] border border-white/10 text-foreground focus:border-coral/30 focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Todos</option>
                      {graus.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-white/8 text-muted-lavender bg-surface/95 backdrop-blur-sm">
                      <th
                        className="font-semibold pl-5 sm:pl-6 pr-2 py-3 w-[20%] cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort('u')}
                      >
                        <span className="flex items-center gap-1">Unidade <SortIcon column="u" sortKey={sortKey} sortDir={sortDir} /></span>
                      </th>
                      <th
                        className="font-semibold px-2 py-3 w-[7%] text-center cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort('cod')}
                      >
                        <span className="flex items-center justify-center gap-1">Cód. <SortIcon column="cod" sortKey={sortKey} sortDir={sortDir} /></span>
                      </th>
                      <th
                        className="font-semibold px-2 py-3 w-[24%] cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort('cur')}
                      >
                        <span className="flex items-center gap-1">Curso <SortIcon column="cur" sortKey={sortKey} sortDir={sortDir} /></span>
                      </th>
                      <th
                        className="font-semibold px-2 py-3 w-[9%] text-center cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort('g')}
                      >
                        <span className="flex items-center justify-center gap-1">Grau <SortIcon column="g" sortKey={sortKey} sortDir={sortDir} /></span>
                      </th>
                      {anos.map((ano) => (
                        <th
                          key={ano}
                          className="font-semibold px-2 py-3 text-center cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSort('nota')}
                          title={`Ordenar por nota ${ano}`}
                        >
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-lime/70">{String(ano).slice(-2)}</span>
                            {anos.indexOf(ano) === anos.length - 1 && <SortIcon column="nota" sortKey={sortKey} sortDir={sortDir} />}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {sortedData.length > 0 ? (
                        sortedData.map((item, index) => {
                          const grauAbrev =
                            item.g === 'Bacharelado'
                              ? 'Bach.'
                              : item.g === 'Licenciatura'
                              ? 'Lic.'
                              : item.g === 'Tecnológico'
                              ? 'Tec.'
                              : item.g
                          const rowId = `${item.cod}-${item.cur}`
                          const isHovered = hoveredRow === rowId

                          return (
                            <motion.tr
                              key={rowId}
                              layout
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2, delay: index * 0.015 }}
                              className={`border-b border-white/4 transition-all duration-200 ${
                                isHovered ? 'bg-white/[0.04]' : index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                              }`}
                              onMouseEnter={() => setHoveredRow(rowId)}
                              onMouseLeave={() => setHoveredRow(null)}
                            >
                              <td className="pl-5 sm:pl-6 pr-2 py-2.5 text-foreground font-medium leading-tight">
                                <span className="text-[11px]">{item.u.replace('UEMS/', '')}</span>
                              </td>
                              <td className="px-2 py-2.5 text-center text-muted-lavender">
                                {item.cod}
                              </td>
                              <td className="px-2 py-2.5 text-foreground font-medium leading-tight">
                                {item.cur}
                              </td>
                              <td className="px-2 py-2.5 text-center text-muted-lavender" title={item.g}>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${
                                  item.g === 'Bacharelado' ? 'bg-blue-400/10 text-blue-400'
                                  : item.g === 'Licenciatura' ? 'bg-purple-400/10 text-purple-400'
                                  : 'bg-teal-400/10 text-teal-400'
                                }`}>
                                  {grauAbrev}
                                </span>
                              </td>
                              {anos.map((ano) => {
                                const nota = item.n[ano]
                                return (
                                  <td key={ano} className="px-2 py-2.5 text-center">
                                    {nota ? (
                                      <motion.div
                                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-shadow duration-200 ${getSemaforoClass(nota)} ${getSemaforoGlow(nota)} ${
                                          isHovered ? 'shadow-md scale-110' : ''
                                        }`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 0.3, delay: index * 0.015 + 0.1 }}
                                        title={`${nota} - ${getSemaforoLabel(nota)} (${ano})`}
                                      >
                                        {nota}
                                      </motion.div>
                                    ) : (
                                      <span className="text-muted-lavender/30">-</span>
                                    )}
                                  </td>
                                )
                              })}
                            </motion.tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={4 + anos.length}
                            className="text-center py-8 text-muted-lavender text-sm"
                          >
                            Nenhum registro encontrado com os filtros aplicados.
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Footer note */}
              <div className="px-5 sm:px-6 py-3 border-t border-white/6 bg-white/[0.01] flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] text-muted-lavender">
                  <span className="text-coral font-medium">⚠</span> Dados simulados para demonstração.
                  O dashboard real se conecta ao Google Sheets via Apps Script.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-lavender">
                  <ExternalLink className="size-3" />
                  Disponível no Moodle
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How it was built */}
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            {
              icon: Database,
              title: 'Google Sheets',
              desc: 'Os dados ficam numa planilha e são atualizados pela secretaria. O dashboard lê automaticamente.',
            },
            {
              icon: BarChart3,
              title: 'Semáforo Visual',
              desc: 'As bolinhas coloridas tornam fácil identificar quais cursos precisam de atenção, sem ler números.',
            },
            {
              icon: Filter,
              title: 'Filtros Dinâmicos',
              desc: 'Unidade, curso, grau — tudo filtrável. A tabela atualiza instantaneamente, sem recarregar a página.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/6 bg-surface/50 p-4 hover:border-coral/15 transition-colors group"
            >
              <item.icon className="size-4 text-coral mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-xs text-muted-lavender leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
