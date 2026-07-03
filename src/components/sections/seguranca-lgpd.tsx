'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  UserX,
  EyeOff,
  Scale,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Lock,
  FileSpreadsheet,
  Bot,
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Golden Rules Data ─── */
interface GoldenRule {
  id: string
  icon: React.ElementType
  title: string
  description: string
  example: string
  accentColor: 'coral' | 'lime'
}

const goldenRules: GoldenRule[] = [
  {
    id: 'dados-ficticios',
    icon: UserX,
    title: 'Nunca use dados reais para testes',
    description:
      'Crie dados fictícios para desenvolver e testar suas ferramentas. Use nomes como "João Silva" e CPFs como "123.456.789-00" — nunca dados reais de alunos, servidores ou terceiros.',
    example: '✅ Nome: Maria Exemplo, CPF: 000.000.000-00\n❌ Nome: [nome real], CPF: [CPF real]',
    accentColor: 'coral',
  },
  {
    id: 'anonimizar',
    icon: EyeOff,
    title: 'Anonimize antes de compartilhar',
    description:
      'Se precisar mostrar a planilha ou o código para a IA, substitua nomes e CPFs por dados fictícios. A IA não precisa saber quem é "João da Silva do Setor X" para resolver um problema de código.',
    example:
      'Antes: "A aluna Carla Mendes (CPF 987.654.321-00) está com matrícula pendente"\nDepois: "A aluna Nome1 (CPF 111.222.333-44) está com matrícula pendente"',
    accentColor: 'coral',
  },
  {
    id: 'responsabilidade',
    icon: Scale,
    title: 'A responsabilidade é sua',
    description:
      'Como servidor público, você responde pelos dados que manipula. A IA é uma ferramenta, mas a decisão de quais dados enviar e como tratá-los é sempre sua. Use com consciência.',
    example:
      'Você é o guardião dos dados. Se algo vazar por descuido ao usar a IA, a responsabilidade é do servidor que os expôs — não da IA.',
    accentColor: 'lime',
  },
]

/* ─── Checklist Data ─── */
interface ChecklistItem {
  id: string
  text: string
  detail: string
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'dados-fora-ia',
    text: 'Dados pessoais fora da IA?',
    detail:
      'Nunca envie dados pessoais reais (CPF, RG, nome completo, endereço) para IAs conversacionais. Use apenas dados fictícios.',
  },
  {
    id: 'planilha-restrita',
    text: 'Planilha restrita?',
    detail:
      'No Google Sheets, configure o compartilhamento como "Restrito — apenas pessoas adicionadas podem acessar". Nunca deixe como "Qualquer pessoa com o link".',
  },
  {
    id: 'apps-script-minimo',
    text: 'Apps Script com acesso mínimo?',
    detail:
      'Ao publicar o Apps Script, use "Executar como: eu" e permita acesso apenas à planilha necessária. Não conceda permissões além do necessário.',
  },
  {
    id: 'dados-teste',
    text: 'Dados de teste fictícios?',
    detail:
      'Ao desenvolver, preencha a planilha com dados fictícios. Só use dados reais quando a ferramenta estiver pronta e restrita ao ambiente institucional.',
  },
  {
    id: 'revisao-periodica',
    text: 'Revisão periódica?',
    detail:
      'Verifique periodicamente quem tem acesso à planilha e se as permissões do Apps Script continuam adequadas. Remova acessos que não são mais necessários.',
  },
]

