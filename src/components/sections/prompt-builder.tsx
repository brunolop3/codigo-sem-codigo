'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wand2, Copy, Check, RotateCcw, ChevronRight, ChevronLeft,
  Download, ExternalLink, Plus, X, BarChart3, ClipboardList,
  Calculator, FileSearch, FileText, Search, Table, TableProperties,
  Filter, ArrowUpDown, Smartphone, FileCode,
  Sheet, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

// ─── Types ───────────────────────────────────────────────────────────────────

type FieldType = 'texto' | 'dropdown' | 'data' | 'numero'

interface FieldDef {
  id: string
  name: string
  type: FieldType
  options: string // comma-separated for dropdown
}

interface WizardToggles {
  validacoes: boolean
  googleSheets: boolean
  modoGoogle: boolean
  buscaInstantanea: boolean
  filtrosColuna: boolean
  paginacao: boolean
  ordenacao: boolean
  cabecalhoFixo: boolean
  designMobile: boolean
  codigoUnico: boolean
}

interface WizardState {
  step: number
  selectedPreset: string
  customPreset: string
  description: string
  fields: FieldDef[]
  toggles: WizardToggles
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'csc-prompt-builder-state'

const DEFAULT_TOGGLES: WizardToggles = {
  validacoes: true,
  googleSheets: false,
  modoGoogle: false,
  buscaInstantanea: true,
  filtrosColuna: true,
  paginacao: true,
  ordenacao: true,
  cabecalhoFixo: true,
  designMobile: true,
  codigoUnico: true,
}

const DEFAULT_STATE: WizardState = {
  step: 1,
  selectedPreset: '',
  customPreset: '',
  description: '',
  fields: [],
  toggles: { ...DEFAULT_TOGGLES },
}

const PRESETS = [
  {
    id: 'tabela',
    icon: BarChart3,
    label: 'Visualizador de tabela grande',
    emoji: '📊',
    highlighted: true,
    rank: 1,
    description: 'Tabela interativa com busca, filtros, paginação e ordenação para visualizar dados de planilhas',
    baseInstruction: 'Crie um Visualizador de Tabela Grande — uma página web interativa para consultar e explorar dados tabulares extensos.',
  },
  {
    id: 'formulario',
    icon: ClipboardList,
    label: 'Formulário padronizador',
    emoji: '📋',
    highlighted: true,
    rank: 2,
    description: 'Formulário com dropdowns controlados, validações e preenchimento automático de campos derivados',
    baseInstruction: 'Crie um Formulário Padronizador — um formulário web com campos controlados, validações rigorosas e preenchimento automático.',
  },
  {
    id: 'calculadora',
    icon: Calculator,
    label: 'Calculadora / Ferramenta de lógica',
    emoji: '🧮',
    highlighted: false,
    rank: 3,
    description: 'Ferramenta com cálculos automáticos, regras de negócio e resultados dinâmicos',
    baseInstruction: 'Crie uma Calculadora / Ferramenta de Lógica — uma aplicação web que executa cálculos e aplica regras de negócio automaticamente.',
  },
  {
    id: 'consulta',
    icon: FileSearch,
    label: 'Consulta de situação / Painel de indicadores',
    emoji: '📄',
    highlighted: false,
    rank: 4,
    description: 'Painel para consultar situações ou exibir indicadores e KPIs',
    baseInstruction: 'Crie uma Consulta de Situação / Painel de Indicadores — uma página web para consultar informações e exibir indicadores visuais.',
  },
  {
    id: 'cadastro',
    icon: FileText,
    label: 'Cadastro / Tramitação',
    emoji: '📝',
    highlighted: false,
    rank: 5,
    description: 'Sistema de cadastro ou tramitação de documentos/processos',
    baseInstruction: 'Crie um Sistema de Cadastro / Tramitação — uma aplicação web para registrar e acompanhar documentos ou processos.',
  },
  {
    id: 'outro',
    icon: Search,
    label: 'Outro (personalizado)',
    emoji: '🔍',
    highlighted: false,
    rank: 6,
    description: 'Descreva livremente o que precisa',
    baseInstruction: 'Crie uma ferramenta web personalizada conforme a descrição abaixo.',
  },
]

const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  texto: 'Texto',
  dropdown: 'Dropdown (com opções)',
  data: 'Data',
  numero: 'Número',
}

