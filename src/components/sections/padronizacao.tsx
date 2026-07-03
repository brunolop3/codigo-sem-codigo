'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  FormInput,
  CalendarDays,
  Hash,
  ListChecks,
  LayoutGrid,
  Eye,
  Palette,
  Lightbulb,
  ArrowRight,
  ClipboardCheck,
  ScanSearch,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import regrasData from '@/content/regras-padronizacao.json'
import type { RegraPadronizacao } from '@/content/types'

/* ─── Icon mapping by rule number ─── */
const ruleIconMap: Record<number, React.ElementType> = {
  1: FileSpreadsheet,
  2: LayoutGrid,
  3: ListChecks,
  4: CalendarDays,
  5: Hash,
  6: ChevronDown,
  7: ScanSearch,
  8: Hash,
  9: LayoutGrid,
  10: Palette,
}

/* ─── Rule type with visual metadata ─── */
interface Rule {
  number: number
  title: string
  icon: React.ElementType
  explicacao: string
  exemploErrado: string
  exemploCerto: string
}

const rules: Rule[] = (regrasData as RegraPadronizacao[]).map((r) => ({
  number: r.numero,
  title: r.regra,
  icon: ruleIconMap[r.numero] ?? Shield,
  explicacao: r.explicacao,
  exemploErrado: r.exemploErrado,
  exemploCerto: r.exemploCerto,
}))

/* ─── Prompt: Formulário Padronizador ─── */
const promptFormulario = `Crie um Formulário Padronizador em um único arquivo HTML com tema escuro. Essa ferramenta é para servidores da UEMS (Universidade Estadual de Mato Grosso do Sul) que precisam coletar dados sem erros de padronização.

Requisitos:

1. Formulário com os seguintes campos:

   a) Campo "Setor" — Dropdown com opções pré-definidas (NÃO permite texto livre):
      - DARPP, DEPPE, DIND, DGPE, DCOP, DAEF, PROG, COSEP, GABINETE, ASSESSORIA

   b) Campo "Sigla do Setor" — Preenchido AUTOMATICAMENTE ao selecionar o setor:
      - Divisão de Avaliação e Reconhecimento → DARPP
      - Divisão de Projetos Pedagógicos → DEPPE
      - Divisão de Ingresso → DIND
      - Divisão de Gestão de Pessoas e Estágio → DGPE
      - Divisão de Cooperação e Programas → DCOP
      - Divisão de Administração e Finanças → DAEF
      - Pró-Reitoria de Graduação → PROG
      - Coordenação de Seleção e Programas → COSEP
      - Gabinete → GABINETE
      - Assessoria → ASSESSORIA

   c) Campo "Data" — Date picker que SÓ aceita formato dd/mm/aaaa, com máscara de entrada automática e validação.

   d) Campo "Quantidade" — Aceita SOMENTE números, sem letras ou símbolos. Mostra erro se o usuário digitar texto.

   e) Campo "Solicitante" — Texto livre, mas com validação mínima (pelo menos nome e sobrenome).

   f) Campo "Descrição do Material" — Dropdown com categorias pré-definidas:
      - Material de Escritório, Equipamento de TI, Mobiliário, Material Didático, Outro

2. Validação em tempo real:
   - Mostrar mensagem de erro vermelha abaixo de cada campo inválido
   - Desabilitar o botão "Enviar" se houver qualquer campo inválido
   - Destacar campos obrigatórios com asterisco (*)

3. Integração com Google Sheets via Apps Script:
   - Ao enviar o formulário, os dados são enviados para uma planilha do Google Sheets
   - Incluir o código do Apps Script como comentário no HTML, com instruções de configuração
   - O Apps Script deve receber os dados via POST e inserir na planilha na aba "Respostas"

4. Design:
   - Tema escuro com fundo #0A0A0F, cards #12121A, texto claro
   - Cor de destaque #C8FF2E (verde-limão)
   - Erros em #FF6B4A (coral)
   - Responsivo (funciona no celular)
   - Feedback visual ao enviar (animação de sucesso)

5. Tudo em um único arquivo HTML (CSS + JS embutidos). Não use frameworks externos, apenas HTML, CSS e JavaScript puro.`

