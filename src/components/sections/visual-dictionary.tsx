'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Layers,
  PanelTop,
  Search,
  Bell,
  Copy,
  Check,
  BookOpen,
  X,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Filter,
} from 'lucide-react'
import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import dicionarioData from '@/content/dicionario.json'
import type { DicionarioItem } from '@/content/types'

/* ─── Visual metadata mapping (not stored in JSON) ─── */
const termMeta: Record<string, { icon: React.ElementType; color: 'lime' | 'coral'; demoComponent: React.ComponentType }> = {
  'kpi': { icon: BarChart3, color: 'lime', demoComponent: KpiDemo },
  'modais': { icon: Layers, color: 'coral', demoComponent: ModalDemo },
  'abas': { icon: PanelTop, color: 'lime', demoComponent: TabsDemo },
  'filtros': { icon: Search, color: 'coral', demoComponent: FiltrosDemo },
  'toasts': { icon: Bell, color: 'lime', demoComponent: ToastDemo },
}

/* ─── Build visual terms from JSON ─── */
interface VisualTerm {
  id: string
  icon: React.ElementType
  title: string
  description: string
  howToAsk: string
  color: 'lime' | 'coral'
  demoComponent: React.ComponentType
}

const visualTerms: VisualTerm[] = (dicionarioData as DicionarioItem[]).map((item, index) => {
  const ids = ['kpi', 'modais', 'abas', 'filtros', 'toasts']
  const meta = termMeta[ids[index] ?? 'kpi'] ?? termMeta['kpi']
  return {
    id: ids[index] ?? `term-${index}`,
    icon: meta.icon,
    title: item.termo,
    description: item.definicao,
    howToAsk: item.exemplo ?? '',
    color: meta.color,
    demoComponent: meta.demoComponent,
  }
})

/* ─── KPI Cards Demo ─── */
function KpiDemo() {
  const kpis = [
    { label: 'Total de Documentos', value: '247', icon: FileText, color: 'lime', trend: '+12%' },
    { label: 'Pendentes', value: '12', icon: Clock, color: 'coral', trend: '-3%' },
    { label: 'Concluídos', value: '235', icon: CheckCircle2, color: 'lime', trend: '+8%' },
  ]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.label}
            className={`rounded-lg border p-2.5 text-center ${
              kpi.color === 'lime'
                ? 'bg-lime/5 border-lime/15'
                : 'bg-coral/5 border-coral/15'
            }`}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <kpi.icon className={`size-3.5 mx-auto mb-1 ${
              kpi.color === 'lime' ? 'text-lime' : 'text-coral'
            }`} />
            <p className="text-lg font-bold text-foreground leading-none">{kpi.value}</p>
            <p className="text-[9px] text-muted-lavender mt-1 leading-tight">{kpi.label}</p>
            <span className={`text-[9px] font-medium ${
              kpi.color === 'lime' ? 'text-lime' : 'text-coral'
            }`}>
              {kpi.trend}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Modal Demo ─── */
function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      toast.success('Documento registrado com sucesso!', {
        description: 'Protocolo #2025-0247 criado',
      })
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-coral/15 text-coral hover:bg-coral/25 border border-coral/20 h-8 text-xs gap-1.5 w-full"
        >
          <Plus className="size-3" />
          Abrir Modal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[hsl(240,6%,10%)] border-white/10 text-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Layers className="size-4 text-coral" />
            Novo Documento
          </DialogTitle>
          <DialogDescription className="text-muted-lavender">
            Preencha os dados para registrar um novo documento no sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Tipo</label>
            <div className="h-9 rounded-md border border-white/10 bg-white/[0.04] px-3 flex items-center text-sm text-muted-lavender">
              Ofício
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Setor de Destino</label>
            <div className="h-9 rounded-md border border-white/10 bg-white/[0.04] px-3 flex items-center text-sm text-muted-lavender">
              Procuradoria Institucional
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Assunto</label>
            <div className="h-16 rounded-md border border-white/10 bg-white/[0.04] px-3 pt-2 text-sm text-muted-lavender">
              Solicitação de parecer jurídico...
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-muted-lavender hover:text-foreground"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitted}
            className="bg-coral text-white hover:bg-coral/80 gap-1.5 h-8"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="size-3.5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <ArrowUpRight className="size-3.5" />
                Enviar Documento
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Toast Demo ─── */
function ToastDemo() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.success('Salvo com sucesso!', {
              description: 'Os dados foram registrados no sistema.',
            })
          }
          className="h-8 text-xs gap-1.5 border-lime/20 text-lime hover:bg-lime/10 bg-lime/5"
        >
          <CheckCircle2 className="size-3" />
          Sucesso
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.error('Erro ao salvar', {
              description: 'Verifique os dados e tente novamente.',
            })
          }
          className="h-8 text-xs gap-1.5 border-coral/20 text-coral hover:bg-coral/10 bg-coral/5"
        >
          <AlertCircle className="size-3" />
          Erro
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.warning('Atenção', {
              description: 'Prazo de tramitação se aproximando.',
            })
          }
          className="h-8 text-xs gap-1.5 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 bg-yellow-400/5"
        >
          <AlertCircle className="size-3" />
          Alerta
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.info('Dica', {
              description: 'Você pode exportar os dados em PDF.',
            })
          }
          className="h-8 text-xs gap-1.5 border-blue-400/20 text-blue-400 hover:bg-blue-400/10 bg-blue-400/5"
        >
          <Info className="size-3" />
          Info
        </Button>
      </div>
    </div>
  )
}