const STEP_LABELS = [
  'O que criar',
  'Campos e dados',
  'Comportamento',
  'Resultado',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadState(): WizardState {
  if (typeof window === 'undefined') return { ...DEFAULT_STATE }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as WizardState
      // Ensure toggles has all keys (forward compat)
      return {
        ...DEFAULT_STATE,
        ...parsed,
        toggles: { ...DEFAULT_TOGGLES, ...parsed.toggles },
      }
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_STATE }
}

function saveState(state: WizardState) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

let fieldIdCounter = 0
function newFieldId() {
  fieldIdCounter += 1
  return `field-${Date.now()}-${fieldIdCounter}`
}

function generatePrompt(state: WizardState): string {
  const preset = PRESETS.find((p) => p.id === state.selectedPreset)
  const { fields, toggles, description } = state

  // 1. Tipo
  const tipoMap: Record<string, string> = {
    tabela: 'Visualizador de Tabela Grande',
    formulario: 'Formulário Padronizador',
    calculadora: 'Calculadora / Ferramenta de Lógica',
    consulta: 'Consulta de Situação / Painel de Indicadores',
    cadastro: 'Sistema de Cadastro / Tramitação',
    outro: 'Ferramenta Web Personalizada',
  }
  const tipo = tipoMap[state.selectedPreset] || 'Ferramenta Web'

  // 2. Objetivo
  const objetivo = description.trim() || preset?.description || '[Descreva o objetivo da ferramenta]'

  // 3. Campos
  let camposSection = ''
  if (fields.length > 0) {
    camposSection = fields.map((f) => {
      const tipoLabel = FIELD_TYPE_LABELS[f.type]
      let line = `- **${f.name}** (${tipoLabel})`
      if (f.type === 'dropdown' && f.options.trim()) {
        const opts = f.options.split(',').map((o) => o.trim()).filter(Boolean)
        line += ` — Obrigatório, só aceita valores da lista: [${opts.join(', ')}]`
      } else if (f.type === 'texto') {
        line += ' — Texto livre, obrigatório'
      } else if (f.type === 'data') {
        line += ' — Formato DD/MM/AAAA, obrigatório'
      } else if (f.type === 'numero') {
        line += ' — Apenas dígitos, obrigatório'
      }
      return line
    }).join('\n')
  }

  // 4. Funcionalidades
  const funcionalidades: string[] = []
  if (toggles.validacoes) funcionalidades.push('Validação de todos os campos obrigatórios antes de enviar')
  if (toggles.designMobile) funcionalidades.push('Design responsivo (mobile-first)')
  if (toggles.codigoUnico) funcionalidades.push('Todo o código em um único arquivo HTML')

  // Table-specific features
  if (state.selectedPreset === 'tabela') {
    if (toggles.buscaInstantanea) funcionalidades.push('Busca instantânea que filtra em tempo real por múltiplas colunas')
    if (toggles.filtrosColuna) funcionalidades.push('Filtros combinados por dropdown em colunas selecionadas')
    if (toggles.paginacao) funcionalidades.push('Paginação com seletor de itens por página (10/25/50/100)')
    if (toggles.ordenacao) funcionalidades.push('Ordenação clicável por coluna (ascendente/descendente)')
    if (toggles.cabecalhoFixo) funcionalidades.push('Cabeçalho fixo ao rolar (sticky header)')
  }

  // 5. Integração com Google Sheets
  let integracaoSection = ''
  if (toggles.googleSheets) {
    if (toggles.modoGoogle) {
      integracaoSection = `Integre com Google Sheets usando HTML Service:
- Crie dois arquivos: Code.gs e Index.html
- No Code.gs, implemente doGet() que retorna HtmlService.createHtmlOutputFromFile('Index')
- No Code.gs, implemente funções com google.script.run para ler e gravar dados na planilha
- No Index.html, coloque todo o código HTML/CSS/JS da interface
- Use SpreadsheetApp.openById() para acessar a planilha por ID
- Dados de exemplo FICTÍCIOS embutidos no código para demonstração`
    } else {
      integracaoSection = `Integre com Google Sheets usando Apps Script:
- No arquivo HTML, implemente funções para enviar dados via fetch() para a URL do Apps Script (web app)
- No Code.gs, implemente doGet() para ler dados da planilha e retornar como JSON
- No Code.gs, implemente doPost() para receber dados do formulário e gravar na planilha
- Use ContentService.createTextOutput() com JSON.stringify() para retornar dados
- Use SpreadsheetApp.getActiveSpreadsheet() para acessar a planilha
- Dados de exemplo FICTÍCIOS embutidos no código para demonstração`
    }
  }

  // 6. Preset-specific instructions
  let presetSpecific = ''
  if (state.selectedPreset === 'tabela') {
    presetSpecific = `\n## Dados de Exemplo
Inclua pelo menos 20 registros fictícios no estilo de dados de servidor público universitário (ex: nome, matrícula, setor, cargo, situação, data de admissão). Os dados devem ser realistas mas completamente fictícios.`
  } else if (state.selectedPreset === 'formulario') {
    presetSpecific = `\n## Regras do Formulário Padronizador
- Todos os dropdowns são obrigatórios e só aceitam valores da lista predefinida
- Campos derivados devem ser preenchidos automaticamente com base na seleção de outros campos
- Validação completa antes de enviar — destaque visualmente os campos com erro
- Feedback visual claro: campos preenchidos corretamente ficam verdes, com erro ficam vermelhos
- Botão "Limpar" para resetar todo o formulário`
  } else if (state.selectedPreset === 'calculadora') {
    presetSpecific = `\n## Lógica da Calculadora
- Todos os cálculos devem ser atualizados em tempo real conforme o usuário altera os campos
- Mostre o resultado de forma destacada e fácil de ler
- Inclua validação para impedir valores inválidos (ex: divisão por zero, campos vazios)`
  }

  // Assemble
  let prompt = `Crie uma ${tipo} com as seguintes especificações:

## Objetivo
${objetivo}`

  if (camposSection) {
    prompt += `\n\n## Campos\n${camposSection}`
  }

  if (funcionalidades.length > 0) {
    prompt += `\n\n## Funcionalidades\n${funcionalidades.map((f) => `- ${f}`).join('\n')}`
  }

  if (integracaoSection) {
    prompt += `\n\n## Integração com Google Sheets\n${integracaoSection}`
  }

  if (presetSpecific) {
    prompt += `\n${presetSpecific}`
  }

  prompt += `\n\n## Requisitos
- Todo o código em ${toggles.modoGoogle && toggles.googleSheets ? 'dois arquivos (Code.gs e Index.html)' : 'um único arquivo HTML'}
- Dados de exemplo FICTÍCIOS (nunca dados reais)
- Comentários em português em todo o código
- Design responsivo (mobile-first)
- Visual moderno com tema escuro e cores institucionais
- Funcional imediatamente — não deixe placeholders ou TODOs`

  return prompt
}

