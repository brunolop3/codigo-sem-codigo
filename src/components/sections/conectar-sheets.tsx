'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plug,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Lightbulb,
  Copy,
  FileSpreadsheet,
  Code2,
  Globe,
  Shield,
  Link2,
  Lock,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Apps Script code for copy ─── */
const APPS_SCRIPT_CODE = `// =============================================
// Código para o Google Apps Script
// Cole este código no editor do Apps Script
// =============================================

// doGet: responde a requisições GET (para LER dados)
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPost: responde a requisições POST (para SALVAR dados)
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dados = JSON.parse(e.postData.contents);
  sheet.appendRow(dados);
  return ContentService.createTextOutput(JSON.stringify({status: 'sucesso'}))
    .setMimeType(ContentService.MimeType.JSON);
}`

/* ─── Step definitions ─── */
const STEPS = [
  { number: 1, title: 'Criar a Planilha', shortTitle: 'Planilha' },
  { number: 2, title: 'Abrir o Apps Script', shortTitle: 'Apps Script' },
  { number: 3, title: 'Colar o Código', shortTitle: 'Código' },
  { number: 4, title: 'Implantar como App da Web', shortTitle: 'Implantar' },
  { number: 5, title: 'Configurar Permissões', shortTitle: 'Permissões' },
  { number: 6, title: 'Colar a URL na Ferramenta', shortTitle: 'URL' },
]

/* ─── Sub-components ─── */

function CalloutTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-lime/5 border border-lime/15 mt-5">
      <Lightbulb className="size-5 text-lime shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  )
}

function CalloutError({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-coral/5 border border-coral/15 mt-5">
      <AlertTriangle className="size-5 text-coral shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  )
}

function CalloutWarning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/15 mt-5">
      <AlertTriangle className="size-5 text-yellow-400 shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  )
}

