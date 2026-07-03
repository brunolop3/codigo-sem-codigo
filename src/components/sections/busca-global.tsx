'use client'

/**
 * BuscaGlobal — Busca global com atalho Ctrl+K
 *
 * Componente que abre um modal de busca ao pressionar Ctrl+K (ou Cmd+K no Mac).
 * Indexa: títulos de seções, termos do dicionário, prompts da biblioteca,
 * regras de padronização e perguntas do FAQ.
 *
 * Usa o componente Command do shadcn/ui (já instalado).
 * Ao selecionar um resultado, navega por âncora (#id) e fecha o modal.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  BookOpen,
  Zap,
  Database,
  Shield,
  Library,
  Plug,
  BarChart3,
  Wrench,
  AlertTriangle,
  HelpCircle,
  ArrowRightLeft,
  FileText,
  Rocket,
  Search,
  X,
} from 'lucide-react'

/* ─── Índice de busca ───
 * Cada item: { label, description, section, icon, category }
 * Atualizado manualmente conforme o conteúdo do site evolui.
 */
interface SearchItem {
  label: string
  description: string
  section: string
  icon: typeof BookOpen
  category: string
}

const searchIndex: SearchItem[] = [
  // Seções principais
  { label: 'Guia de Introdução', description: 'Os princípios e a regra de ouro do prompt', section: '#guide', icon: BookOpen, category: 'Seções' },
  { label: 'Teste em 5 Minutos', description: 'Vitória rápida: copie um prompt e crie uma ferramenta agora', section: '#teste5min', icon: Zap, category: 'Seções' },
  { label: 'Domando Tabelas Gigantes', description: '5 técnicas para navegar planilhas com milhares de linhas', section: '#tabelas', icon: Database, category: 'Seções' },
  { label: 'Padronização de Dados', description: '10 regras de ouro para a planilha não virar bagunça', section: '#padronizacao', icon: Shield, category: 'Seções' },
  { label: 'Biblioteca de Prompts', description: 'Prompts completos e testados por categoria', section: '#biblioteca', icon: Library, category: 'Seções' },
  { label: 'Conectando ao Google Sheets', description: 'Passo a passo do Apps Script (doGet/doPost)', section: '#conectar', icon: Plug, category: 'Seções' },
  { label: '100% Dentro do Google', description: 'Modo seguro: HTML Service com acesso restrito ao domínio', section: '#dentro-do-google', icon: Shield, category: 'Seções' },
  { label: 'Exemplo Real: Dashboard ENADE', description: 'Dashboard desenvolvido com IA para a UEMS', section: '#enade', icon: BarChart3, category: 'Seções' },
  { label: 'Construtor de Prompt', description: 'Monte seu prompt interativamente', section: '#builder', icon: Wrench, category: 'Seções' },
  { label: 'Manutenção e Socorro', description: '8 problemas comuns e como resolvê-los', section: '#socorro', icon: AlertTriangle, category: 'Seções' },
  { label: 'Segurança e LGPD', description: 'Regras para proteger dados pessoais no serviço público', section: '#seguranca-lgpd', icon: Shield, category: 'Seções' },
  { label: 'Perguntas Frequentes (FAQ)', description: '10 dúvidas reais de quem está começando', section: '#faq', icon: HelpCircle, category: 'Seções' },
  { label: 'Publicar sua Ferramenta', description: 'GitHub Pages, Google Sites ou Moodle — qual escolher', section: '#publicar', icon: Rocket, category: 'Seções' },
  { label: 'Comparador de Prompts', description: 'Veja a diferença entre um prompt ruim e um bom', section: '#comparador', icon: ArrowRightLeft, category: 'Seções' },

  // Técnicas de tabela
  { label: 'Busca instantânea', description: 'Filtrar tabela em tempo real por todas as colunas', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },
  { label: 'Filtros combinados', description: 'Dropdowns que funcionam juntos (Unidade + Grau + Conceito)', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },
  { label: 'Paginação', description: '10/25/50/100 itens por página com controles', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },
  { label: 'Cabeçalho fixo (sticky)', description: 'Header visível ao rolar a tabela', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },
  { label: 'Ordenação clicável', description: 'Clique no cabeçalho para ordenar asc/desc', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },
  { label: 'Semáforo de cores', description: 'Bolinhas coloridas para conceitos 1-5 (vermelho→verde)', section: '#tabelas', icon: Search, category: 'Técnicas de Tabela' },

  // Regras de padronização
  { label: 'Uma linha de cabeçalho', description: 'Regra 1: cabeçalho sempre na linha 1', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Nunca mesclar células', description: 'Regra 2: células mescladas quebram filtros e ordenação', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Uma informação por coluna', description: 'Regra 3: não misture "Nome - CPF" numa célula', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Datas no mesmo formato', description: 'Regra 4: sempre dd/mm/aaaa', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Números sem texto', description: 'Regra 5: só 45, não "45 vagas"', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Listas controladas (dropdown)', description: 'Regra 6: evita "Dourados", "DOURADOS", "dourados"', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Sem linhas em branco', description: 'Regra 7: dados contínuos, sem buracos', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Código/ID único', description: 'Regra 8: identificador único por registro', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Uma aba por tipo de dado', description: 'Regra 9: não misturar cadastro com relatório', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },
  { label: 'Cor não é informação', description: 'Regra 10: use coluna de status, não célula colorida', section: '#padronizacao', icon: FileText, category: 'Regras de Padronização' },

  // Prompts da biblioteca
  { label: 'Visualizador de Tabela Grande', description: 'Busca, filtros, paginação, ordenação, sticky header', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Formulário de Cadastro Padronizado', description: 'Dropdowns, validação, auto-fill, Sheets integration', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Ferramenta 100% Google', description: 'App completo com HTML Service, código dentro do Apps Script', section: '#biblioteca', icon: Shield, category: 'Prompts' },
  { label: 'Painel de Acessos LGPD', description: 'Log de acessos a dados pessoais com auditoria', section: '#biblioteca', icon: Shield, category: 'Prompts' },
  { label: 'Acompanhamento de Metas', description: 'Dashboard de metas institucionais com indicadores', section: '#biblioteca', icon: BarChart3, category: 'Prompts' },
  { label: 'Calculadora de Prazos Administrativos', description: 'Calcula prazos de Resoluções e Portarias', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Painel de Indicadores (KPIs)', description: 'Dashboard com cards, gráficos e filtros', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Controle de Tramitação', description: 'Rastreamento de documentos com timeline', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Faxina de Planilha', description: 'Apps Script que detecta inconsistências sem alterar', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Registro de Portaria', description: 'Log de entrada/saída de malotes', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Gerador de Relatório', description: 'Lê Sheets e gera relatório HTML formatado', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Consulta de Processos', description: 'Busca por protocolo ou setor', section: '#biblioteca', icon: Library, category: 'Prompts' },
  { label: 'Checklist de Conformidade', description: 'Verifica documentos obrigatórios com barra de progresso', section: '#biblioteca', icon: Library, category: 'Prompts' },

  // FAQ
  { label: 'Preciso saber programar?', description: 'Não! É para isso que serve a IA', section: '#faq', icon: HelpCircle, category: 'FAQ' },
  { label: 'Qual IA é melhor?', description: 'Z.ai, Google AI Studio, ChatGPT, Claude — compare', section: '#faq', icon: HelpCircle, category: 'FAQ' },
  { label: 'Minha planilha tem milhares de linhas', description: 'A ferramenta aguenta? Sim, com as técnicas certas', section: '#faq', icon: HelpCircle, category: 'FAQ' },
  { label: 'Quanto custa?', description: 'IAs gratuitas resolvem 90% dos casos', section: '#faq', icon: HelpCircle, category: 'FAQ' },
  { label: 'Os dados ficam seguros?', description: 'Sim, seguindo as orientações de LGPD', section: '#faq', icon: HelpCircle, category: 'FAQ' },
]

