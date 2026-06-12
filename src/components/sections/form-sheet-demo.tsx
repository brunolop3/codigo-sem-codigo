'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Table2,
  FileSpreadsheet,
  Send,
  Pencil,
  Trash2,
  FileDown,
  FileText,
  Download,
  AppWindow,
  Shield,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ─── Messy spreadsheet data ─── */
const messyData = [
  { setor: 'DARPP', solicitante: 'Carlos', material: '2 mouse', data: '10/05/24' },
  { setor: 'Div. Avaliação e Reconhecimento', solicitante: 'CARLOS SILVA', material: 'Mouse USB x2', data: '2024-05-10' },
  { setor: 'darpp', solicitante: 'carlos silva', material: '2 mouses usb', data: '10/5/2024' },
  { setor: 'Setor de Diplomas', solicitante: 'C. Silva', material: 'mouse x2', data: '10-05-2024' },
  { setor: 'Div. Projetos Pedagógicos', solicitante: 'Carlos S.', material: 'dois mouses', data: '' },
  { setor: 'DEPPE', solicitante: 'Ana', material: '3 caneta', data: '11/05/24' },
  { setor: 'Div. Estágios', solicitante: 'ANA COSTA', material: 'Canetas x3', data: '11/05/2024' },
  { setor: 'deppe', solicitante: 'ana costa', material: '3 canetas azul', data: '11-5-24' },
  { setor: 'Setor de Estágio', solicitante: 'A. Costa', material: 'caneta x3', data: '' },
  { setor: 'DIND', solicitante: 'Paulo', material: '1 caixa papel', data: '12/05/24' },
  { setor: 'Div. Ingresso', solicitante: 'PAULO SOUZA', material: 'Papel A4 x1', data: '12/5/2024' },
  { setor: 'dind', solicitante: 'paulo souza', material: '1 resma de papel a4', data: '2024-05-12' },
]

/* ─── Clean spreadsheet data (what appears after form submission) ─── */
const initialCleanData = [
  { id: 1, setor: 'DARPP', solicitante: 'João Pereira', material: '5 Resmas de Papel A4', data: '12/05/2024' },
  { id: 2, setor: 'DIGES', solicitante: 'Maria Souza', material: '2 Cartuchos de Tinta Colorida', data: '12/05/2024' },
  { id: 3, setor: 'DEPPE', solicitante: 'Carla Mendes', material: '10 Pastas Suspensas', data: '13/05/2024' },
  { id: 4, setor: 'DIND', solicitante: 'Pedro Alves', material: '3 Caixas de Grampos', data: '13/05/2024' },
  { id: 5, setor: 'DARPP', solicitante: 'Ana Costa', material: '1 Toner Preto HP', data: '14/05/2024' },
  { id: 6, setor: 'DDADE', solicitante: 'Lucas Ferreira', material: '2 Pendrives 32GB', data: '14/05/2024' },
  { id: 7, setor: 'PI', solicitante: 'Roberto Nunes', material: '4 Resmas de Papel A4', data: '15/05/2024' },
]

/* ─── Form options (UEMS departments) ─── */
const setorOptions = [
  { value: 'DARPP', label: 'Divisão de Avaliação, Reconhecimento, Projetos Pedagógicos (DARPP)' },
  { value: 'DEPPE', label: 'Divisão de Estágios, Programas e Projetos de Ensino (DEPPE)' },
  { value: 'DDADE', label: 'Divisão de Dados e Acompanhamento Discente e de Egressos (DDADE)' },
  { value: 'DIND', label: 'Divisão de Ingresso Discente (DIND)' },
  { value: 'DIGES', label: 'Divisão de Gestão do ENADE e Indicadores da Educação Superior (DIGES)' },
  { value: 'PI', label: 'Procuradoria Institucional (PI)' },
]