/* ─── Step 1: Criar a Planilha ─── */
function Step1Content() {
  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        Abra o Google Sheets e crie uma nova planilha. Na primeira linha, digite os cabeçalhos das colunas.
      </p>

      {/* Mock Google Sheets */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1A1A2E] border-b border-white/6">
          <FileSpreadsheet className="size-4 text-green-400" />
          <span className="text-xs text-muted-lavender font-medium">Minha Planilha - Google Sheets</span>
        </div>
        {/* Column headers */}
        <div className="bg-surface/90">
          <div className="flex border-b border-white/6">
            <div className="w-12 px-2 py-1.5 text-[10px] text-muted-lavender/50 border-r border-white/6" />
            {['A', 'B', 'C', 'D', 'E'].map((col) => (
              <div
                key={col}
                className="flex-1 px-3 py-1.5 text-[10px] text-muted-lavender/60 font-medium text-center border-r border-white/6 last:border-r-0"
              >
                {col}
              </div>
            ))}
          </div>
          {/* Row 1: Headers */}
          <div className="flex border-b border-white/6 bg-lime/[0.06]">
            <div className="w-12 px-2 py-2.5 text-[10px] text-muted-lavender/40 border-r border-white/6 text-center">1</div>
            {['Protocolo', 'Nome', 'Setor', 'Data', 'Status'].map((header) => (
              <div
                key={header}
                className="flex-1 px-3 py-2.5 text-xs text-lime font-semibold border-r border-white/6 last:border-r-0"
              >
                {header}
              </div>
            ))}
          </div>
          {/* Empty rows */}
          {[2, 3, 4, 5].map((row) => (
            <div key={row} className="flex border-b border-white/4 last:border-b-0">
              <div className="w-12 px-2 py-2.5 text-[10px] text-muted-lavender/30 border-r border-white/6 text-center">{row}</div>
              {[1, 2, 3, 4, 5].map((col) => (
                <div key={col} className="flex-1 px-3 py-2.5 border-r border-white/6 last:border-r-0" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <CalloutTip>
        <strong>Dica:</strong> Na linha 1, coloque os títulos das colunas exatamente como quer que apareçam. Sem acentos especiais no cabeçalho facilita.
      </CalloutTip>
    </div>
  )
}

/* ─── Step 2: Abrir o Apps Script ─── */
function Step2Content() {
  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        Com a planilha aberta, acesse o menu <strong className="text-foreground">Extensões</strong> e depois clique em <strong className="text-foreground">Apps Script</strong>.
      </p>

      {/* Mock Google Sheets menu */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        <div className="bg-[#1A1A2E] px-4 py-2 border-b border-white/6">
          <div className="flex items-center gap-4">
            <FileSpreadsheet className="size-4 text-green-400" />
            <span className="text-xs text-muted-lavender">Minha Planilha</span>
          </div>
        </div>
        {/* Menu bar */}
        <div className="flex items-center bg-surface/90 border-b border-white/6">
          {['Arquivo', 'Editar', 'Ver', 'Inserir', 'Formatar', 'Dados', 'Ferramentas'].map((item) => (
            <div key={item} className="px-3 py-2 text-xs text-muted-lavender/70">
              {item}
            </div>
          ))}
          <div className="px-3 py-2 text-xs text-foreground font-semibold bg-lime/10 border-b-2 border-lime">
            Extensões
          </div>
          {['Ajuda'].map((item) => (
            <div key={item} className="px-3 py-2 text-xs text-muted-lavender/70">
              {item}
            </div>
          ))}
        </div>
        {/* Dropdown */}
        <div className="bg-surface/95 border-b border-white/6 px-4 py-1">
          <div className="w-48 rounded-md border border-white/10 bg-[#1A1A2E] shadow-xl overflow-hidden">
            <div className="px-3 py-2 text-xs text-muted-lavender/60 hover:bg-white/5">Complementos</div>
            <div className="px-3 py-2 text-xs text-foreground font-semibold bg-lime/10 border-l-2 border-lime flex items-center gap-2">
              <Code2 className="size-3.5 text-lime" />
              Apps Script
            </div>
            <div className="px-3 py-2 text-xs text-muted-lavender/60 hover:bg-white/5">Macros</div>
          </div>
        </div>
      </div>

      {/* Mock Apps Script Editor */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A2E] border-b border-white/6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] text-muted-lavender ml-2">script.google.com — Editor de Apps Script</span>
        </div>
        <div className="bg-[#0D0D14] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-1 text-[10px] bg-lime/10 text-lime rounded font-mono">
              Código.gs
            </div>
          </div>
          <div className="font-mono text-xs text-muted-lavender/50 space-y-1">
            <p>
              <span className="text-muted-lavender/30">1</span>{' '}
              <span className="text-coral/70">function</span>{' '}
              <span className="text-lime/60">myFunction</span>
              <span className="text-foreground/40">{'() {'}</span>
            </p>
            <p>
              <span className="text-muted-lavender/30">2</span>{' '}
              <span className="text-foreground/25">{'  '}</span>
              <span className="text-muted-lavender/40">{'// Seu código aqui...'}</span>
            </p>
            <p>
              <span className="text-muted-lavender/30">3</span>{' '}
              <span className="text-foreground/40">{'}'}</span>
            </p>
          </div>
        </div>
      </div>

      <CalloutError>
        <strong>Erro comum:</strong> Não encontrou? Certifique-se de estar com a planilha aberta, não no Google Drive.
      </CalloutError>
    </div>
  )
}

/* ─── Step 3: Colar o Código ─── */
function Step3Content() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_CODE)
      setCopied(true)
      toast.success('Código copiado!', {
        description: 'Agora cole no editor do Apps Script.',
      })
      setTimeout(() => setCopied(false), 3000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = APPS_SCRIPT_CODE
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      toast.success('Código copiado!', {
        description: 'Agora cole no editor do Apps Script.',
      })
      setTimeout(() => setCopied(false), 3000)
    }
  }, [])

  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        Apague todo o conteúdo existente no editor e cole o código abaixo. Ele contém as funções <code className="text-lime bg-lime/10 px-1.5 py-0.5 rounded text-xs font-mono">doGet</code> e <code className="text-lime bg-lime/10 px-1.5 py-0.5 rounded text-xs font-mono">doPost</code> que permitem ler e salvar dados.
      </p>

      {/* Code block */}
      <div className="code-block relative">
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
              Código.gs
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
                Copiar Código
              </>
            )}
          </Button>
        </div>

        <div className="p-4 sm:p-6 max-h-80 overflow-y-auto">
          <pre className="text-xs sm:text-sm leading-[1.8] font-mono text-foreground/90 whitespace-pre-wrap">
            <code>
              <span className="text-muted-lavender/50">{'// =============================================\n'}</span>
              <span className="text-muted-lavender/50">{'// Código para o Google Apps Script\n'}</span>
              <span className="text-muted-lavender/50">{'// Cole este código no editor do Apps Script\n'}</span>
              <span className="text-muted-lavender/50">{'// =============================================\n\n'}</span>

              <span className="text-muted-lavender/50">{'// doGet: responde a requisições GET (para LER dados)\n'}</span>
              <span className="text-coral/80">function</span>{' '}
              <span className="text-lime">doGet</span>
              <span className="text-foreground/70">(e)</span>
              <span className="text-foreground/50">{' {'}</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">var</span>{' '}
              <span className="text-foreground/80">sheet</span>
              <span className="text-foreground/50">{' = '}</span>
              <span className="text-foreground/70">SpreadsheetApp</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">getActiveSpreadsheet</span>
              <span className="text-foreground/50">().</span>
              <span className="text-lime/70">getActiveSheet</span>
              <span className="text-foreground/50">();</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">var</span>{' '}
              <span className="text-foreground/80">data</span>
              <span className="text-foreground/50">{' = '}</span>
              <span className="text-foreground/80">sheet</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">getDataRange</span>
              <span className="text-foreground/50">().</span>
              <span className="text-lime/70">getValues</span>
              <span className="text-foreground/50">();</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">return</span>{' '}
              <span className="text-foreground/70">ContentService</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">createTextOutput</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/70">JSON</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">stringify</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/80">data</span>
              <span className="text-foreground/50">))</span>
              {'\n'}
              {'    '}
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">setMimeType</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/70">ContentService</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">MimeType</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">JSON</span>
              <span className="text-foreground/50">);</span>
              {'\n'}
              <span className="text-foreground/50">{'}'}</span>
              {'\n\n'}

              <span className="text-muted-lavender/50">{'// doPost: responde a requisições POST (para SALVAR dados)\n'}</span>
              <span className="text-coral/80">function</span>{' '}
              <span className="text-lime">doPost</span>
              <span className="text-foreground/70">(e)</span>
              <span className="text-foreground/50">{' {'}</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">var</span>{' '}
              <span className="text-foreground/80">sheet</span>
              <span className="text-foreground/50">{' = '}</span>
              <span className="text-foreground/70">SpreadsheetApp</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">getActiveSpreadsheet</span>
              <span className="text-foreground/50">().</span>
              <span className="text-lime/70">getActiveSheet</span>
              <span className="text-foreground/50">();</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">var</span>{' '}
              <span className="text-foreground/80">dados</span>
              <span className="text-foreground/50">{' = '}</span>
              <span className="text-foreground/70">JSON</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">parse</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/80">e</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">postData</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">contents</span>
              <span className="text-foreground/50">);</span>
              {'\n'}
              {'  '}
              <span className="text-foreground/80">sheet</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">appendRow</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/80">dados</span>
              <span className="text-foreground/50">);</span>
              {'\n'}
              {'  '}
              <span className="text-coral/60">return</span>{' '}
              <span className="text-foreground/70">ContentService</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">createTextOutput</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/70">JSON</span>
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">stringify</span>
              <span className="text-foreground/50">({'{'}</span>
              <span className="text-foreground/80">status</span>
              <span className="text-foreground/50">: </span>
              <span className="text-lime/80">'sucesso'</span>
              <span className="text-foreground/50">{'}'}</span>
              <span className="text-foreground/50">))</span>
              {'\n'}
              {'    '}
              <span className="text-foreground/50">.</span>
              <span className="text-lime/70">setMimeType</span>
              <span className="text-foreground/50">(</span>
              <span className="text-foreground/70">ContentService</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">MimeType</span>
              <span className="text-foreground/50">.</span>
              <span className="text-foreground/80">JSON</span>
              <span className="text-foreground/50">);</span>
              {'\n'}
              <span className="text-foreground/50">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Copy button below code */}
      <div className="flex justify-center">
        <Button
          onClick={handleCopy}
          size="lg"
          className={`font-semibold text-base px-8 h-12 rounded-lg transition-all cursor-pointer ${
            copied
              ? 'bg-lime text-navy glow-lime'
              : 'bg-lime text-navy hover:bg-lime-dark glow-lime'
          }`}
        >
          {copied ? (
            <>
              <Check className="size-5 mr-2" />
              Código Copiado!
            </>
          ) : (
            <>
              <Copy className="size-5 mr-2" />
              Copiar Código
            </>
          )}
        </Button>
      </div>

      <CalloutWarning>
        <strong>Cuidado:</strong> Não altere os nomes <code className="text-lime bg-lime/10 px-1 py-0.5 rounded text-xs font-mono">doGet</code> e <code className="text-lime bg-lime/10 px-1 py-0.5 rounded text-xs font-mono">doPost</code>! Eles são reconhecidos automaticamente pelo Google.
      </CalloutWarning>
    </div>
  )
}