/* ─── Prompt: Faxina de Planilha ─── */
const promptFaxina = `Crie um Google Apps Script chamado "Faxina de Planilha" que analisa uma planilha do Google Sheets e gera um relatório de inconsistências, SEM alterar nenhum dado automaticamente. Essa ferramenta é para servidores da UEMS.

Requisitos:

1. O script deve ser executado a partir do menu personalizado "🧹 Faxina" > "Analisar Planilha" na planilha ativa.

2. Análises que o script deve fazer:

   a) Formatos de data mistos:
      - Detectar células que parecem datas mas estão em formatos diferentes (dd/mm/aaaa, dd/mm/aa, aaaa-mm-dd, texto como "5 de maio", etc.)
      - Reportar: "Linha X, Coluna Y: formato de data suspeito → 'valor encontrado'"

   b) Datas inválidas:
      - Detectar datas impossíveis (ex: 32/13/2024, 00/00/00)
      - Reportar: "Linha X, Coluna Y: data impossível → 'valor encontrado'"

   c) Duplicatas:
      - Comparar linhas inteiras (ignorando espaços extras e maiúsculas/minúsculas)
      - Reportar: "Linha X é possível duplicata da Linha Y"

   d) Variações de grafia (nome de unidade/campus):
      - Lista de referência: Aquidauana, Campo Grande, Dourados, Paranaíba, Nova Andradina, Naviraí, Coxim, Amambaí, Ivinhema, Ponta Porã
      - Detectar variações como "DOURADOS", "dourados", "Dds", "C.Grande", etc.
      - Reportar: "Linha X, Coluna Y: possível variação de grafia → 'valor encontrado' (esperado: 'valor correto')"

   e) Células mescladas:
      - Detectar células mescladas na área de dados (linha 2 em diante)
      - Reportar: "Linha X, Coluna Y: célula mesclada detectada"

   f) Linhas em branco no meio dos dados:
      - Detectar linhas completamente vazias entre linhas com dados
      - Reportar: "Linha X: linha em branco no meio dos dados"

   g) Números misturados com texto:
      - Detectar células que deveriam conter apenas números mas têm texto junto (ex: "45 vagas", "aprox. 30")
      - Reportar: "Linha X, Coluna Y: número com texto → 'valor encontrado'"

   h) Informação composta em uma célula:
      - Detectar células que contêm " - " ou " CPF " como indicador de dados misturados
      - Reportar: "Linha X, Coluna Y: possível dado composto → 'valor encontrado'"

3. Formato do relatório:
   - Criar uma NOVA aba chamada "🧹 Relatório de Faxina" com a data/hora da análise
   - Colunas: Tipo, Linha, Coluna, Problema, Valor Encontrado, Sugestão
   - Total de problemas encontrados no topo
   - Resumo por tipo de problema
   - NÃO alterar nenhuma célula da aba original

4. Menu personalizado:
   - Ao abrir a planilha, criar menu "🧹 Faxina" com opção "Analisar Planilha"

5. Código limpo, comentado em português, com instruções de instalação no topo do script.`

