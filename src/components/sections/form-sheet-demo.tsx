'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, CheckCircle2, XCircle, AlertTriangle, Table2, FileSpreadsheet, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ─── Messy spreadsheet data ─── */
const messyData = [
  { setor: 'Diplomas', solicitante: 'Carlos', material: '2 mouse', data: '10/05/24' },
  { setor: 'Setor de Diplomas', solicitante: 'CARLOS SILVA', material: 'Mouse USB x2', data: '2024-05-10' },
  { setor: 'DIPLOMAS', solicitante: 'carlos silva', material: '2 mouses usb', data: '10/5/2024' },
  { setor: 'Dipl', solicitante: 'C. Silva', material: 'mouse x2', data: '10-05-2024' },
  { setor: 'Div. Diplomas', solicitante: 'Carlos S.', material: 'dois mouses', data: '' },
  { setor: 'Matrículas', solicitante: 'Ana', material: '3 caneta', data: '11/05/24' },
  { setor: 'Matricula', solicitante: 'ANA COSTA', material: 'Canetas x3', data: '11/05/2024' },
  { setor: 'DIV. MATRICULAS', solicitante: 'ana costa', material: '3 canetas azul', data: '11-5-24' },
]

/* ─── Clean spreadsheet data (what appears after form submission) ─── */
const initialCleanData = [
  { setor: 'DIDIP', solicitante: 'João Pereira', material: '5 Resmas de Papel A4', data: '12/05/2024' },
  { setor: 'DIMAT', solicitante: 'Maria Souza', material: '2 Cartuchos de Tinta Colorida', data: '12/05/2024' },
]

/* ─── Form options ─── */
const setorOptions = [
  { value: 'DIDIP', label: 'Divisão de Diplomas (DIDIP)' },
  { value: 'DIMAT', label: 'Divisão de Matrículas (DIMAT)' },
  { value: 'DIEST', label: 'Divisão de Estágios (DIEST)' },
]

/* ─── Messy cell styling to show inconsistency ─── */
const messyStyles: Record<string, string> = {
  'Diplomas': 'text-red-400 italic',
  'Setor de Diplomas': 'text-blue-400',
  'DIPLOMAS': 'text-yellow-400 uppercase font-bold',
  'Dipl': 'text-purple-400 text-[10px]',
  'Div. Diplomas': 'text-green-400 underline',
  'Matrículas': 'text-cyan-400',
  'Matricula': 'text-orange-400 text-[10px]',
  'DIV. MATRICULAS': 'text-pink-400 uppercase font-bold',
  '2 mouse': 'text-red-300',
  'Mouse USB x2': 'text-blue-300',
  '2 mouses usb': 'text-yellow-300 italic',
  'mouse x2': 'text-purple-300 text-[10px]',
  'dois mouses': 'text-green-300',
  '3 caneta': 'text-red-300',
  'Canetas x3': 'text-blue-300',
  '3 canetas azul': 'text-yellow-300 italic',
}

