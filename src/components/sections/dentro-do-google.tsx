'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  Server,
  Globe,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Zap,
  Code2,
  FileCode2,
  Layout,
  LayoutTemplate,
  FileSpreadsheet,
  Users,
  Cpu,
  Clock,
  Gauge,
  Monitor,
  Info,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Copy Button Component ─── */
function CopyButton({ text, label = 'Copiar código' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Código copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5 text-xs text-muted-lavender hover:text-lime cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="size-3" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="size-3" />
          {label}
        </>
      )}
    </Button>
  )
}

/* ─── Code Block with Copy ─── */
function CodeBlock({ code, filename }: { code: string; filename: string }) {
  return (
    <div className="rounded-lg bg-navy border border-white/[0.08] overflow-hidden hover:border-lime/20 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <FileCode2 className="size-3.5 text-lime" />
          <span className="text-xs font-semibold text-lime font-mono">{filename}</span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-xs text-foreground/85 overflow-x-auto leading-[1.7] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/* ─── Code strings ─── */
const CODE_GS = `// Code.gs — O "cérebro" do app no servidor Google
// Este código roda no lado do servidor (Google), não no navegador do usuário.

// doGet() é a função que o Google chama quando alguém acessa a URL do app.
// Ela carrega a página HTML (Index.html) e a envia para o navegador.
function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')  // Carrega o arquivo Index.html
    .evaluate()                        // Processa os scriptlets (código embutido)
    .setTitle('Minha Ferramenta UEMS') // Título que aparece na aba do navegador
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) // Permite embutir no Google Sites
}

// listarRegistros() lê dados da planilha e retorna para o navegador
function listarRegistros() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var dados = sheet.getDataRange().getValues()
  return dados  // O google.script.run recebe isso automaticamente
}

// salvarRegistro(dados) recebe dados do formulário e salva na planilha
function salvarRegistro(dados) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  sheet.appendRow(dados)  // Adiciona uma nova linha com os dados
  return { status: 'sucesso' }
}

// include() permite separar CSS e JS em arquivos próprios
// Usado nos scriptlets: <?!= include('CSS') ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}`

const CODE_INDEX_HTML = `<!-- Index.html — A "face" da ferramenta -->
<!-- Este arquivo vive DENTRO do projeto Apps Script, junto com o Code.gs -->

<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <!-- Carrega o CSS separado via scriptlet -->
    <?!= include('CSS') ?>
  </head>
  <body>
    <div class="container">
      <h1>Minha Ferramenta UEMS</h1>

      <!-- Formulário de cadastro -->
      <form id="formCadastro" onsubmit="enviarDados(event)">
        <label>Nome:</label>
        <input type="text" id="campoNome" required>

        <label>E-mail:</label>
        <input type="email" id="campoEmail" required>

        <button type="submit">Cadastrar</button>
      </form>

      <!-- Área onde os registros aparecem -->
      <div id="listaRegistros">Carregando...</div>
    </div>

    <!-- Carrega o JavaScript separado via scriptlet -->
    <?!= include('JavaScript') ?>
  </body>
</html>`

const CODE_CSS_HTML = `<!-- CSS.html — Estilos visuais separados -->
<!-- Vive dentro do projeto Apps Script -->

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f5f5f5;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  h1 {
    color: #1a73e8;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-top: 12px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    margin-top: 16px;
    padding: 10px 24px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  button:hover { background: #1557b0; }
  .registro {
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
</style>`

const CODE_JS_HTML = `<!-- JavaScript.html — Lógica do lado do cliente -->
<!-- Vive dentro do projeto Apps Script -->

<script>
  // Carregar registros quando a página abre
  window.onload = function() {
    google.script.run
      .withSuccessHandler(mostrarRegistros)
      .withFailureHandler(mostrarErro)
      .listarRegistros()
  }

  // Enviar dados do formulário
  function enviarDados(event) {
    event.preventDefault()
    var dados = [
      document.getElementById('campoNome').value,
      document.getElementById('campoEmail').value
    ]

    google.script.run
      .withSuccessHandler(function() {
        alert('Cadastrado com sucesso!')
        document.getElementById('formCadastro').reset()
        // Recarrega a lista
        google.script.run
          .withSuccessHandler(mostrarRegistros)
          .listarRegistros()
      })
      .withFailureHandler(mostrarErro)
      .salvarRegistro(dados)
  }

  // Mostrar registros na tela
  function mostrarRegistros(dados) {
    var div = document.getElementById('listaRegistros')
    if (!dados || dados.length === 0) {
      div.innerHTML = '<p>Nenhum registro encontrado.</p>'
      return
    }
    var html = ''
    // Pula o cabeçalho (linha 0)
    for (var i = 1; i < dados.length; i++) {
      html += '<div class="registro">'
      html += '<strong>' + dados[i][0] + '</strong> — ' + dados[i][1]
      html += '</div>'
    }
    div.innerHTML = html
  }

  // Mostrar erro
  function mostrarErro(erro) {
    document.getElementById('listaRegistros').innerHTML =
      '<p style="color:red">Erro: ' + erro.message + '</p>'
  }
</script>`

const CODE_BRIDGE_EXAMPLE = `// A ponte mágica entre o navegador e o servidor Google
// O navegador NÃO acessa a planilha diretamente — ele pede ao servidor Apps Script.
google.script.run
  .withSuccessHandler(mostrarNaTela)  // "Quando der certo, chame mostrarNaTela"
  .withFailureHandler(mostrarErro)     // "Se der erro, chame mostrarErro"
  .listarRegistros()                   // "Execute a função listarRegistros no servidor"`

const PROMPT_FERRAMENTA_100_GOOGLE = `Crie um app completo que vive DENTRO do ambiente Google, usando HTML Service do Apps Script.

CONTEXTO: Sou servidor público e preciso de uma ferramenta que NÃO saia do ambiente Google institucional. Tudo deve rodar dentro do Apps Script — HTML, CSS, JavaScript e o código do servidor — sem hospedagem externa.

REGRAS OBRIGATÓRIAS:
1. Use HtmlService.createTemplateFromFile() no doGet() com .evaluate()
2. Separe os arquivos: Code.gs, Index.html, CSS.html, JavaScript.html
3. Use a função include() com scriptlets <?!= include('CSS') ?> e <?!= include('JavaScript') ?>
4. TODA comunicação entre navegador e servidor deve ser via google.script.run
5. É PROIBIDO usar fetch() para URLs externas — nenhum dado pode sair do Google
6. Use dados FICTÍCIOS nos exemplos (nomes: "João Exemplo", CPFs: "000.000.000-00")
7. Converta datas para texto no servidor ANTES de retornar (Date objects quebram a serialização do google.script.run)
8. Todos os comentários do código em PORTUGUÊS
9. Inclua instruções de deploy com acesso restrito ao domínio institucional

O QUE PRECISA TER:
- Code.gs com: doGet(), include(), e pelo menos 2 funções de servidor (listar e salvar)
- Index.html com: estrutura HTML usando scriptlets para incluir CSS e JS
- CSS.html com: estilos visuais organizados
- JavaScript.html com: lógica do cliente usando google.script.run com successHandler e failureHandler

INSTRUÇÕES DE DEPLOY (inclua no final como comentário):
1. No Apps Script: Implantar → Nova implantação → tipo "App da Web"
2. "Executar como": Eu (sua conta)
3. "Quem pode acessar": Qualquer pessoa na [sua organização] — NÃO usar "Qualquer pessoa"
4. Autorizar as permissões quando o Google pedir
5. Copiar a URL /exec e compartilhar com a equipe
6. Para atualizar: Gerenciar implantações → editar → versão: Nova

FORMATAÇÃO: Um bloco de código para cada arquivo, com o nome do arquivo como comentário no topo.`

/* ─── Accordion Item Component ─── */
function AccordionItem({
  title,
  icon: Icon,
  accentColor,
  children,
  index,
}: {
  title: string
  icon: React.ElementType
  accentColor: 'lime' | 'coral'
  children: React.ReactNode
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Card className="bg-surface border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
        <CardContent className="p-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="w-full flex items-center gap-4 p-5 text-left cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-lg ${
                accentColor === 'lime'
                  ? 'bg-lime/10 border border-lime/20'
                  : 'bg-coral/10 border border-coral/20'
              } flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
            >
              <Icon
                className={`size-5 ${accentColor === 'lime' ? 'text-lime' : 'text-coral'}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold transition-colors ${
                  isOpen
                    ? accentColor === 'lime'
                      ? 'text-lime'
                      : 'text-coral'
                    : 'text-foreground'
                }`}
              >
                {title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronDown className="size-5 text-muted-lavender" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 ml-14">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ─── Stepper Component ─── */
const DEPLOY_STEPS = [
  {
    number: 1,
    title: 'Implantar → Nova implantação → tipo "App da Web"',
    description:
      'No editor do Apps Script, clique no botão "Implantar" (canto superior direito) e depois em "Nova implantação". No campo de tipo, selecione "App da Web". É aqui que você diz ao Google: "transforme meu código em uma página web acessível".',
    callout: null,
  },
  {
    number: 2,
    title: '"Executar como": Eu vs. Usuário que acessa',
    description:
      '"Executar como: Eu" significa que o código roda com SUAS permissões — ele acessa as planilhas que VOCÊ tem acesso. "Executar como: Usuário que acessa" significa que cada pessoa que abre a ferramenta roda o código com as permissões DELA — só enxerga o que ela teria acesso. Para a maioria dos casos na UEMS, use "Eu" — assim a ferramenta funciona igual para todos.',
    callout:
      'Se escolher "Usuário que acessa", cada colega terá que autorizar o script na primeira vez que abrir — pode assustar quem não entende de tecnologia.',
  },
  {
    number: 3,
    title: '"Quem pode acessar": a escolha que mata o medo',
    description:
      'Selecione "Qualquer pessoa na [sua organização]" — no caso da UEMS, isso significa que SÓ quem tem conta @uems.br consegue abrir a ferramenta. Quem não tem conta da UEMS recebe uma tela de "Acesso negado" do Google. É como trancar a porta e dar a chave só para quem tem o crachá.',
    callout:
      'NUNCA selecione "Qualquer pessoa" para dados institucionais! Isso permite que qualquer pessoa no mundo acesse, sem login. "Qualquer pessoa na [sua organização]" é a opção segura.',
  },
  {
    number: 4,
    title: 'Autorizar permissões (a tela que assusta — mas é normal)',
    description:
      'Na primeira vez, o Google mostra uma tela de aviso: "Este app não foi verificado". Isso é NORMAL — é o Google protegendo você. Clique em "Avançado" e depois em "Acessar [nome do app] (não seguro)". O Google está avisando que o app não passou por uma verificação oficial do Google — mas É VOCÊ quem criou, e você confia em si mesmo, certo?',
    callout:
      'Essa tela de aviso aparece porque o app não é publicado na Google Workspace Marketplace — é um app interno. Não é erro, é o procedimento padrão do Google para apps dentro de organizações.',
  },
  {
    number: 5,
    title: 'Copiar a URL /exec e compartilhar',
    description:
      'Após implantar, o Google gera uma URL que termina em /exec. Essa é a URL da sua ferramenta! Copie e envie por e-mail para os colegas. Quem tem @uems.br abre normalmente; quem não tem, recebe "Acesso negado". Pronto — sua ferramenta está no ar, dentro do Google, protegida pelo login institucional.',
    callout: null,
  },
  {
    number: 6,
    title: 'Editou o código e "não mudou nada"? Calma!',
    description:
      'A URL /exec sempre serve a ÚLTIMA VERSÃO IMPLANTADA, não o rascunho atual. Para que as mudanças apareçam, você precisa criar uma NOVA VERSÃO na implantação: vá em "Implantar" → "Gerenciar implantações" → clique no lápis (editar) → em "Versão", selecione "Nova versão" → clique em "Implantar". Agora sim, a URL /exec mostra o código atualizado.',
    callout:
      'Para testar o rascunho (sem implantar), use a URL /dev que aparece no editor. Mas atenção: a URL /dev só funciona para VOCÊ, não para os colegas. Para compartilhar, sempre use /exec com nova versão.',
  },
]

function DeployStepper() {
  const [currentStep, setCurrentStep] = useState(1)

  const step = DEPLOY_STEPS[currentStep - 1]

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
        {DEPLOY_STEPS.map((s) => (
          <button
            key={s.number}
            onClick={() => setCurrentStep(s.number)}
            aria-label={`Passo ${s.number}: ${s.title}`}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-bold transition-all cursor-pointer ${
              s.number === currentStep
                ? 'bg-lime text-navy scale-110'
                : s.number < currentStep
                ? 'bg-lime/30 text-lime'
                : 'bg-white/10 text-muted-lavender'
            }`}
          >
            {s.number}
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="bg-surface/80 border-white/6">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime/10 text-lime font-bold text-sm shrink-0">
                  {step.number}
                </div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                  {step.title}
                </h4>
              </div>
              <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                {step.description}
              </p>
              {step.callout && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-coral/5 border border-coral/20">
                  <AlertTriangle className="size-4 text-coral shrink-0 mt-0.5" />
                  <p className="text-xs text-coral/90 leading-relaxed">
                    {step.callout}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
          <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          aria-label="Passo anterior"
          className="gap-1.5 text-muted-lavender hover:text-foreground cursor-pointer disabled:cursor-not-allowed"
        >
          ← Anterior
        </Button>
        <span className="text-xs text-muted-lavender">
          Passo {currentStep} de {DEPLOY_STEPS.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep(Math.min(DEPLOY_STEPS.length, currentStep + 1))}
          disabled={currentStep === DEPLOY_STEPS.length}
          aria-label="Próximo passo"
          className="gap-1.5 text-lime hover:text-lime hover:bg-lime/10 cursor-pointer disabled:cursor-not-allowed"
        >
          Próximo →
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export default function DentroDoGoogle() {
  return (
    <section id="dentro-do-google" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ─── Badge & Title ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-lime/10 text-lime border-lime/20 mb-4" variant="outline">
            <Shield className="size-3.5 mr-1.5" />
            Segurança Máxima
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            100% dentro do <span className="text-lime">Google</span>
          </h2>
          <p className="mt-3 text-muted-lavender max-w-2xl mx-auto">
            O maior medo do servidor público: &quot;e se os dados vazarem?&quot;. Aqui está a resposta —
            construa a ferramenta DENTRO do próprio Google, sem hospedagem externa, sem servidor terceiro.
            Os dados nunca saem de onde sempre estiveram.
          </p>
        </motion.div>

        {/* ═══ PART A: Security Argument — 3 Visual Cards ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Servido PELO PRÓPRIO GOOGLE */}
            <Card className="bg-surface border-white/[0.06] hover:border-lime/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-4">
                  <Server className="size-6 text-lime" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Servido <span className="text-lime">PELO PRÓPRIO GOOGLE</span>
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  A ferramenta é servida pelo Google, no mesmo ambiente da planilha.
                  Nenhum servidor de terceiro, nenhum site externo. É como se a ferramenta
                  morasse dentro do Google Drive — porque mora mesmo.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Acesso controlado pelo login Google */}
            <Card className="bg-surface border-white/[0.06] hover:border-lime/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mb-4">
                  <Lock className="size-6 text-lime" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Acesso controlado pelo <span className="text-lime">login Google</span>
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  Ao implantar, você escolhe &quot;Qualquer pessoa na UEMS&quot; — só quem tem
                  conta @uems.br consegue abrir. Quem não tem recebe uma tela de
                  &quot;Acesso negado&quot; do próprio Google.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: A IA NUNCA vê os dados reais */}
            <Card className="bg-surface border-white/[0.06] hover:border-lime/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center mb-4">
                  <Eye className="size-6 text-coral" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  A IA <span className="text-coral">NUNCA</span> vê os dados reais
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  A IA só escreve código (com dados fictícios de exemplo). Você cola o
                  código no Apps Script e os dados reais ficam onde sempre estiveram —
                  na planilha institucional. A IA nunca toca nos dados de verdade.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* ═══ Flow Diagram ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16"
        >
          <Card className="bg-surface border-white/[0.06]">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-muted-lavender mb-5 text-center uppercase tracking-wider">
                Fluxo de dados — nada sai do Google
              </h3>
              {/* Desktop: horizontal */}
              <div className="hidden sm:flex items-center justify-center gap-2">
                {/* Box 1: Você + IA */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-lime/10 border border-lime/20 min-w-[130px] transition-transform duration-200 hover:scale-105 cursor-default">
                  <Users className="size-5 text-lime mb-1.5" />
                  <span className="text-xs font-bold text-lime text-center">Você + IA</span>
                  <span className="text-[10px] text-muted-lavender text-center mt-1">só código</span>
                </div>
                <ArrowRight className="size-4 text-muted-lavender shrink-0" />
                {/* Box 2: Apps Script */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 min-w-[130px] transition-transform duration-200 hover:scale-105 cursor-default">
                  <Code2 className="size-5 text-indigo-400 mb-1.5" />
                  <span className="text-xs font-bold text-indigo-400 text-center">Apps Script</span>
                  <span className="text-[10px] text-muted-lavender text-center mt-1">roda no Google</span>
                </div>
                {/* Bidirectional arrow — larger and lime */}
                <span className="text-2xl text-lime shrink-0 leading-none font-bold" aria-label="Dados fluem nos dois sentidos">↔</span>
                {/* Box 3: Planilha */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-coral/10 border border-coral/20 min-w-[130px] transition-transform duration-200 hover:scale-105 cursor-default">
                  <FileSpreadsheet className="size-5 text-coral mb-1.5" />
                  <span className="text-xs font-bold text-coral text-center">Planilha</span>
                  <span className="text-[10px] text-muted-lavender text-center mt-1">dados ficam</span>
                </div>
                <ArrowRight className="size-4 text-muted-lavender shrink-0" />
                {/* Box 4: Colega */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-lime/15 border border-lime/30 min-w-[130px] transition-transform duration-200 hover:scale-105 cursor-default">
                  <Users className="size-5 text-lime mb-1.5" />
                  <span className="text-xs font-bold text-lime text-center">Colega</span>
                  <span className="text-[10px] text-muted-lavender text-center mt-1">login @uems.br</span>
                </div>
              </div>
              {/* Mobile: vertical */}
              <div className="flex sm:hidden flex-col items-center gap-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-lime/10 border border-lime/20 flex-1 transition-transform duration-200 active:scale-105">
                    <Users className="size-4 text-lime mb-1" />
                    <span className="text-[11px] font-bold text-lime text-center">Você + IA: só código</span>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-lavender shrink-0 rotate-90" />
                <div className="flex items-center gap-2 w-full">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex-1 transition-transform duration-200 active:scale-105">
                    <Code2 className="size-4 text-indigo-400 mb-1" />
                    <span className="text-[11px] font-bold text-indigo-400 text-center">Apps Script: roda no Google</span>
                  </div>
                </div>
                {/* Bidirectional arrow — larger and lime */}
                <span className="text-2xl text-lime shrink-0 leading-none font-bold" aria-label="Dados fluem nos dois sentidos">↔</span>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-coral/10 border border-coral/20 flex-1 transition-transform duration-200 active:scale-105">
                    <FileSpreadsheet className="size-4 text-coral mb-1" />
                    <span className="text-[11px] font-bold text-coral text-center">Planilha: dados ficam</span>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-lavender shrink-0 rotate-90" />
                <div className="flex items-center gap-2 w-full">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-lime/15 border border-lime/30 flex-1 transition-transform duration-200 active:scale-105">
                    <Users className="size-4 text-lime mb-1" />
                    <span className="text-[11px] font-bold text-lime text-center">Colega: login @uems.br</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══ PART B: Honest Comparison — Two Ways to Build ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <LayoutTemplate className="size-5 text-lime" />
            Dois modos de construir
          </h3>
          <p className="text-sm text-muted-lavender mb-6">
            Existem duas formas de conectar a interface à planilha. Conheça as duas e escolha com conhecimento.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* MODO 1: HTML Externo */}
            <Card className="bg-surface border-white/[0.06] h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-muted-lavender/10 text-muted-lavender border-muted-lavender/20" variant="outline">
                    MODO 1
                  </Badge>
                  <span className="text-sm font-semibold text-foreground">HTML externo + Apps Script como ponte</span>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  Um arquivo .html hospedado fora do Google (GitHub Pages, Moodle, etc.) que
                  chama o script URL do Apps Script para ler e gravar dados.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">Mais liberdade visual — HTML/CSS sem restrições</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">Fácil de testar localmente no navegador</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="size-4 text-coral shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">Precisa de hospedagem externa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="size-4 text-coral shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">A URL do script fica exposta no código-fonte</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MODO 2: Tudo dentro do Google (RECOMMENDED) */}
            <Card className="bg-lime/5 border-lime/20 h-full relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Badge className="bg-lime/20 text-lime border-lime/30 text-[10px]" variant="outline">
                  Recomendado
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-lime/10 text-lime border-lime/20" variant="outline">
                    MODO 2
                  </Badge>
                  <span className="text-sm font-semibold text-foreground">Tudo dentro do Google (HTML Service)</span>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  HTML, CSS e JS vivem DENTRO do projeto Apps Script, junto com o código
                  do servidor. Tudo num único lugar, servido pelo Google.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender"><strong className="text-foreground">Zero hospedagem</strong> — tudo no Google</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender"><strong className="text-foreground">Acesso restrito ao domínio</strong> — só @uems.br</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender"><strong className="text-foreground">Dados nunca viajam para fora</strong> do Google</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender"><strong className="text-foreground">URL única</strong> google.com — confiança total</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="size-4 text-coral/60 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">Visual um pouco mais limitado (roda em sandbox)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="size-4 text-coral/60 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-lavender">Precisa reimplantar para atualizar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation callout */}
          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-lime/5 border border-lime/20">
            <Shield className="size-5 text-lime shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong className="text-lime">Para dados institucionais/sensíveis, MODO 2.</strong>{' '}
              É a opção que garante que nada sai do ambiente Google. O MODO 1 é ótimo para protótipos
              e ferramentas sem dados sensíveis, mas quando o assunto é segurança, o HTML Service
              é a resposta.
            </p>
          </div>
        </motion.div>

        {/* ═══ PART C: Anatomy of an HTML Service App ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Code2 className="size-5 text-lime" />
            Anatomia de um app HTML Service
          </h3>
          <p className="text-sm text-muted-lavender mb-6">
            Explicado para quem não é programador. Clique em cada parte para ver o código comentado em português.
          </p>

          <div className="space-y-3">
            {/* 1. Code.gs */}
            <AccordionItem
              title="Code.gs — O cérebro do app no servidor Google"
              icon={Cpu}
              accentColor="lime"
              index={0}
            >
              <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                O Code.gs é o código que roda <strong className="text-foreground">no servidor do Google</strong>,
                não no navegador. É ele quem acessa a planilha, lê dados, salva registros — tudo do lado do Google.
                O navegador nunca toca na planilha diretamente.
              </p>
              <CodeBlock code={CODE_GS} filename="Code.gs" />
            </AccordionItem>

            {/* 2. Index.html */}
            <AccordionItem
              title="Index.html — A cara da ferramenta"
              icon={Layout}
              accentColor="lime"
              index={1}
            >
              <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                O Index.html é o que o usuário vê — os campos, botões, tabelas. Mas aqui ele
                vive <strong className="text-foreground">dentro do projeto Apps Script</strong>,
                não num servidor externo. Note os scriptlets <code className="text-lime text-xs bg-lime/10 px-1.5 py-0.5 rounded">&lt;?!= include(&apos;CSS&apos;) ?&gt;</code> que
                injetam o CSS e JS separados.
              </p>
              <CodeBlock code={CODE_INDEX_HTML} filename="Index.html" />
            </AccordionItem>

            {/* 3. The Magic Bridge */}
            <AccordionItem
              title="A ponte mágica: google.script.run"
              icon={Zap}
              accentColor="coral"
              index={2}
            >
              <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                O <code className="text-coral text-xs bg-coral/10 px-1.5 py-0.5 rounded">google.script.run</code> é
                a ponte entre o navegador e o servidor. É <strong className="text-foreground">assíncrono</strong>:
                você faz o pedido e diz qual função chamar quando a resposta chegar — como deixar
                um recado e ser chamado de volta.
              </p>
              <CodeBlock code={CODE_BRIDGE_EXAMPLE} filename="google.script.run" />
              <div className="mt-3 p-3 rounded-lg bg-lime/5 border border-lime/20">
                <div className="flex items-start gap-2">
                  <Info className="size-4 text-lime shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-lavender leading-relaxed">
                    <strong className="text-foreground">Traduzindo:</strong> &quot;Google, execute a função
                    listarRegistros no servidor. Quando der certo, me chame de volta com os dados
                    (mostrarNaTela). Se der erro, me avise também (mostrarErro).&quot;
                  </p>
                </div>
              </div>
            </AccordionItem>

            {/* 4. Clean Organization */}
            <AccordionItem
              title="Organização limpa: CSS.html e JavaScript.html separados"
              icon={LayoutTemplate}
              accentColor="lime"
              index={3}
            >
              <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                Em vez de jogar tudo num arquivo só, separamos CSS e JS em arquivos próprios.
                Isso mantém o código organizado e fácil de manter. A função <code className="text-lime text-xs bg-lime/10 px-1.5 py-0.5 rounded">include()</code> do
                Code.gs e os scriptlets fazem a mágica de juntar tudo na hora de servir.
              </p>
              <CodeBlock code={CODE_CSS_HTML} filename="CSS.html" />
              <div className="mt-4">
                <CodeBlock code={CODE_JS_HTML} filename="JavaScript.html" />
              </div>
            </AccordionItem>

            {/* 5. Data Best Practices */}
            <AccordionItem
              title="Boas práticas de dados na ponte"
              icon={AlertTriangle}
              accentColor="coral"
              index={4}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Sempre retorne objetos simples / JSON
                  </h4>
                  <p className="text-sm text-muted-lavender leading-relaxed">
                    O <code className="text-coral text-xs bg-coral/10 px-1.5 py-0.5 rounded">google.script.run</code> só
                    consegue transferir dados que podem ser serializados em JSON. Objetos simples,
                    arrays, strings e números funcionam perfeitamente.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-coral/5 border border-coral/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-coral shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-coral mb-1">
                        CUIDADO com datas!
                      </h4>
                      <p className="text-xs text-muted-lavender leading-relaxed">
                        Objetos <code className="text-coral text-xs">Date</code> do JavaScript
                        <strong className="text-coral"> quebram</strong> a serialização do google.script.run.
                        Sempre converta datas para texto no servidor ANTES de retornar:
                      </p>
                      <div className="mt-2 p-2 rounded bg-navy border border-white/[0.06]">
                        <code className="text-xs text-lime font-mono">
                          var dataTexto = Utilities.formatDate(data, &apos;America/Sao_Paulo&apos;, &apos;dd/MM/yyyy&apos;)
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>
        </motion.div>

        {/* ═══ PART D: Secure Deployment Step by Step ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Globe className="size-5 text-lime" />
            Implantação segura — passo a passo
          </h3>
          <p className="text-sm text-muted-lavender mb-6">
            Os nomes de menu são exatamente como aparecem no Google (em português). Siga cada passo.
          </p>
          <DeployStepper />
        </motion.div>

        {/* ═══ PART E: Limitations with Honesty ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="size-5 text-coral" />
            Limitações — contadas com honestidade
          </h3>
          <p className="text-sm text-muted-lavender mb-6">
            Nada é perfeito. Conheça as limitações e por que elas <strong className="text-foreground">não são problema</strong> para
            o uso típico de uma divisão da UEMS.
          </p>
          <div className="space-y-3">
            <AccordionItem
              title="Cold start — primeiro acesso do dia demora alguns segundos"
              icon={Clock}
              accentColor="coral"
              index={0}
            >
              <p className="text-sm text-muted-lavender leading-relaxed">
                Se ninguém acessou a ferramenta nas últimas horas, o Google &quot;adormece&quot; o script.
                O primeiro acesso do dia pode levar de 3 a 8 segundos. Depois disso, fica rápido.
                <strong className="text-foreground"> Por que não importa:</strong> sua equipe acessa
                de manhã e a ferramenta fica rápida o resto do dia. É como ligar o computador —
                demora um pouquinho no início, depois voa.
              </p>
            </AccordionItem>

            <AccordionItem
              title="Cotas diárias do Apps Script"
              icon={Gauge}
              accentColor="coral"
              index={1}
            >
              <p className="text-sm text-muted-lavender leading-relaxed">
                O Google impõe limites: cerca de 20.000 chamadas de script por dia para contas
                gratuitas. <strong className="text-foreground">Por que não importa:</strong> uma
                divisão com 15 pessoas fazendo 50 operações cada = 750 chamadas/dia. Muito longe
                do limite. Se um dia você precisar de mais, contas institucionais do Google Workspace
                têm limites bem maiores.
              </p>
            </AccordionItem>

            <AccordionItem
              title="Visual dentro de sandbox/iframe"
              icon={Monitor}
              accentColor="coral"
              index={2}
            >
              <p className="text-sm text-muted-lavender leading-relaxed">
                O HTML Service roda dentro de um sandbox do Google (um iframe com restrições de
                segurança). Isso significa que alguns efeitos CSS avançados podem não funcionar
                e a página fica com a barra superior do Google.
                <strong className="text-foreground"> Por que não importa:</strong> para ferramentas
                administrativas (formulários, tabelas, dashboards), o visual limpo e funcional é
                mais que suficiente. Você não está fazendo um site de marketing — está resolvendo
                problemas.
              </p>
            </AccordionItem>

            <AccordionItem
              title="Não serve para milhares de acessos simultâneos"
              icon={Users}
              accentColor="lime"
              index={3}
            >
              <p className="text-sm text-muted-lavender leading-relaxed">
                O Apps Script não foi feito para suportar milhares de pessoas acessando ao mesmo
                tempo. Se 500 pessoas clicarem no botão no mesmo segundo, vai ficar lento.
                <strong className="text-foreground"> Por que não importa:</strong> a UEMS inteira
                tem uns poucos milhares de servidores. Sua divisão tem talvez 20. Na prática, o
                Apps Script atende perfeitamente uma equipe, uma divisão ou até uma unidade inteira.
                Se precisar de mais que isso, é hora de conversar com a TI para uma solução oficial.
              </p>
            </AccordionItem>
          </div>
        </motion.div>

        {/* ═══ PART F: Copyable Prompt ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Zap className="size-5 text-lime" />
            Prompt pronto: &quot;Ferramenta 100% Google&quot;
          </h3>
          <p className="text-sm text-muted-lavender mb-6">
            Copie este prompt, cole na IA e personalize com os dados do seu setor. A IA vai gerar
            os 4 arquivos (Code.gs, Index.html, CSS.html, JavaScript.html) prontos para colar no
            Apps Script.
          </p>

          <Card className="bg-lime/5 border-lime/20">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-lime/10 text-lime border-lime/20" variant="outline">
                    Nível 2
                  </Badge>
                  <span className="text-sm font-semibold text-foreground">
                    Ferramenta 100% Google
                  </span>
                </div>
                <CopyButton text={PROMPT_FERRAMENTA_100_GOOGLE} label="Copiar prompt" />
              </div>
              <pre className="p-4 rounded-lg bg-navy border border-white/[0.06] text-xs text-muted-lavender overflow-x-auto max-h-80 overflow-y-auto leading-relaxed font-mono whitespace-pre-wrap">
                {PROMPT_FERRAMENTA_100_GOOGLE}
              </pre>
              <div className="mt-4 p-3 rounded-lg bg-lime/5 border border-lime/10">
                <div className="flex items-start gap-2">
                  <Lightbulb className="size-4 text-lime shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-lavender leading-relaxed">
                    <strong className="text-foreground">Dica:</strong> Personalize o prompt antes
                    de enviar. Substitua os campos genéricos pelos dados reais do seu setor
                    (nome da ferramenta, campos do formulário, nome da aba da planilha, etc.).
                    Quanto mais específico, melhor o resultado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