export default function BuscaGlobal() {
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)

  /* Listener global para Ctrl+K / Cmd+K */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      // Fecha com Escape
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  /* Mostra uma dica flutuante após 4 segundos (apenas uma vez por sessão) */
  useEffect(() => {
    const dismissed = sessionStorage.getItem('csc-ctrlk-hint-dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setShowHint(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    try {
      sessionStorage.setItem('csc-ctrlk-hint-dismissed', '1')
    } catch {
      // Ignora erro
    }
  }

  /* Navega para a seção e fecha o modal */
  const handleSelect = (section: string) => {
    setOpen(false)
    // Pequeno delay para o modal fechar antes de scrollar
    setTimeout(() => {
      document.querySelector(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  /* Agrupa itens por categoria para exibição */
  const groupedItems = searchIndex.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, SearchItem[]>)

  return (
    <>
      {/* Botão de busca discreto na barra de navegação — desktop mostra texto, mobile mostra só ícone */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-white/8 bg-white/[0.03] text-xs text-muted-lavender hover:text-foreground hover:border-white/15 transition-all"
        aria-label="Buscar (Ctrl+K)"
      >
        <Search className="size-3.5" />
        <span className="hidden md:inline">Buscar...</span>
        <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-[9px] font-mono">
          Ctrl K
        </kbd>
      </button>

      {/* Modal de busca — usa CommandDialog do shadcn/ui */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar seção, técnica, prompt ou pergunta..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-8 text-center">
              <Search className="size-8 text-muted-lavender/30 mx-auto mb-2" />
              <p className="text-sm text-muted-lavender">Nada encontrado.</p>
              <p className="text-xs text-muted-lavender/60 mt-1">
                Tente: "tabela", "prompt", "padronização", "sheets"...
              </p>
            </div>
          </CommandEmpty>

          {/* Renderiza cada categoria como um CommandGroup */}
          {Object.entries(groupedItems).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={`${item.category}-${item.label}`}
                  value={`${item.label} ${item.description} ${item.category}`}
                  onSelect={() => handleSelect(item.section)}
                  className="cursor-pointer"
                >
                  <item.icon className="size-4 text-lime/60 mr-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-lavender truncate">{item.description}</p>
                  </div>
                  <span className="text-[10px] text-muted-lavender/40 font-mono ml-2 hidden sm:inline">
                    {item.section.replace('#', '→ ')}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      {/* Dica flutuante sobre Ctrl+K — aparece após 4s, apenas uma vez por sessão */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            className="fixed bottom-24 right-6 z-30 max-w-[280px] bg-surface border border-lime/20 rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime/15 flex items-center justify-center flex-shrink-0">
                  <Search className="size-4 text-lime" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground mb-0.5">Dica rápida!</p>
                  <p className="text-xs text-muted-lavender leading-relaxed">
                    Pressione{' '}
                    <kbd className="inline-block px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px] font-mono text-lime">Ctrl K</kbd>{' '}
                    para buscar qualquer coisa no guia.
                  </p>
                  <button
                    onClick={dismissHint}
                    className="mt-2 text-[10px] text-muted-lavender/60 hover:text-foreground transition-colors"
                  >
                    Entendi, fechar
                  </button>
                </div>
                <button
                  onClick={dismissHint}
                  className="text-muted-lavender/40 hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Fechar dica"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
            {/* Seta apontando para o botão de busca */}
            <div className="absolute -top-1.5 right-8 w-3 h-3 bg-surface border-t border-l border-lime/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