// ─── Step 1: O que criar ─────────────────────────────────────────────────────

function StepOQueCriar({
  state,
  setState,
}: {
  state: WizardState
  setState: (s: WizardState) => void
}) {
  const selectedPreset = PRESETS.find((p) => p.id === state.selectedPreset)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          O que você quer criar?
        </h3>
        <p className="text-sm text-muted-lavender">
          Selecione um tipo de ferramenta ou descreva livremente
        </p>
      </div>

      {/* Preset grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESETS.map((preset) => {
          const Icon = preset.icon
          const isSelected = state.selectedPreset === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => {
                const newState = {
                  ...state,
                  selectedPreset: preset.id,
                  description: state.description || preset.description,
                }
                // Reset table toggles if not tabela
                if (preset.id !== 'tabela') {
                  newState.toggles = {
                    ...state.toggles,
                    buscaInstantanea: false,
                    filtrosColuna: false,
                    paginacao: false,
                    ordenacao: false,
                    cabecalhoFixo: false,
                  }
                } else {
                  newState.toggles = {
                    ...state.toggles,
                    buscaInstantanea: true,
                    filtrosColuna: true,
                    paginacao: true,
                    ordenacao: true,
                    cabecalhoFixo: true,
                  }
                }
                // Reset google modo if not formulario/tabela
                setState(newState)
              }}
              className={`
                relative group text-left p-4 rounded-xl border transition-all duration-200
                ${isSelected
                  ? 'border-lime/50 bg-lime/10 shadow-lg shadow-lime/5'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                }
                ${preset.highlighted && !isSelected ? 'border-lime/25 bg-lime/[0.03]' : ''}
              `}
            >
              {preset.highlighted && (
                <div className={`absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full ${preset.rank === 1 ? 'bg-lime' : 'bg-lime/60'}`}>
                  <span className="sr-only">{preset.rank === 1 ? 'Mais popular' : 'Popular'}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${
                  isSelected ? 'bg-lime/20' : 'bg-white/[0.06] group-hover:bg-white/[0.08]'
                }`}>
                  {preset.emoji}
                </div>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold leading-tight ${isSelected ? 'text-lime' : 'text-foreground'}`}>
                    {preset.label}
                  </div>
                  <div className="text-xs text-muted-lavender mt-1 leading-relaxed">
                    {preset.description}
                  </div>
                </div>
              </div>
              {isSelected && (
                <motion.div
                  layoutId="preset-ring"
                  className="absolute inset-0 rounded-xl border-2 border-lime/40 pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Custom preset input */}
      {state.selectedPreset === 'outro' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Qual tipo de ferramenta?
          </label>
          <input
            type="text"
            value={state.customPreset}
            onChange={(e) => setState({ ...state, customPreset: e.target.value })}
            placeholder="ex: Cronômetro de reuniões, Gerador de atas, Mapa interativo..."
            className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
          />
        </motion.div>
      )}

      {/* Freeform description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Descreva em suas palavras o que precisa
        </label>
        <textarea
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          placeholder={
            selectedPreset?.id === 'tabela'
              ? 'ex: Uma tabela para consultar dados de servidores com busca por nome e filtro por setor...'
              : selectedPreset?.id === 'formulario'
                ? 'ex: Um formulário para padronizar pedidos de material com dropdown de tipo e validação...'
                : 'Descreva o que a ferramenta deve fazer, para quem, e como deve funcionar...'
          }
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm resize-none"
        />
      </div>
    </div>
  )
}

// ─── Step 2: Campos e dados ──────────────────────────────────────────────────

function StepCampos({
  state,
  setState,
}: {
  state: WizardState
  setState: (s: WizardState) => void
}) {
  const addField = () => {
    setState({
      ...state,
      fields: [...state.fields, { id: newFieldId(), name: '', type: 'texto', options: '' }],
    })
  }

  const updateField = (id: string, updates: Partial<FieldDef>) => {
    setState({
      ...state,
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })
  }

  const removeField = (id: string) => {
    setState({
      ...state,
      fields: state.fields.filter((f) => f.id !== id),
    })
  }

  // Suggested fields based on preset
  const presetSuggestions: Record<string, string[]> = {
    tabela: ['Nome do Servidor', 'Matrícula', 'Setor', 'Cargo', 'Situação', 'Data de Admissão'],
    formulario: ['Nome do Solicitante', 'Setor de Origem', 'Tipo de Pedido', 'Descrição', 'Data do Pedido'],
    calculadora: ['Valor Base', 'Percentual', 'Resultado'],
    consulta: ['Protocolo', 'Nome', 'Situação', 'Data'],
    cadastro: ['Nome Completo', 'Documento', 'Setor', 'Assunto', 'Data de Entrada', 'Status'],
    outro: [],
  }

  const suggestions = presetSuggestions[state.selectedPreset] || []
  const unusedSuggestions = suggestions.filter(
    (s) => !state.fields.some((f) => f.name.toLowerCase() === s.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Campos e dados
        </h3>
        <p className="text-sm text-muted-lavender">
          Defina os campos que sua ferramenta precisa ter
        </p>
      </div>

      {/* Quick-add suggestions */}
      {unusedSuggestions.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-lavender mb-2">
            Sugestões rápidas (clique para adicionar)
          </label>
          <div className="flex flex-wrap gap-2">
            {unusedSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  const isDropdown = s.includes('Setor') || s.includes('Tipo') || s.includes('Situação') || s.includes('Status')
                  setState({
                    ...state,
                    fields: [
                      ...state.fields,
                      {
                        id: newFieldId(),
                        name: s,
                        type: isDropdown ? 'dropdown' : s.includes('Data') ? 'data' : 'texto',
                        options: isDropdown ? 'Opção 1, Opção 2, Opção 3' : '',
                      },
                    ],
                  })
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-lime/10 text-lime border border-lime/20 hover:bg-lime/20 transition-colors"
              >
                <Plus className="size-3 inline mr-1" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Field list */}
      <div className="space-y-3">
        {state.fields.length === 0 && (
          <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
            <div className="text-muted-lavender/60 text-sm mb-2">
              Nenhum campo adicionado ainda
            </div>
            <div className="text-muted-lavender/40 text-xs">
              Clique em &quot;Adicionar campo&quot; ou use as sugestões acima
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {state.fields.map((field, idx) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative border border-white/8 rounded-xl bg-white/[0.02] overflow-hidden"
            >
              <div className="flex items-center gap-2 p-3 border-b border-white/6">
                <div className="w-6 h-6 rounded-md bg-lime/10 text-lime text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-xs text-muted-lavender font-medium">Campo</span>
                <button
                  onClick={() => removeField(field.id)}
                  className="ml-auto p-1 rounded-md hover:bg-coral/10 text-muted-lavender hover:text-coral transition-colors"
                  aria-label="Remover campo"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-3 space-y-3">
                {/* Field name */}
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(field.id, { name: e.target.value })}
                  placeholder="Nome do campo (ex: Nome do Solicitante)"
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                />

                {/* Field type */}
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(FIELD_TYPE_LABELS) as FieldType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateField(field.id, { type: t, options: t === 'dropdown' ? field.options : '' })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        field.type === t
                          ? 'bg-lime/15 text-lime border-lime/30'
                          : 'bg-white/[0.04] text-muted-lavender border-white/8 hover:border-white/15 hover:text-foreground'
                      }`}
                    >
                      {FIELD_TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>

                {/* Dropdown options */}
                <AnimatePresence>
                  {field.type === 'dropdown' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <input
                        type="text"
                        value={field.options}
                        onChange={(e) => updateField(field.id, { options: e.target.value })}
                        placeholder="Opções separadas por vírgula (ex: Opção 1, Opção 2, Opção 3)"
                        className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add field button */}
      <button
        onClick={addField}
        className="w-full py-3 rounded-xl border border-dashed border-white/15 hover:border-lime/30 bg-white/[0.01] hover:bg-lime/[0.03] text-muted-lavender hover:text-lime transition-all text-sm font-medium flex items-center justify-center gap-2"
      >
        <Plus className="size-4" />
        Adicionar campo
      </button>
    </div>
  )
}

// ─── Step 3: Comportamento e integração ──────────────────────────────────────

function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  icon: Icon,
  disabled = false,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
  icon?: React.ElementType
  disabled?: boolean
}) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
        disabled
          ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent'
          : checked
            ? 'border-lime/25 bg-lime/[0.05]'
            : 'border-white/8 bg-white/[0.01] hover:border-white/12'
      }`}
    >
      {/* Toggle track */}
      <div className={`relative w-10 h-6 rounded-full flex-shrink-0 mt-0.5 transition-colors ${
        checked ? 'bg-lime' : 'bg-white/15'
      }`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
          checked
            ? 'left-5 bg-navy'
            : 'left-1 bg-muted-lavender'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 text-muted-lavender flex-shrink-0" />}
          <span className={`text-sm font-medium ${checked ? 'text-foreground' : 'text-muted-lavender'}`}>
            {label}
          </span>
        </div>
        {description && (
          <p className="text-xs text-muted-lavender/70 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </button>
  )
}

function StepComportamento({
  state,
  setState,
}: {
  state: WizardState
  setState: (s: WizardState) => void
}) {
  const t = state.toggles
  const setToggle = (key: keyof WizardToggles, value: boolean) => {
    const newToggles = { ...t, [key]: value }
    // If Google Sheets is turned off, also turn off modoGoogle
    if (key === 'googleSheets' && !value) {
      newToggles.modoGoogle = false
    }
    setState({ ...state, toggles: newToggles })
  }

  const isTable = state.selectedPreset === 'tabela'

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Comportamento e integração
        </h3>
        <p className="text-sm text-muted-lavender">
          Ative as funcionalidades que sua ferramenta precisa
        </p>
      </div>

      {/* General */}
      <div>
        <div className="text-xs font-semibold text-muted-lavender/60 uppercase tracking-wider mb-3">
          Geral
        </div>
        <div className="space-y-2">
          <ToggleSwitch
            checked={t.validacoes}
            onChange={(v) => setToggle('validacoes', v)}
            label="Validações de campo"
            description="Campos obrigatórios, verificação de formato, feedback visual de erros"
            icon={Check}
          />
          <ToggleSwitch
            checked={t.designMobile}
            onChange={(v) => setToggle('designMobile', v)}
            label="Design mobile-first"
            description="Layout otimizado para celular, botões grandes, campos fáceis de preencher"
            icon={Smartphone}
          />
          <ToggleSwitch
            checked={t.codigoUnico}
            onChange={(v) => setToggle('codigoUnico', v)}
            label="Código em arquivo único"
            description="Todo HTML, CSS e JS em um único arquivo para fácil cópia e uso"
            icon={FileCode}
          />
        </div>
      </div>

      {/* Google Sheets Integration */}
      <div>
        <div className="text-xs font-semibold text-muted-lavender/60 uppercase tracking-wider mb-3">
          Integração
        </div>
        <div className="space-y-2">
          <ToggleSwitch
            checked={t.googleSheets}
            onChange={(v) => setToggle('googleSheets', v)}
            label="Integração com Google Sheets"
            description="Gera código doGet/doPost para ler e gravar dados na planilha"
            icon={Sheet}
          />
          {t.googleSheets && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4"
            >
              <ToggleSwitch
                checked={t.modoGoogle}
                onChange={(v) => setToggle('modoGoogle', v)}
                label="Modo 100% Google (HTML Service)"
                description="Usa HtmlService com Code.gs + Index.html — roda totalmente dentro do Google Apps Script"
                icon={Globe}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Table-specific features */}
      {isTable && (
        <div>
          <div className="text-xs font-semibold text-muted-lavender/60 uppercase tracking-wider mb-3">
            Recursos de Tabela
          </div>
          <div className="space-y-2">
            <ToggleSwitch
              checked={t.buscaInstantanea}
              onChange={(v) => setToggle('buscaInstantanea', v)}
              label="Busca instantânea"
              description="Filtra resultados em tempo real por múltiplas colunas enquanto digita"
              icon={Search}
            />
            <ToggleSwitch
              checked={t.filtrosColuna}
              onChange={(v) => setToggle('filtrosColuna', v)}
              label="Filtros por coluna"
              description="Dropdowns de filtro em colunas selecionadas com filtros combinados"
              icon={Filter}
            />
            <ToggleSwitch
              checked={t.paginacao}
              onChange={(v) => setToggle('paginacao', v)}
              label="Paginação"
              description="Seletor de itens por página (10/25/50/100) com navegação entre páginas"
              icon={TableProperties}
            />
            <ToggleSwitch
              checked={t.ordenacao}
              onChange={(v) => setToggle('ordenacao', v)}
              label="Ordenação por coluna"
              description="Clique no cabeçalho para ordenar ascendente/descendente"
              icon={ArrowUpDown}
            />
            <ToggleSwitch
              checked={t.cabecalhoFixo}
              onChange={(v) => setToggle('cabecalhoFixo', v)}
              label="Cabeçalho fixo ao rolar"
              description="Header permanece visível enquanto o usuário rola pela tabela (sticky header)"
              icon={Table}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Step 4: Resultado ───────────────────────────────────────────────────────

function StepResultado({
  state,
  onReset,
}: {
  state: WizardState
  onReset: () => void
}) {
  const [copied, setCopied] = useState(false)
  const prompt = generatePrompt(state)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = prompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    toast.success('Prompt copiado para a área de transferência!')
    setTimeout(() => setCopied(false), 3000)
  }

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const tipo = state.selectedPreset || 'ferramenta'
    a.download = `prompt-${tipo}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Arquivo .txt baixado com sucesso!')
  }

  const aiLinks = [
    { label: 'Abrir no Claude', url: 'https://claude.ai/new', color: 'text-orange-400 border-orange-400/20 hover:bg-orange-400/10' },
    { label: 'Abrir no Gemini', url: 'https://gemini.google.com', color: 'text-blue-400 border-blue-400/20 hover:bg-blue-400/10' },
    { label: 'Abrir no ChatGPT', url: 'https://chatgpt.com', color: 'text-green-400 border-green-400/20 hover:bg-green-400/10' },
    { label: 'Abrir no Z.ai', url: 'https://z.ai', color: 'text-lime border-lime/20 hover:bg-lime/10' },
    { label: 'Abrir no Google AI Studio', url: 'https://aistudio.google.com', color: 'text-purple-400 border-purple-400/20 hover:bg-purple-400/10' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Seu prompt está pronto!
        </h3>
        <p className="text-sm text-muted-lavender">
          Copie, baixe ou abra diretamente em uma IA
        </p>
      </div>

      {/* Generated prompt */}
      <div className="border border-white/8 rounded-xl bg-white/[0.02] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm font-semibold text-foreground">Prompt Gerado</span>
          </div>
          <span className="text-xs text-muted-lavender">
            {prompt.length} caracteres
          </span>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto custom-scrollbar">
          <pre className="text-xs sm:text-sm leading-relaxed font-mono text-foreground/90 whitespace-pre-wrap">
            {prompt}
          </pre>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          className="bg-lime text-navy hover:bg-lime-dark font-semibold h-11 px-5 gap-2"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copiado!' : 'Copiar prompt'}
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          className="h-11 px-5 gap-2 border-white/15 hover:border-white/25 hover:bg-white/[0.04]"
        >
          <Download className="size-4" />
          Baixar .txt
        </Button>
      </div>

      {/* AI links */}
      <div>
        <div className="text-xs font-semibold text-muted-lavender/60 uppercase tracking-wider mb-3">
          Abrir em uma IA
        </div>
        <div className="flex flex-wrap gap-2">
          {aiLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${link.color}`}
            >
              <ExternalLink className="size-3" />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Recomeçar */}
      <div className="pt-4 border-t border-white/6">
        <Button
          variant="ghost"
          onClick={onReset}
          className="w-full text-muted-lavender hover:text-coral gap-2 hover:bg-coral/5"
        >
          <RotateCcw className="size-4" />
          Recomeçar do zero
        </Button>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PromptBuilder() {
  /* Load persisted state via lazy initializer (avoids set-state-in-effect lint error) */
  const [state, setStateRaw] = useState<WizardState>(() => loadState())

  // Persist state on every change via wrapper
  const setState = (s: WizardState) => {
    setStateRaw(s)
    saveState(s)
  }

  const handleReset = () => {
    setState({ ...DEFAULT_STATE, fields: [], toggles: { ...DEFAULT_TOGGLES } })
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    toast.info('Construtor reiniciado!')
  }

  const canAdvance = () => {
    if (state.step === 1) {
      return !!state.selectedPreset && (state.selectedPreset !== 'outro' || !!state.customPreset.trim())
    }
    return true
  }

  const goNext = () => {
    if (state.step < 4 && canAdvance()) {
      setState({ ...state, step: state.step + 1 })
    }
  }

  const goPrev = () => {
    if (state.step > 1) {
      setState({ ...state, step: state.step - 1 })
    }
  }

  return (
    <section id="builder" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-lime/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-coral/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Wand2 className="size-3.5" />
            Construtor Interativo 2.0
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Monte Seu{' '}
            <span className="text-lime text-glow-lime">Prompt</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Construa seu prompt em 4 etapas simples. Selecione o tipo, defina os campos, escolha as funcionalidades e copie o resultado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-surface/80 backdrop-blur border border-white/6 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            {/* Progress bar */}
            <div className="px-5 sm:px-8 pt-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = i + 1
                  const isActive = state.step === stepNum
                  const isComplete = state.step > stepNum
                  return (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => {
                          if (isComplete) setState({ ...state, step: stepNum })
                        }}
                        className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                          isComplete ? 'cursor-pointer' : isActive ? '' : 'cursor-default'
                        }`}
                      >
                        <div className={`
                          w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all
                          ${isActive
                            ? 'bg-lime text-navy shadow-lg shadow-lime/20'
                            : isComplete
                              ? 'bg-lime/20 text-lime border border-lime/30'
                              : 'bg-white/[0.06] text-muted-lavender/50 border border-white/8'
                          }
                        `}>
                          {isComplete ? (
                            <Check className="size-3.5 sm:size-4" />
                          ) : (
                            stepNum
                          )}
                        </div>
                        <span className={`hidden sm:inline text-xs font-medium transition-colors ${
                          isActive ? 'text-lime' : isComplete ? 'text-lime/70' : 'text-muted-lavender/40'
                        }`}>
                          {label}
                        </span>
                      </button>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`w-6 sm:w-12 h-0.5 rounded-full transition-colors ${
                          state.step > stepNum ? 'bg-lime/40' : 'bg-white/8'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Mobile step label */}
              <div className="sm:hidden text-center">
                <span className="text-xs font-medium text-lime">
                  Etapa {state.step}: {STEP_LABELS[state.step - 1]}
                </span>
              </div>
            </div>

            {/* Step content */}
            <div className="px-5 sm:px-8 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {state.step === 1 && (
                    <StepOQueCriar state={state} setState={setState} />
                  )}
                  {state.step === 2 && (
                    <StepCampos state={state} setState={setState} />
                  )}
                  {state.step === 3 && (
                    <StepComportamento state={state} setState={setState} />
                  )}
                  {state.step === 4 && (
                    <StepResultado state={state} onReset={handleReset} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="px-5 sm:px-8 py-4 border-t border-white/6 bg-white/[0.01] flex items-center justify-between">
              <div>
                {state.step > 1 && (
                  <Button
                    variant="ghost"
                    onClick={goPrev}
                    className="text-muted-lavender hover:text-foreground gap-2"
                  >
                    <ChevronLeft className="size-4" />
                    Anterior
                  </Button>
                )}
              </div>
              <div>
                {state.step < 4 ? (
                  <Button
                    onClick={goNext}
                    disabled={!canAdvance()}
                    className="bg-lime text-navy hover:bg-lime-dark font-semibold h-11 px-6 gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Próximo
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <div /> // No next button on last step
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
