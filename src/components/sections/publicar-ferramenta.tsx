'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  Globe,
  Building2,
  GraduationCap,
  Star,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Platform Data ─── */
interface PlatformStep {
  text: string
}

interface PlatformData {
  id: string
  title: string
  icon: React.ElementType
  cost: string
  badge: string
  badgeColor: string
  steps: PlatformStep[]
  difficulty: number
  privacy: string
  privacyIcon: React.ElementType
  pros: string[]
  cons: string[]
}

const platforms: PlatformData[] = [
  {
    id: 'github',
    title: 'GitHub Pages',
    icon: Globe,
    cost: 'Grátis',
    badge: 'Popular',
    badgeColor: 'bg-lime/10 text-lime border-lime/20',
    steps: [
      { text: 'Crie um repositório no GitHub' },
      { text: 'Ative o GitHub Pages nas configurações' },
      { text: 'Suba o arquivo HTML para o repositório' },
    ],
    difficulty: 2,
    privacy: 'Público',
    privacyIcon: Unlock,
    pros: [
      'Totalmente gratuito e sem limites de tráfego',
      'Suporte a domínio personalizado',
      'Controle de versão integrado (Git)',
      'Comunidade enorme e documentação vasta',
    ],
    cons: [
      'Repositório precisa ser público (plano grátis)',
      'Exige conta no GitHub',
      'Curva de aprendizado do Git para iniciantes',
    ],
  },
  {
    id: 'google-sites',
    title: 'Google Sites',
    icon: Building2,
    cost: 'Grátis',
    badge: 'Fácil',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    steps: [
      { text: 'Crie um site no Google Sites' },
      { text: 'Insira o HTML via iframe ou incorporação' },
      { text: 'Publique e compartilhe o link' },
    ],
    difficulty: 1,
    privacy: 'Restrito @uems.br',
    privacyIcon: Lock,
    pros: [
      'Integrado ao ecossistema Google',
      'Restrição de acesso por domínio (@uems.br)',
      'Interface drag-and-drop, sem código',
      'Fácil de compartilhar dentro da instituição',
    ],
    cons: [
      'Personalização limitada do layout',
      'Iframe pode ter limitações de funcionalidade',
      'Dependência total do Google',
    ],
  },
  {
    id: 'moodle',
    title: 'Moodle / Intranet',
    icon: GraduationCap,
    cost: 'Institucional',
    badge: 'Recomendado',
    badgeColor: 'bg-coral/10 text-coral border-coral/20',
    steps: [
      { text: 'Crie um recurso no Moodle ou Intranet' },
      { text: 'Cole o HTML como rótulo ou link' },
      { text: 'Configure a visibilidade para os usuários' },
    ],
    difficulty: 1,
    privacy: 'Restrito UEMS',
    privacyIcon: Lock,
    pros: [
      'Acesso restrito ao ambiente institucional',
      'Já integrado à rotina dos servidores',
      'Sem necessidade de conta externa',
      'Suporte da TI da universidade',
    ],
    cons: [
      'Depende da configuração do Moodle/Intranet',
      'Pode ter limitações de JavaScript por segurança',
      'Nem todos os módulos permitem HTML livre',
    ],
  },
]

/* ─── Comparison Table Data ─── */
const comparisonRows = [
  { recurso: 'Custo', github: 'Grátis', google: 'Grátis', moodle: 'Grátis*' },
  { recurso: 'Dificuldade', github: '★★☆', google: '★☆☆', moodle: '★☆☆' },
  { recurso: 'Privacidade', github: 'Público', google: 'Restrito', moodle: 'Restrito' },
  { recurso: 'Conta necessária', github: 'GitHub', google: 'Google', moodle: 'UEMS' },
  { recurso: 'Domínio próprio', github: 'Sim', google: 'Não', moodle: 'Não' },
  { recurso: 'Controle de versão', github: 'Sim (Git)', google: 'Não', moodle: 'Não' },
  { recurso: 'Suporte institucional', github: 'Não', google: 'Parcial', moodle: 'Sim' },
  { recurso: 'JavaScript livre', github: 'Sim', google: 'Via iframe', moodle: 'Limitado' },
]

