'use client'

import { useState, useMemo } from 'react'
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
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

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
      return 'bg-red-600 text-white shadow-red-600/30'
    case 2:
      return 'bg-orange-500 text-white shadow-orange-500/30'
    case 3:
      return 'bg-yellow-400 text-slate-900 shadow-yellow-400/30'
    case 4:
      return 'bg-green-400 text-slate-900 shadow-green-400/30'
    case 5:
      return 'bg-green-700 text-white shadow-green-700/30'
    default:
      return 'bg-white/10 text-muted-lavender'
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

  // Calculate trend
  const ultimoAno = anos[anos.length - 1]
  const penultimoAno = anos[anos.length - 2]
  let tendencia: 'up' | 'down' | 'stable' = 'stable'
  if (penultimoAno && ultimoAno) {
    const notasPenultimo = data
      .filter((d) => d.n[penultimoAno])
      .map((d) => d.n[penultimoAno])
    const notasUltimo = data
      .filter((d) => d.n[ultimoAno])
      .map((d) => d.n[ultimoAno])
    const mediaPen = notasPenultimo.reduce((a, b) => a + b, 0) / notasPenultimo.length
    const mediaUlt = notasUltimo.reduce((a, b) => a + b, 0) / notasUltimo.length
    if (mediaUlt > mediaPen + 0.2) tendencia = 'up'
    else if (mediaUlt < mediaPen - 0.2) tendencia = 'down'
  }

  return { totalCursos, mediaGeral, excelentes, criticos, tendencia }
}

export default function EnadeDashboard() {
  const [filtroUnidade, setFiltroUnidade] = useState('')
  const [filtroCod, setFiltroCod] = useState('')
  const [filtroCurso, setFiltroCurso] = useState('')
  const [filtroGrau, setFiltroGrau] = useState('')

  // Extract filter options
  const unidades = useMemo(() => [...new Set(mockData.map((d) => d.u))].sort(), [])
  const cursos = useMemo(() => [...new Set(mockData.map((d) => d.cur))].sort(), [])
  const graus = useMemo(() => [...new Set(mockData.map((d) => d.g))].sort(), [])

  // Filtered data
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      return (
        (filtroUnidade === '' || item.u === filtroUnidade) &&
        (filtroCod === '' || item.cod.toLowerCase().includes(filtroCod.toLowerCase())) &&
        (filtroCurso === '' || item.cur === filtroCurso) &&
        (filtroGrau === '' || item.g === filtroGrau)
      )
    })
  }, [filtroUnidade, filtroCod, filtroCurso, filtroGrau])

  const kpis = useMemo(() => calculateKpis(filteredData), [filteredData])

  const hasActiveFilter = filtroUnidade || filtroCod || filtroCurso || filtroGrau

  const clearFilters = () => {
    setFiltroUnidade('')
    setFiltroCod('')
    setFiltroCurso('')
    setFiltroGrau('')
  }

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
            Dashboard{' '}
            <span className="relative inline-block">
              ENADE
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-coral/60 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Um dashboard real, desenvolvido com IA e disponibilizado no Moodle da UEMS.
            Dados conectados ao Google Sheets — este é o tipo de ferramenta que você pode construir.
          </p>
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
                  <div className="flex items-center gap-1 text-xs text-muted-lavender bg-white/5 px-2.5 py-1.5 rounded-md border border-white/8">
                    <Database className="size-3" />
                    Moodle
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="px-5 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: 'Total de Cursos',
                    value: kpis.totalCursos,
                    icon: GraduationCap,
                    color: 'lime' as const,
                  },
                  {
                    label: 'Média Geral',
                    value: kpis.mediaGeral,
                    icon: BarChart3,
                    color: kpis.tendencia === 'up' ? 'lime' : kpis.tendencia === 'down' ? 'coral' : ('lime' as const),
                    trend: kpis.tendencia,
                  },
                  {
                    label: 'Excelentes (5)',
                    value: kpis.excelentes,
                    icon: TrendingUp,
                    color: 'lime' as const,
                  },
                  {
                    label: 'Críticos (1-2)',
                    value: kpis.criticos,
                    icon: TrendingDown,
                    color: 'coral' as const,
                  },
                ].map((kpi) => (
                  <motion.div
                    key={kpi.label}
                    className={`rounded-lg border p-3 ${
                      kpi.color === 'lime'
                        ? 'bg-lime/5 border-lime/15'
                        : 'bg-coral/5 border-coral/15'
                    }`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <kpi.icon
                        className={`size-3.5 ${
                          kpi.color === 'lime' ? 'text-lime' : 'text-coral'
                        }`}
                      />
                      {'trend' in kpi && kpi.trend && (
                        <span className={`text-[10px] ${
                          kpi.trend === 'up' ? 'text-lime' : kpi.trend === 'down' ? 'text-coral' : 'text-muted-lavender'
                        }`}>
                          {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                        </span>
                      )}
                    </div>
                    <p className="text-xl font-bold text-foreground leading-none">{kpi.value}</p>
                    <p className="text-[10px] text-muted-lavender mt-1">{kpi.label}</p>
                  </motion.div>
                ))}
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
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${item.dot}`}
                    />
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
                      className="text-[10px] text-coral hover:text-coral/80 ml-auto cursor-pointer transition-colors"
                    >
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
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-white/8 text-muted-lavender">
                      <th className="font-semibold pl-5 sm:pl-6 pr-2 py-3 w-[20%]">Unidade</th>
                      <th className="font-semibold px-2 py-3 w-[7%] text-center">Cód.</th>
                      <th className="font-semibold px-2 py-3 w-[24%]">Curso</th>
                      <th className="font-semibold px-2 py-3 w-[9%] text-center">Grau</th>
                      {anos.map((ano) => (
                        <th
                          key={ano}
                          className="font-semibold px-2 py-3 text-center"
                          title={String(ano)}
                        >
                          <span className="text-lime/70">{String(ano).slice(-2)}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {filteredData.length > 0 ? (
                        filteredData.map((item, index) => {
                          const grauAbrev =
                            item.g === 'Bacharelado'
                              ? 'Bach.'
                              : item.g === 'Licenciatura'
                              ? 'Lic.'
                              : item.g === 'Tecnológico'
                              ? 'Tec.'
                              : item.g

                          return (
                            <motion.tr
                              key={`${item.cod}-${item.cur}`}
                              layout
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2, delay: index * 0.02 }}
                              className={`border-b border-white/4 hover:bg-white/[0.02] transition-colors ${
                                index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                              }`}
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
                                {grauAbrev}
                              </td>
                              {anos.map((ano) => {
                                const nota = item.n[ano]
                                return (
                                  <td key={ano} className="px-2 py-2.5 text-center">
                                    {nota ? (
                                      <motion.div
                                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold shadow-sm ${getSemaforoClass(nota)}`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.02 + 0.1 }}
                                        title={`${nota} - ${getSemaforoLabel(nota)}`}
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
              className="rounded-xl border border-white/6 bg-surface/50 p-4 hover:border-coral/15 transition-colors"
            >
              <item.icon className="size-4 text-coral mb-2" />
              <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-xs text-muted-lavender leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