/* ─── Example Comparison Component ─── */
function ExampleComparison({ exemploErrado, exemploCerto }: { exemploErrado: string; exemploCerto: string }) {
  const parseExample = (text: string) => {
    if (text.includes(' | ')) {
      return text.split(' | ')
    }
    if (text.includes(' → ')) {
      return text.split(' → ')
    }
    return [text]
  }

  const wrongParts = parseExample(exemploErrado)
  const rightParts = parseExample(exemploCerto)
  const maxCols = Math.max(wrongParts.length, rightParts.length)

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Wrong example */}
      <div className="rounded-lg overflow-hidden border text-xs">
        <div className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-bold tracking-wide bg-coral/15 text-coral border-coral/20">
          <XCircle className="size-3" />
          ERRADO
        </div>
        <div className="divide-y divide-coral/10">
          <div className="flex">
            {Array.from({ length: maxCols }).map((_, i) => (
              <div key={i} className="flex-1 px-2 py-1 text-coral/60">
                {wrongParts[i] ?? '—'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right example */}
      <div className="rounded-lg overflow-hidden border text-xs">
        <div className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-bold tracking-wide bg-lime/15 text-lime border-lime/20">
          <CheckCircle2 className="size-3" />
          CERTO
        </div>
        <div className="divide-y divide-lime/10">
          <div className="flex">
            {Array.from({ length: maxCols }).map((_, i) => (
              <div key={i} className="flex-1 px-2 py-1 text-lime/60">
                {rightParts[i] ?? '—'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Prompt Code Block ─── */
function PromptBlock({
  title,
  badge,
  prompt,
}: {
  title: string
  badge: string
  prompt: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      toast.success('Prompt copiado!', {
        description: 'Agora cole na IA e gere sua ferramenta.',
      })
      setTimeout(() => setCopied(false), 3000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = prompt
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      toast.success('Prompt copiado!', {
        description: 'Agora cole na IA e gere sua ferramenta.',
      })
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <Card className="bg-surface/80 border-white/6 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <Badge
              variant="secondary"
              className="ml-2 text-[10px] font-mono bg-lime/10 text-lime border-lime/20"
            >
              {badge}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={`h-8 gap-1.5 text-xs font-medium transition-all cursor-pointer ${
              copied
                ? 'text-lime bg-lime/10 hover:bg-lime/15'
                : 'text-muted-lavender hover:text-foreground hover:bg-white/5'
            }`}
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copiar Prompt
              </>
            )}
          </Button>
        </div>

        {/* Prompt content */}
        <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
          <pre className="text-sm sm:text-[0.8rem] leading-[1.8] font-mono text-foreground/90 whitespace-pre-wrap">
            <code>{prompt}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Main Component ─── */
export default function Padronizacao() {
  return (
    <section
      id="padronizacao"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Decorative backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-5 w-60 h-60 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── 1. Header ─── */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Shield className="size-3.5" />
            Defesa contra o Caos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Padronização: a planilha que não vira{' '}
            <span className="text-coral text-glow-coral">bagunça</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A melhor solução não é pedir para as pessoas se comportarem, e sim criar
            ferramentas que SÓ ACEITAM dados padronizados. Mas primeiro, você precisa
            saber o que padronizar.
          </p>
        </motion.div>

        {/* ─── 2. The 10 Golden Rules ─── */}
        <div className="mb-16 sm:mb-24">
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            As 10 Regras de Ouro
          </motion.h3>
          <motion.p
            className="text-muted-lavender text-sm sm:text-base text-center mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Siga essas regras e sua planilha nunca mais vai virar um caos.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {rules.map((rule, index) => {
              const Icon = rule.icon
              return (
                <motion.div
                  key={rule.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Card className="bg-surface/80 border-white/6 hover:border-white/10 transition-colors h-full">
                    <CardContent className="p-4 sm:p-5">
                      {/* Rule header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-lime/10 border border-lime/25 flex items-center justify-center">
                          <span className="text-lime font-bold text-sm">
                            {rule.number}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Icon className="size-4 text-lime/60 shrink-0" />
                            <h4 className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                              {rule.title}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <p className="text-xs text-muted-lavender leading-relaxed mb-3 ml-11">
                        {rule.explicacao}
                      </p>

                      {/* Side-by-side examples */}
                      <ExampleComparison
                        exemploErrado={rule.exemploErrado}
                        exemploCerto={rule.exemploCerto}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ─── 3. Tools That ENFORCE Standards ─── */}
        <motion.div
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-surface/80 border-lime/15 overflow-hidden">
            <CardContent className="p-5 sm:p-8">
              {/* Callout header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-lime/10 border border-lime/25 flex items-center justify-center">
                  <Lightbulb className="size-5 text-lime" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    Ferramentas que IMPEDEM o erro
                  </h3>
                  <p className="text-muted-lavender text-sm sm:text-base leading-relaxed">
                    A melhor solução não é pedir para as pessoas se comportarem, e sim
                    criar ferramentas que <strong className="text-lime">SÓ ACEITAM</strong>{' '}
                    dados padronizados. Se o formulário não permite erro, o erro não
                    acontece.
                  </p>
                </div>
              </div>

              {/* Form Mockup */}
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FormInput className="size-4 text-lime/70" />
                  <span className="text-sm font-semibold text-foreground">
                    Formulário Padronizador — Exemplo
                  </span>
                </div>

                <div className="space-y-4 max-w-md">
                  {/* Dropdown: Setor */}
                  <div>
                    <label className="block text-xs font-medium text-muted-lavender mb-1.5">
                      Setor <span className="text-coral">*</span>
                    </label>
                    <div className="relative">
                      <div className="w-full h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-between px-3 text-sm text-foreground">
                        <span>DARPP</span>
                        <ChevronDown className="size-3.5 text-muted-lavender" />
                      </div>
                      {/* Dropdown options (visual only) */}
                      <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-lime/20 bg-surface/95 z-10 shadow-lg overflow-hidden">
                        <div className="px-3 py-1.5 text-xs bg-lime/10 text-lime font-medium">
                          DARPP ← selecionado
                        </div>
                        <div className="px-3 py-1.5 text-xs text-muted-lavender hover:text-foreground">
                          DEPPE
                        </div>
                        <div className="px-3 py-1.5 text-xs text-muted-lavender hover:text-foreground">
                          DIND
                        </div>
                        <div className="px-3 py-1.5 text-xs text-muted-lavender hover:text-foreground">
                          DGPE
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-lime/60 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="size-2.5" />
                      Sem texto livre — só opções pré-definidas
                    </p>
                  </div>

                  {/* Auto-fill: Sigla */}
                  <div>
                    <label className="block text-xs font-medium text-muted-lavender mb-1.5">
                      Sigla do Setor <span className="text-lime text-[10px]">(auto)</span>
                    </label>
                    <div className="w-full h-9 rounded-md bg-lime/5 border border-lime/15 flex items-center px-3 text-sm text-lime">
                      DARPP
                      <span className="ml-auto text-[10px] text-lime/50 flex items-center gap-1">
                        <CheckCircle2 className="size-2.5" /> auto-preenchido
                      </span>
                    </div>
                    <p className="text-[10px] text-lime/60 mt-1 flex items-center gap-1">
                      <ArrowRight className="size-2.5" />
                      Preenchido automaticamente ao selecionar o setor
                    </p>
                  </div>

                  {/* Date picker */}
                  <div>
                    <label className="block text-xs font-medium text-muted-lavender mb-1.5">
                      Data <span className="text-coral">*</span>
                    </label>
                    <div className="w-full h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center px-3 text-sm text-foreground">
                      <CalendarDays className="size-3.5 text-muted-lavender mr-2" />
                      12/05/2024
                    </div>
                    <p className="text-[10px] text-lime/60 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="size-2.5" />
                      Só aceita formato dd/mm/aaaa
                    </p>
                  </div>

                  {/* Number-only field */}
                  <div>
                    <label className="block text-xs font-medium text-muted-lavender mb-1.5">
                      Quantidade <span className="text-coral">*</span>
                    </label>
                    <div className="w-full h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center px-3 text-sm text-foreground">
                      <Hash className="size-3.5 text-muted-lavender mr-2" />
                      45
                    </div>
                    <p className="text-[10px] text-lime/60 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="size-2.5" />
                      Aceita somente números
                    </p>
                  </div>

                  {/* Validation message example */}
                  <div className="rounded-md bg-coral/5 border border-coral/15 px-3 py-2 text-[11px] text-coral flex items-start gap-2">
                    <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                    <span>
                      Exemplo de validação: &quot;45 vagas&quot; seria recusado — digite
                      apenas o número.
                    </span>
                  </div>

                  {/* Submit button */}
                  <div className="pt-1">
                    <div className="h-9 rounded-md bg-lime/80 text-navy font-semibold text-sm flex items-center justify-center gap-2">
                      <ClipboardCheck className="size-4" />
                      Enviar Dados
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference to FormSheetDemo */}
              <div className="mt-5 flex items-center gap-2 px-4 py-3 rounded-lg bg-lime/5 border border-lime/15">
                <Eye className="size-4 text-lime shrink-0" />
                <p className="text-xs sm:text-sm text-muted-lavender">
                  Veja o exemplo completo na seção de{' '}
                  <a
                    href="#demo"
                    className="text-lime font-medium hover:underline underline-offset-2"
                  >
                    Demo acima
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── 4. Prompt: Formulário Padronizador ─── */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-3">
              <FormInput className="size-3.5" />
              Prompt Copiável
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Formulário Padronizador
            </h3>
            <p className="text-muted-lavender text-sm sm:text-base max-w-lg mx-auto">
              Copie este prompt, cole na IA e receba um formulário que SÓ ACEITA dados
              padronizados — com dropdowns, auto-fill e validação.
            </p>
          </div>
          <PromptBlock
            title="Formulário Padronizador"
            badge="formulario-padronizador"
            prompt={promptFormulario}
          />
        </motion.div>

        {/* ─── 5. Prompt: Faxina de Planilha ─── */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-3">
              <ScanSearch className="size-3.5" />
              Prompt Copiável
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Faxina de Planilha
            </h3>
            <p className="text-muted-lavender text-sm sm:text-base max-w-lg mx-auto">
              Um Apps Script que analisa sua planilha e gera um relatório completo de
              inconsistências — sem alterar nada automaticamente.
            </p>
          </div>
          <PromptBlock
            title="Faxina de Planilha"
            badge="faxina-planilha"
            prompt={promptFaxina}
          />
        </motion.div>
      </div>
    </section>
  )
}