/* ─── Tabs Demo ─── */
function TabsDemo() {
  return (
    <Tabs defaultValue="vagas" className="w-full">
      <TabsList className="bg-white/5 h-8 p-0.5 w-full">
        <TabsTrigger
          value="vagas"
          className="h-7 text-[10px] data-[state=active]:bg-lime/15 data-[state=active]:text-lime flex-1 gap-1"
        >
          <Users className="size-3" />
          Vagas
        </TabsTrigger>
        <TabsTrigger
          value="concluintes"
          className="h-7 text-[10px] data-[state=active]:bg-lime/15 data-[state=active]:text-lime flex-1 gap-1"
        >
          <CheckCircle2 className="size-3" />
          Concluintes
        </TabsTrigger>
        <TabsTrigger
          value="docs"
          className="h-7 text-[10px] data-[state=active]:bg-lime/15 data-[state=active]:text-lime flex-1 gap-1"
        >
          <FileText className="size-3" />
          Documentos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vagas" className="mt-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-lg border border-white/8 bg-white/[0.02] p-3"
        >
          <div className="space-y-2">
            {[
              { curso: 'Administração', vagas: 40, inscritos: 156 },
              { curso: 'Direito', vagas: 60, inscritos: 312 },
              { curso: 'Pedagogia', vagas: 50, inscritos: 198 },
            ].map((item) => (
              <div key={item.curso} className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.curso}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-lavender">{item.inscritos}/{item.vagas}</span>
                  <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-lime/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.inscritos / item.vagas) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TabsContent>
      <TabsContent value="concluintes" className="mt-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-lg border border-white/8 bg-white/[0.02] p-3"
        >
          <div className="space-y-2">
            {[
              { ano: '2022', total: 892, crescimento: '+5%' },
              { ano: '2023', total: 1043, crescimento: '+17%' },
              { ano: '2024', total: 1187, crescimento: '+14%' },
            ].map((item) => (
              <div key={item.ano} className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.ano}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-lavender">{item.total}</span>
                  <span className="text-lime text-[10px] font-medium">{item.crescimento}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TabsContent>
      <TabsContent value="docs" className="mt-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-lg border border-white/8 bg-white/[0.02] p-3"
        >
          <div className="space-y-2">
            {[
              { tipo: 'Ofícios', quantidade: 48, status: 'Em dia' },
              { tipo: 'Pareceres', quantidade: 23, status: 'Pendente' },
              { tipo: 'Resoluções', quantidade: 12, status: 'Em dia' },
            ].map((item) => (
              <div key={item.tipo} className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.tipo}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-lavender">{item.quantidade}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    item.status === 'Em dia' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}

/* ─── Filtros Demo ─── */
function FiltrosDemo() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')

  const allItems = [
    { nome: 'Ofício #2025-001', setor: 'DARPP', status: 'Concluído' },
    { nome: 'Ofício #2025-002', setor: 'DIGES', status: 'Pendente' },
    { nome: 'Ofício #2025-003', setor: 'DEPPE', status: 'Concluído' },
    { nome: 'Parecer #2025-004', setor: 'PI', status: 'Em análise' },
    { nome: 'Resolução #2025-005', setor: 'DARPP', status: 'Concluído' },
  ]

  const filtered = allItems.filter((item) => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase()) || item.setor.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'todos' || item.setor === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-lavender" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full h-7 pl-7 pr-2 rounded-md bg-white/[0.04] border border-white/10 text-xs text-foreground placeholder:text-muted-lavender/50 focus:border-lime/30 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-lavender pointer-events-none" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-7 pl-7 pr-6 rounded-md bg-white/[0.04] border border-white/10 text-xs text-foreground focus:border-lime/30 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="todos">Todos</option>
            <option value="DARPP">DARPP</option>
            <option value="DIGES">DIGES</option>
            <option value="DEPPE">DEPPE</option>
            <option value="PI">PI</option>
          </select>
        </div>
      </div>
      <div className="rounded-lg border border-white/8 bg-white/[0.02] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                key={item.nome}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 last:border-0 text-[10px]"
              >
                <div>
                  <span className="text-foreground font-medium">{item.nome}</span>
                  <span className="text-muted-lavender ml-1.5">{item.setor}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full font-medium ${
                  item.status === 'Concluído'
                    ? 'bg-lime/10 text-lime'
                    : item.status === 'Pendente'
                    ? 'bg-coral/10 text-coral'
                    : 'bg-yellow-400/10 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-3 text-[10px] text-muted-lavender text-center"
            >
              Nenhum resultado encontrado
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

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
            Peças incríveis que você pode pedir para a IA. Clique e experimente cada componente
            interativamente — são exemplos reais do que a IA pode gerar para você.
          </p>
        </motion.div>

        {/* Visual terms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visualTerms.map((term, i) => {
            const DemoComponent = term.demoComponent
            return (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={term.id === 'toasts' ? 'md:col-span-2 lg:col-span-1' : ''}
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

                    {/* Interactive Demo Area */}
                    <div className="rounded-lg border border-white/8 bg-[hsl(240,6%,6%)] p-3 mb-4 relative overflow-hidden">
                      <div className="absolute top-1.5 right-1.5">
                        <span className="text-[8px] uppercase tracking-widest text-lime/40 font-medium">
                          ao vivo
                        </span>
                      </div>
                      <DemoComponent />
                    </div>

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
            )
          })}
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