/* ─── Checklist Item Component ─── */
function ChecklistRow({ item, index }: { item: ChecklistItem; index: number }) {
  const [checked, setChecked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-card-bg/50 transition-colors group"
    >
      <button
        onClick={() => setChecked(!checked)}
        className="mt-0.5 shrink-0 cursor-pointer"
      >
        {checked ? (
          <CheckCircle2 className="size-5 text-lime" />
        ) : (
          <Circle className="size-5 text-muted-lavender/40 group-hover:text-muted-lavender transition-colors" />
        )}
      </button>
      <div>
        <p
          className={`text-sm font-medium transition-colors ${
            checked ? 'text-lime line-through decoration-lime/30' : 'text-foreground'
          }`}
        >
          {item.text}
        </p>
        <p className="text-xs text-muted-lavender mt-1 leading-relaxed">{item.detail}</p>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function SegurancaLgpd() {
  const [copied, setCopied] = useState(false)

  const lgpdSummary = `Resumo da LGPD para Servidores:
- A LGPD (Lei Geral de Proteção de Dados) exige que dados pessoais sejam tratados com cuidado
- Como servidor público, você é responsável pelos dados que manipula
- Dados pessoais NÃO devem ser compartilhados com IAs ou serviços externos
- Use dados fictícios para testes e desenvolvimento
- Planilhas com dados reais devem ter acesso restrito
- Em caso de dúvida, consulte o setor responsável pela proteção de dados da UEMS`

  const handleCopySummary = () => {
    navigator.clipboard.writeText(lgpdSummary)
    setCopied(true)
    toast.success('Resumo copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="seguranca-lgpd" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-coral/10 text-coral border-coral/20 mb-4" variant="outline">
            <Shield className="size-3.5 mr-1.5" />
            LGPD
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Segurança e <span className="text-coral">LGPD</span>
          </h2>
          <p className="mt-3 text-muted-lavender max-w-2xl mx-auto">
            Proteger dados não é burocracia — é responsabilidade. Veja como usar IA e planilhas
            de forma segura, dentro da lei e com tranquilidade.
          </p>
        </motion.div>

        {/* Fundamental Principle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-coral/5 border-coral/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-6 text-coral" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Princípio Fundamental
                  </h3>
                  <p className="text-muted-lavender leading-relaxed">
                    Dados pessoais <strong className="text-coral">NÃO</strong> vão para IAs.{' '}
                    <strong className="text-coral">Nunca</strong> cole CPF, RG, dados reais de alunos
                    ou servidores em conversas com IA. A IA é uma ferramenta de código — ela não precisa
                    saber quem são as pessoas para resolver problemas de planilha.
                  </p>
                  <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-navy border border-white/[0.06]">
                    <Bot className="size-4 text-coral shrink-0" />
                    <p className="text-xs text-muted-lavender">
                      A IA precisa da <strong className="text-foreground">estrutura</strong> dos seus dados, não do{' '}
                      <strong className="text-coral">conteúdo</strong> real.
                      &quot;Coluna A = Nome, Coluna B = CPF&quot; é suficiente.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3 Golden Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Lock className="size-5 text-coral" />
            3 Regras de Ouro
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goldenRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <Card className="bg-surface border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${
                        rule.accentColor === 'coral'
                          ? 'bg-coral/10 border border-coral/20'
                          : 'bg-lime/10 border border-lime/20'
                      } flex items-center justify-center mb-4`}
                    >
                      <rule.icon
                        className={`size-6 ${
                          rule.accentColor === 'coral' ? 'text-coral' : 'text-lime'
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{rule.title}</h4>
                    <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                      {rule.description}
                    </p>
                    <div className="p-3 rounded-lg bg-navy border border-white/[0.06]">
                      <pre className="text-xs text-muted-lavender whitespace-pre-wrap leading-relaxed font-mono">
                        {rule.example}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What is LGPD for the server */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-surface border-white/[0.06]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-card-bg border border-white/[0.06] flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="size-6 text-lime" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      O que é a LGPD para o servidor?
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopySummary}
                      className="shrink-0 text-xs text-muted-lavender hover:text-lime cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3 mr-1" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 mr-1" />
                          Copiar resumo
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm text-muted-lavender leading-relaxed">
                    <p>
                      A <strong className="text-foreground">LGPD</strong> (Lei Geral de Proteção de Dados) é a lei
                      brasileira que define como dados pessoais devem ser tratados. Não é para assustar — é para
                      orientar. Pense assim: se você não gostaria que seus dados pessoais fossem expostos, não exponha
                      os dados dos outros.
                    </p>
                    <p>
                      Na prática, para quem trabalha com planilhas e ferramentas web na UEMS, a LGPD significa:{' '}
                      <strong className="text-foreground">mantenha os dados protegidos e não os compartilhe com
                      serviços externos</strong> (como IAs conversacionais) sem necessidade.
                    </p>
                    <p>
                      Você <em>não</em> está fazendo nada de errado ao criar ferramentas para melhorar o serviço
                      público. O segredo é:{' '}
                      <strong className="text-lime">desenvolva com dados fictícios, restrinja o acesso aos dados
                      reais</strong>, e consulte o setor de TI quando tiver dúvidas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <ClipboardCheck className="size-5 text-lime" />
            Checklist Rápido
          </h3>
          <Card className="bg-surface border-white/[0.06]">
            <CardContent className="p-2">
              <div className="space-y-1">
                {checklistItems.map((item, index) => (
                  <ChecklistRow key={item.id} item={item} index={index} />
                ))}
              </div>
              <div className="px-3 pt-3 pb-1">
                <p className="text-xs text-muted-lavender/60 text-center">
                  Clique em cada item para marcar como verificado
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