function MessySpreadsheet() {
  return (
    <div className="overflow-hidden rounded-lg border border-red-500/30 bg-[#1a1a1a]">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-red-500/20 bg-red-500/5">
        <XCircle className="size-4 text-red-400" />
        <span className="text-xs font-medium text-red-400">Planilha sem padronização</span>
        <Badge className="ml-auto bg-red-500/15 text-red-400 text-[9px] border-red-500/20">Dados inconsistentes</Badge>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Setor</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Solicitante</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Material</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Data</th>
            </tr>
          </thead>
          <tbody>
            {messyData.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className={`px-3 py-1.5 ${messyStyles[row.setor] || 'text-foreground'}`}>{row.setor}</td>
                <td className={`px-3 py-1.5 ${i % 2 === 0 ? 'text-foreground' : 'text-foreground/70'}`}>{row.solicitante}</td>
                <td className={`px-3 py-1.5 ${messyStyles[row.material] || 'text-foreground'}`}>{row.material}</td>
                <td className={`px-3 py-1.5 ${!row.data ? 'text-red-400/60 italic' : 'text-foreground/60'}`}>{row.data || '???'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Problem indicators */}
      <div className="flex flex-wrap gap-2 p-3 border-t border-red-500/10 bg-red-500/[0.03]">
        {[
          '5 formas de escrever "Diplomas"',
          '3 formas de escrever "Matrículas"',
          'Datas sem padrão',
          'Campo vazio',
        ].map((problem, i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/15 flex items-center gap-1">
            <AlertTriangle className="size-2.5" />
            {problem}
          </span>
        ))}
      </div>
    </div>
  )
}

function CleanSpreadsheet({ data }: { data: typeof initialCleanData }) {
  return (
    <div className="overflow-hidden rounded-lg border border-lime/30 bg-[#1a1a1a]">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-lime/20 bg-lime/5">
        <CheckCircle2 className="size-4 text-lime" />
        <span className="text-xs font-medium text-lime">Planilha padronizada via formulário</span>
        <Badge className="ml-auto bg-lime/15 text-lime text-[9px] border-lime/20">Dados limpos</Badge>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Sigla</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Solicitante</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Material</th>
              <th className="text-left px-3 py-2 text-muted-lavender font-medium bg-white/[0.03]">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-3 py-1.5 text-lime font-mono font-semibold">{row.setor}</td>
                <td className="px-3 py-1.5 text-foreground">{row.solicitante}</td>
                <td className="px-3 py-1.5 text-foreground/90">{row.material}</td>
                <td className="px-3 py-1.5 text-foreground/60 font-mono">{row.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Clean indicators */}
      <div className="flex flex-wrap gap-2 p-3 border-t border-lime/10 bg-lime/[0.03]">
        {[
          'Sigla automática',
          'Nome formatado',
          'Material padronizado',
          'Data consistente',
        ].map((tag, i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-lime/10 text-lime border border-lime/15 flex items-center gap-1">
            <CheckCircle2 className="size-2.5" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function DemoForm({ onSubmit }: { onSubmit: (data: { setor: string; solicitante: string; material: string }) => void }) {
  const [setor, setSetor] = useState('')
  const [solicitante, setSolicitante] = useState('')
  const [material, setMaterial] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!setor || !solicitante || !material) return

    // Format the name to title case
    const formattedName = solicitante
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    // Format material to start with quantity + description
    const formattedMaterial = material.charAt(0).toUpperCase() + material.slice(1)

    onSubmit({
      setor,
      solicitante: formattedName,
      material: formattedMaterial,
    })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSetor('')
      setSolicitante('')
      setMaterial('')
    }, 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] text-muted-lavender mb-1 font-medium uppercase tracking-wider">
            Setor de Destino
          </label>
          <select
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            className="w-full h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-foreground text-sm focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-surface">Selecione...</option>
            {setorOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-muted-lavender mb-1 font-medium uppercase tracking-wider">
            Solicitante
          </label>
          <input
            type="text"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            placeholder="Nome completo"
            className="w-full h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-foreground placeholder:text-muted-lavender/40 text-sm focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] text-muted-lavender mb-1 font-medium uppercase tracking-wider">
            Material
          </label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Ex: 2 Mouses USB"
            className="w-full h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-foreground placeholder:text-muted-lavender/40 text-sm focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!setor || !solicitante || !material || submitted}
          className="flex items-center gap-2 px-5 h-9 rounded-lg bg-lime text-navy font-semibold text-sm hover:bg-lime-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="size-3.5" />
          {submitted ? 'Enviado!' : 'Enviar'}
        </button>
        {submitted && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-lime flex items-center gap-1"
          >
            <CheckCircle2 className="size-3.5" />
            Dados enviados e padronizados na planilha!
          </motion.span>
        )}
      </div>
    </form>
  )
}

export default function FormSheetDemo() {
  const [cleanData, setCleanData] = useState(initialCleanData)

  const handleFormSubmit = (data: { setor: string; solicitante: string; material: string }) => {
    const now = new Date()
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(4, '2')}/${now.getFullYear()}`
    setCleanData((prev) => [...prev, { ...data, data: dateStr }])
  }

  return (
    <section id="demo" className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <FileSpreadsheet className="size-3.5" />
            Demonstração Interativa
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Por que usar{' '}
            <span className="text-lime">Formulário</span> em vez de{' '}
            <span className="text-coral">Planilha Direta</span>?
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Veja na prática como um formulário padroniza os dados antes de chegarem na planilha, eliminando inconsistências.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Step 1: The messy spreadsheet */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-coral/15 flex items-center justify-center">
                <XCircle className="size-4 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Sem Formulário</h3>
                <p className="text-xs text-muted-lavender">Cada pessoa escreve do seu jeito — dados ficam inconsistentes</p>
              </div>
            </div>
            <MessySpreadsheet />
          </motion.div>

          {/* Arrow transition */}
          <motion.div
            className="flex items-center justify-center gap-4 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-coral/30 to-lime/30" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-lavender font-medium">A solução</span>
              <ArrowDown className="size-5 text-lime animate-bounce" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-lime/30 to-coral/30" />
          </motion.div>

          {/* Step 2: The form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-lime/15 flex items-center justify-center">
                <Table2 className="size-4 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Com Formulário</h3>
                <p className="text-xs text-muted-lavender">Preencha e envie — os dados chegam padronizados na planilha</p>
              </div>
            </div>
            <Card className="bg-surface/80 border-lime/15">
              <CardContent className="p-5 sm:p-6">
                <DemoForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Arrow to clean sheet */}
          <motion.div
            className="flex items-center justify-center gap-4 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-lime/20 to-lime/40" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-lime font-medium">Dados na planilha</span>
              <ArrowDown className="size-5 text-lime animate-bounce" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-lime/40 to-lime/20" />
          </motion.div>

          {/* Step 3: Clean spreadsheet */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-lime/15 flex items-center justify-center">
                <CheckCircle2 className="size-4 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Resultado: Dados Padronizados</h3>
                <p className="text-xs text-muted-lavender">Sigla automática, nome formatado, data consistente</p>
              </div>
            </div>
            <CleanSpreadsheet data={cleanData} />
          </motion.div>

          {/* Explanatory note */}
          <motion.div
            className="mt-6 rounded-xl border border-lime/15 bg-lime/[0.03] p-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-muted-lavender leading-relaxed">
              <strong className="text-foreground">Como funciona:</strong> O formulário usa um menu suspenso (dropdown) para o setor,
              garantindo que só exista uma forma de escrever. A sigla é preenchida automaticamente.
              O nome é formatado para iniciar em maiúscula. A data é gerada pelo sistema, não digitada.
              Tudo isso <em className="text-lime not-italic font-medium">antes</em> de chegar na planilha!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