/* ─── Star Rating Component ─── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= count ? 'text-lime fill-lime' : 'text-muted-lavender/30'
          }`}
        />
      ))}
    </div>
  )
}

/* ─── Platform Card Component ─── */
function PlatformCard({ platform, index }: { platform: PlatformData; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const stepsText = platform.steps.map((s, i) => `${i + 1}. ${s.text}`).join('\n')

  const handleCopySteps = () => {
    navigator.clipboard.writeText(stepsText)
    setCopied(true)
    toast.success('Passos copiados!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="bg-surface border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-card-bg border border-white/[0.06] flex items-center justify-center">
                <platform.icon className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{platform.title}</h3>
                <p className="text-sm text-muted-lavender">{platform.cost}</p>
              </div>
            </div>
            <Badge className={platform.badgeColor} variant="outline">
              {platform.badge}
            </Badge>
          </div>

          {/* Difficulty & Privacy */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-lavender">Dificuldade:</span>
              <StarRating count={platform.difficulty} />
            </div>
            <div className="flex items-center gap-1.5">
              <platform.privacyIcon className="size-3.5 text-muted-lavender" />
              <span className="text-xs text-muted-lavender">{platform.privacy}</span>
            </div>
          </div>

          {/* Steps Count */}
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-lavender">
            <ExternalLink className="size-3.5" />
            <span>{platform.steps.length} passos para publicar</span>
          </div>

          {/* Pros */}
          <div className="mb-3">
            <p className="text-xs font-medium text-lime/80 mb-1.5">Prós</p>
            <ul className="space-y-1">
              {platform.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-muted-lavender">
                  <CheckCircle2 className="size-3 text-lime/60 mt-0.5 shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="mb-4">
            <p className="text-xs font-medium text-coral/80 mb-1.5">Contras</p>
            <ul className="space-y-1">
              {platform.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-muted-lavender">
                  <XCircle className="size-3 text-coral/60 mt-0.5 shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable Steps */}
          <div className="mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="w-full border-white/[0.08] hover:border-lime/30 hover:bg-lime/5 text-muted-lavender hover:text-lime transition-colors cursor-pointer"
            >
              {expanded ? (
                <>
                  <ChevronUp className="size-3.5 mr-1.5" />
                  Ocultar Passos
                </>
              ) : (
                <>
                  <ChevronDown className="size-3.5 mr-1.5" />
                  Ver Passos
                </>
              )}
            </Button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-3 rounded-lg bg-navy border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-foreground">Passo a passo</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopySteps}
                        className="h-6 px-2 text-xs text-muted-lavender hover:text-lime cursor-pointer"
                      >
                        {copied ? (
                          <Check className="size-3 mr-1" />
                        ) : (
                          <Copy className="size-3 mr-1" />
                        )}
                        {copied ? 'Copiado' : 'Copiar'}
                      </Button>
                    </div>
                    <ol className="space-y-2">
                      {platform.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-lavender">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime/10 text-lime text-xs flex items-center justify-center font-medium">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{step.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function PublicarFerramenta() {
  return (
    <section id="publicar" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-lime/10 text-lime border-lime/20 mb-4" variant="outline">
            <Rocket className="size-3.5 mr-1.5" />
            Hora de Lançar
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-lime text-glow-lime">Publicar</span> sua Ferramenta
          </h2>
          <p className="mt-3 text-muted-lavender max-w-2xl mx-auto">
            Sua ferramenta está pronta! Agora é hora de colocá-la no ar para que outras pessoas possam usar.
            Veja as opções e escolha a que melhor se adapta à sua necessidade.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <PlatformCard key={platform.id} platform={platform} index={index} />
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Tabela Comparativa
          </h3>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 text-muted-lavender font-medium">Recurso</th>
                  <th className="text-center p-4 text-lime font-medium">
                    <span className="flex items-center justify-center gap-1.5">
                      <Globe className="size-3.5" />
                      GitHub Pages
                    </span>
                  </th>
                  <th className="text-center p-4 text-sky-400 font-medium">
                    <span className="flex items-center justify-center gap-1.5">
                      <Building2 className="size-3.5" />
                      Google Sites
                    </span>
                  </th>
                  <th className="text-center p-4 text-coral font-medium">
                    <span className="flex items-center justify-center gap-1.5">
                      <GraduationCap className="size-3.5" />
                      Moodle
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.recurso}
                    className={`border-b border-white/[0.04] ${
                      i % 2 === 0 ? 'bg-card-bg/30' : ''
                    }`}
                  >
                    <td className="p-4 text-muted-lavender font-medium">{row.recurso}</td>
                    <td className="p-4 text-center text-foreground">{row.github}</td>
                    <td className="p-4 text-center text-foreground">{row.google}</td>
                    <td className="p-4 text-center text-foreground">{row.moodle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-lavender/60 mt-3 text-center">
            * Moodle/Intranet não tem custo direto, pois já faz parte da infraestrutura da UEMS.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