/* ─── Step 4: Implantar como App da Web ─── */
function Step4Content() {
  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        No editor do Apps Script, clique em <strong className="text-foreground">Implantação</strong> → <strong className="text-foreground">Nova implantação</strong>. Configure as opções como mostrado abaixo.
      </p>

      {/* Mock Deploy Dialog */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        <div className="bg-[#1A1A2E] px-4 py-3 border-b border-white/6 flex items-center justify-between">
          <span className="text-sm text-foreground font-semibold">Nova implantação</span>
          <XCircle className="size-4 text-muted-lavender/40" />
        </div>
        <div className="bg-surface/95 p-5 space-y-4">
          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-lavender font-medium">Tipo</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0D0D14] rounded-md border border-white/8">
              <Globe className="size-4 text-lime" />
              <span className="text-sm text-foreground">App da Web</span>
            </div>
          </div>
          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-lavender font-medium">Descrição</label>
            <div className="px-3 py-2 bg-[#0D0D14] rounded-md border border-white/8">
              <span className="text-sm text-muted-lavender/60">Primeira versão</span>
            </div>
          </div>
          {/* Executar como */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-lavender font-medium">Executar como</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0D0D14] rounded-md border border-lime/20">
              <Shield className="size-4 text-lime/70" />
              <span className="text-sm text-foreground font-medium">Eu (seu-email@gmail.com)</span>
              <CheckCircle2 className="size-4 text-lime ml-auto" />
            </div>
          </div>
          {/* Acesso */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-lavender font-medium">Quem tem acesso</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0D0D14] rounded-md border border-lime/20">
              <Globe className="size-4 text-lime/70" />
              <span className="text-sm text-foreground font-medium">Qualquer pessoa</span>
              <CheckCircle2 className="size-4 text-lime ml-auto" />
            </div>
          </div>
          {/* Deploy button mock */}
          <div className="pt-2">
            <div className="px-4 py-2.5 bg-lime text-navy text-sm font-bold rounded-md text-center cursor-default">
              Implantar
            </div>
          </div>
        </div>
      </div>

      <CalloutError>
        <strong>Erro comum:</strong> Esqueceu de reimplantar após editar o código? A URL antiga continua servindo o código velho! Sempre crie uma <strong>NOVA implantação</strong> após mudanças.
      </CalloutError>
    </div>
  )
}

/* ─── Step 5: Configurar Permissões ─── */
function Step5Content() {
  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        Na primeira vez que você implantar, o Google pedirá autorização. Isso é normal e seguro — é você mesmo autorizando o acesso à sua própria planilha.
      </p>

      {/* Mock permission screens */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Screen 1: Authorization required */}
        <div className="rounded-lg overflow-hidden border border-white/8">
          <div className="bg-[#1A1A2E] px-4 py-3 border-b border-white/6 flex items-center gap-2">
            <Shield className="size-4 text-yellow-400" />
            <span className="text-xs text-muted-lavender">Autorização necessária</span>
          </div>
          <div className="bg-surface/95 p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="size-6 text-yellow-400" />
            </div>
            <p className="text-sm text-foreground font-medium">Este app requer autorização</p>
            <p className="text-xs text-muted-lavender leading-relaxed">
              Para continuar, o app precisa de permissão para acessar seus dados no Google Sheets.
            </p>
            <div className="px-3 py-2 bg-lime/10 border border-lime/20 rounded-md text-xs text-lime font-medium">
              Continuar
            </div>
          </div>
        </div>

        {/* Screen 2: Unverified app warning */}
        <div className="rounded-lg overflow-hidden border border-white/8">
          <div className="bg-[#1A1A2E] px-4 py-3 border-b border-white/6 flex items-center gap-2">
            <AlertTriangle className="size-4 text-coral" />
            <span className="text-xs text-muted-lavender">App não verificado</span>
          </div>
          <div className="bg-surface/95 p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mx-auto">
              <Shield className="size-6 text-coral" />
            </div>
            <p className="text-sm text-foreground font-medium">Google ainda não verificou este app</p>
            <p className="text-xs text-muted-lavender leading-relaxed">
              Como é você mesmo quem criou, pode clicar em <strong className="text-foreground">Avançado</strong> → <strong className="text-foreground">Acessar</strong>.
            </p>
            <div className="space-y-2">
              <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-xs text-muted-lavender">
                Avançado ▾
              </div>
              <div className="px-3 py-2 bg-lime/10 border border-lime/20 rounded-md text-xs text-lime font-medium">
                Acessar App (não seguro)
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalloutTip>
        <strong>É normal</strong> o Google mostrar um aviso de &quot;app não verificado&quot;. Como é você mesmo quem criou, pode clicar em <strong>Avançado</strong> → <strong>Acessar</strong>.
      </CalloutTip>
    </div>
  )
}

/* ─── Step 6: Colar a URL na Ferramenta ─── */
function Step6Content() {
  return (
    <div className="space-y-5">
      <p className="text-muted-lavender text-sm leading-relaxed">
        Após implantar, o Google gera uma URL. Copie essa URL e cole na configuração da sua ferramenta HTML.
      </p>

      {/* Generated URL mockup */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        <div className="bg-[#1A1A2E] px-4 py-3 border-b border-white/6 flex items-center gap-2">
          <CheckCircle2 className="size-4 text-lime" />
          <span className="text-xs text-muted-lavender">Implantação concluída!</span>
        </div>
        <div className="bg-surface/95 p-4 space-y-3">
          <label className="text-xs text-muted-lavender font-medium">URL do App da Web</label>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0D0D14] rounded-md border border-lime/20">
            <Link2 className="size-4 text-lime/70 shrink-0" />
            <span className="text-xs text-lime font-mono truncate">
              https://script.google.com/macros/s/AKfycb.../exec
            </span>
            <Copy className="size-3.5 text-muted-lavender shrink-0 ml-auto cursor-pointer hover:text-lime transition-colors" />
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="flex justify-center py-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronRight className="size-6 text-lime/40 rotate-90" />
        </motion.div>
      </div>

      {/* Tool configuration mockup */}
      <div className="rounded-lg overflow-hidden border border-white/8">
        <div className="bg-[#1A1A2E] px-4 py-3 border-b border-white/6 flex items-center gap-2">
          <Code2 className="size-4 text-lime" />
          <span className="text-xs text-muted-lavender">Sua Ferramenta HTML — Configuração</span>
        </div>
        <div className="bg-surface/95 p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-lavender font-medium">URL da Planilha (Google Apps Script)</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0D0D14] rounded-md border border-lime/20">
              <span className="text-xs text-lime font-mono truncate">
                https://script.google.com/macros/s/AKfycb.../exec
              </span>
              <CheckCircle2 className="size-4 text-lime shrink-0 ml-auto" />
            </div>
          </div>

          {/* Success state */}
          <motion.div
            className="flex items-center gap-3 p-4 rounded-lg bg-lime/5 border border-lime/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
            >
              <CheckCircle2 className="size-6 text-lime" />
            </motion.div>
            <div>
              <p className="text-sm text-foreground font-semibold">Conexão estabelecida!</p>
              <p className="text-xs text-muted-lavender">Sua ferramenta já pode ler e salvar dados na planilha.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <CalloutTip>
        <strong>Pronto!</strong> Sua ferramenta já consegue ler e salvar dados na planilha. Teste enviando um registro.
      </CalloutTip>
    </div>
  )
}