/* ─── Messy cell styling to show inconsistency ─── */
const messyStyles: Record<string, string> = {
  'DARPP': 'text-red-400 italic',
  'Div. Avaliação e Reconhecimento': 'text-blue-400',
  'darpp': 'text-yellow-400 lowercase font-bold',
  'Setor de Diplomas': 'text-green-400 underline',
  'Div. Projetos Pedagógicos': 'text-purple-400 text-[10px]',
  'DEPPE': 'text-cyan-400 italic',
  'Div. Estágios': 'text-blue-400',
  'deppe': 'text-orange-400 lowercase font-bold',
  'Setor de Estágio': 'text-pink-400 text-[10px]',
  'DIND': 'text-emerald-400 italic',
  'Div. Ingresso': 'text-blue-400',
  'dind': 'text-yellow-400 lowercase font-bold',
  '2 mouse': 'text-red-300',
  'Mouse USB x2': 'text-blue-300',
  '2 mouses usb': 'text-yellow-300 italic',
  'mouse x2': 'text-purple-300 text-[10px]',
  'dois mouses': 'text-green-300',
  '3 caneta': 'text-red-300',
  'Canetas x3': 'text-blue-300',
  '3 canetas azul': 'text-yellow-300 italic',
  'caneta x3': 'text-purple-300 text-[10px]',
  '1 caixa papel': 'text-red-300',
  'Papel A4 x1': 'text-blue-300',
  '1 resma de papel a4': 'text-yellow-300 italic',
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
          '5 formas de escrever "DARPP"',
          '3 formas de escrever "DEPPE"',
          '3 formas de escrever "DIND"',
          'Datas sem padrão',
          'Campos vazios',
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

function CleanSpreadsheet({ data, onDelete, onEdit }: { 
  data: typeof initialCleanData
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-lime/30 bg-[#1a1a1a]">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-lime/20 bg-lime/5">
        <CheckCircle2 className="size-4 text-lime" />
        <span className="text-xs font-medium text-lime">Planilha padronizada via formulário</span>
        <div className="ml-auto flex items-center gap-1.5">
          <Badge className="bg-lime/15 text-lime text-[9px] border-lime/20">Dados limpos</Badge>
          <Badge className="bg-blue-500/15 text-blue-400 text-[9px] border-blue-500/20 flex items-center gap-1">
            <Pencil className="size-2.5" />
            Editável
          </Badge>
          <Badge className="bg-purple-500/15 text-purple-400 text-[9px] border-purple-500/20 flex items-center gap-1">
            <FileDown className="size-2.5" />
            Exportável
          </Badge>
        </div>
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
              <th className="text-center px-3 py-2 text-muted-lavender font-medium bg-white/[0.03] w-20">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] group">
                <td className="px-3 py-1.5 text-lime font-mono font-semibold">{row.setor}</td>
                <td className="px-3 py-1.5 text-foreground">{row.solicitante}</td>
                <td className="px-3 py-1.5 text-foreground/90">{row.material}</td>
                <td className="px-3 py-1.5 text-foreground/60 font-mono">{row.data}</td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(row.id)}
                      className="p-1 rounded hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      title="Editar registro"
                    >
                      <Pencil className="size-3" />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      title="Excluir registro"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Export bar */}
      <div className="flex items-center justify-between p-3 border-t border-lime/10 bg-lime/[0.03]">
        <div className="flex flex-wrap gap-1.5">
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
        <div className="flex items-center gap-1 ml-2">
          <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/15 hover:bg-red-500/20 transition-colors cursor-pointer">
            <FileText className="size-2.5" />
            PDF
          </button>
          <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/15 hover:bg-green-500/20 transition-colors cursor-pointer">
            <Download className="size-2.5" />
            CSV
          </button>
          <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors cursor-pointer">
            <FileSpreadsheet className="size-2.5" />
            XLSX
          </button>
        </div>
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
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [deletedId, setDeletedId] = useState<number | null>(null)

  const nextId = cleanData.length > 0 ? Math.max(...cleanData.map(d => d.id)) + 1 : 1

  const handleFormSubmit = (data: { setor: string; solicitante: string; material: string }) => {
    const now = new Date()
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(4, '2')}/${now.getFullYear()}`
    setCleanData((prev) => [...prev, { id: nextId, ...data, data: dateStr }])
  }

  const handleDelete = (id: number) => {
    setDeletedId(id)
    setTimeout(() => {
      setCleanData((prev) => prev.filter(row => row.id !== id))
      setDeletedId(null)
    }, 500)
  }

  const handleEdit = (id: number) => {
    const row = cleanData.find(r => r.id === id)
    if (row) {
      setEditingId(id)
      setEditValue(row.material)
    }
  }

  const handleEditSave = (id: number) => {
    setCleanData((prev) => prev.map(row => 
      row.id === id ? { ...row, material: editValue } : row
    ))
    setEditingId(null)
    setEditValue('')
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
            <AppWindow className="size-3.5" />
            Demonstração Interativa
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Por que usar uma{' '}
            <span className="text-lime">Formulário</span> em vez de{' '}
            <span className="text-coral">Planilha Direta</span>?
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Veja na prática como um formulário padroniza os dados antes de chegarem na planilha, eliminando inconsistências e adicionando funcionalidades.
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

          {/* Step 2: The form / application */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-lime/15 flex items-center justify-center">
                <AppWindow className="size-4 text-lime" />
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

          {/* Step 3: Clean spreadsheet with CRUD */}
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
                <p className="text-xs text-muted-lavender">Sigla automática, nome formatado, data consistente — com edição e exportação</p>
              </div>
            </div>
            <CleanSpreadsheet 
              data={cleanData.map(row => ({
                ...row,
                material: editingId === row.id ? editValue : row.material,
              }))}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            {/* Inline edit modal */}
            <AnimatePresence>
              {editingId !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 flex items-center gap-3"
                >
                  <Pencil className="size-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-foreground">Editar material:</span>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-foreground text-sm focus:border-blue-400/40 focus:outline-none focus:ring-1 focus:ring-blue-400/20 transition-all"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditSave(editingId)
                      if (e.key === 'Escape') { setEditingId(null); setEditValue('') }
                    }}
                  />
                  <button
                    onClick={() => handleEditSave(editingId)}
                    className="px-3 h-9 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors cursor-pointer"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => { setEditingId(null); setEditValue('') }}
                    className="px-3 h-9 rounded-lg bg-white/5 text-muted-lavender text-sm hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Delete confirmation toast */}
            <AnimatePresence>
              {deletedId !== null && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mt-3 rounded-lg border border-red-500/30 bg-red-500/5 p-3 flex items-center gap-2"
                >
                  <Trash2 className="size-4 text-red-400" />
                  <span className="text-sm text-red-400">Registro excluído com sucesso!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Explanatory note - Application features */}
          <motion.div
            className="mt-6 rounded-xl border border-lime/15 bg-lime/[0.03] p-5 sm:p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-muted-lavender leading-relaxed mb-5">
              <strong className="text-foreground">Como funciona:</strong> O formulário usa um menu suspenso (dropdown) para o setor,
              garantindo que só exista uma forma de escrever. A sigla é preenchida automaticamente.
              O nome é formatado para iniciar em maiúscula. A data é gerada pelo sistema, não digitada.
              Tudo isso <em className="text-lime not-italic font-medium">antes</em> de chegar na planilha!
            </p>

            {/* Application vs Spreadsheet features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left: CRUD features */}
              <div className="rounded-lg border border-white/6 bg-white/[0.02] p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="size-4 text-lime" />
                  Funções que um formulário oferece
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { icon: Pencil, label: 'Edição', desc: 'Altere um registro sem mexer diretamente na planilha' },
                    { icon: Trash2, label: 'Exclusão', desc: 'Remova registros incorretos com um clique' },
                    { icon: FileText, label: 'Exportar em PDF', desc: 'Gere relatórios formatados para impressão' },
                    { icon: Download, label: 'Exportar em CSV', desc: 'Compatível com qualquer sistema de dados' },
                    { icon: FileSpreadsheet, label: 'Exportar em XLSX', desc: 'Arquivo Excel para compartilhar com outros setores' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-lime/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="size-3 text-lime" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-foreground">{item.label}</span>
                        <p className="text-[11px] text-muted-lavender leading-snug">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Why it matters */}
              <div className="rounded-lg border border-white/6 bg-white/[0.02] p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="size-4 text-coral" />
                  Sem formulário, na planilha você...
                </h4>
                <ul className="space-y-2.5">
                  {[
                    'Precisa editar células diretamente, sem controle',
                    'Não tem confirmação antes de excluir uma linha',
                    'Não consegue gerar relatórios em PDF automaticamente',
                    'Não exporta dados formatados para outros sistemas',
                    'Qualquer pessoa pode alterar dados sem registro',
                    'Erros de digitação são corrigidos manualmente, um a um',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle className="size-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-muted-lavender leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