/* ─── Step content renderer ─── */
function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1: return <Step1Content />
    case 2: return <Step2Content />
    case 3: return <Step3Content />
    case 4: return <Step4Content />
    case 5: return <Step5Content />
    case 6: return <Step6Content />
    default: return null
  }
}

/* ─── Main Component ─── */
export default function ConectarSheets() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = STEPS.length

  const goToStep = (step: number) => {
    if (step < 1 || step > totalSteps) return
    // Can only go to completed steps or the next available step
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <section
      id="conectar"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-lime/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Plug className="size-3.5" />
            Conexão Essencial
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Conectando ao{' '}
            <span className="text-lime text-glow-lime">Google Sheets</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            O passo a passo para sua ferramenta salvar dados na planilha automaticamente
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Step indicators row */}
          <div className="flex items-center justify-center mb-3">
            {STEPS.map((step, index) => {
              const isCompleted = step.number < currentStep
              const isCurrent = step.number === currentStep
              const isLocked = step.number > currentStep

              return (
                <div key={step.number} className="flex items-center">
                  {/* Step circle */}
                  <button
                    onClick={() => goToStep(step.number)}
                    disabled={isLocked}
                    className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isLocked
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    aria-label={`Ir para passo ${step.number}: ${step.title}`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-lime text-navy border-2 border-lime'
                          : isCurrent
                          ? 'bg-lime/15 text-lime border-2 border-lime'
                          : 'bg-surface text-muted-lavender/40 border-2 border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-4" />
                      ) : isLocked ? (
                        <Lock className="size-3.5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-lime/40"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </button>

                  {/* Connector line */}
                  {index < STEPS.length - 1 && (
                    <div className="w-4 sm:w-8 h-0.5 mx-0.5 sm:mx-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          step.number < currentStep
                            ? 'bg-lime'
                            : 'bg-white/10'
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress text */}
          <div className="text-center">
            <span className="text-xs text-muted-lavender font-medium">
              Passo {currentStep} de {totalSteps}
            </span>
          </div>
        </motion.div>

        {/* Step card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-surface/80 border-white/6 overflow-hidden">
            <CardContent className="p-0">
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-white/6 bg-white/[0.02]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime/10 text-lime font-bold text-sm">
                  {currentStep}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {STEPS[currentStep - 1].title}
                  </h3>
                </div>
              </div>

              {/* Card body with animated transition */}
              <div className="p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <StepContent step={currentStep} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-t border-white/6 bg-white/[0.01]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goPrev}
                  disabled={currentStep === 1}
                  className="gap-1.5 text-muted-lavender hover:text-foreground cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="size-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1.5">
                  {STEPS.map((step) => (
                    <div
                      key={step.number}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        step.number === currentStep
                          ? 'bg-lime w-6'
                          : step.number < currentStep
                          ? 'bg-lime/40'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goNext}
                  disabled={currentStep === totalSteps}
                  className={`gap-1.5 cursor-pointer disabled:cursor-not-allowed ${
                    currentStep < totalSteps
                      ? 'text-lime hover:text-lime hover:bg-lime/10'
                      : 'text-muted-lavender'
                  }`}
                >
                  Próximo
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Helper text */}
        <motion.p
          className="text-center text-xs text-muted-lavender mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Siga cada passo na ordem. Clique nos passos concluídos para revisar.
          <ExternalLink className="inline size-3 ml-1" />
        </motion.p>
      </div>
    </section>
  )
}
