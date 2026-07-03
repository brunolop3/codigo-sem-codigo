'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  Code2,
  Building2,
  Brain,
  Gauge,
  ClipboardList,
  DollarSign,
  Shield,
  AlertTriangle,
  RefreshCw,
  Rocket,
  ChevronDown,
  Lock,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import faqData from '@/content/faq.json'
import type { FaqItem as FaqItemType } from '@/content/types'

/* ─── Visual metadata (not stored in JSON) ─── */
const faqMeta: Record<string, { icon: React.ElementType; accentColor: 'lime' | 'coral' }> = {
  'preciso-saber-programar': { icon: Code2, accentColor: 'lime' },
  'permitido-universidade': { icon: Building2, accentColor: 'lime' },
  'qual-ia-melhor': { icon: Brain, accentColor: 'coral' },
  'planilha-grande': { icon: Gauge, accentColor: 'coral' },
  'colega-preenche-diferente': { icon: ClipboardList, accentColor: 'lime' },
  'quanto-custa': { icon: DollarSign, accentColor: 'lime' },
  'dados-seguros': { icon: Shield, accentColor: 'coral' },
  'ia-pode-errar': { icon: AlertTriangle, accentColor: 'coral' },
  'como-atualizo': { icon: RefreshCw, accentColor: 'lime' },
  'por-onde-comeco': { icon: Rocket, accentColor: 'lime' },
  'dados-vazar': { icon: Lock, accentColor: 'coral' },
}

/* ─── Merged FAQ type with visual metadata ─── */
interface FaqItem {
  id: string
  question: string
  answer: string
  categoria: FaqItemType['categoria']
  icon: React.ElementType
  accentColor: 'lime' | 'coral'
}

const faqItems: FaqItem[] = (faqData as FaqItemType[]).map((item) => {
  const meta = faqMeta[item.id] ?? { icon: HelpCircle, accentColor: 'lime' as const }
  return {
    ...item,
    icon: meta.icon,
    accentColor: meta.accentColor,
  }
})

/* ─── FAQ Accordion Item ─── */
function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
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
                item.accentColor === 'lime'
                  ? 'bg-lime/10 border border-lime/20'
                  : 'bg-coral/10 border border-coral/20'
              } flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
            >
              <item.icon
                className={`size-5 ${
                  item.accentColor === 'lime' ? 'text-lime' : 'text-coral'
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold transition-colors ${
                  isOpen
                    ? item.accentColor === 'lime'
                      ? 'text-lime'
                      : 'text-coral'
                    : 'text-foreground'
                }`}
              >
                {item.question}
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
                <div className="px-5 pb-5 pl-19">
                  <div className="ml-14">
                    <p className="text-sm text-muted-lavender leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function Faq() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-lime/10 text-lime border-lime/20 mb-4" variant="outline">
            <HelpCircle className="size-3.5 mr-1.5" />
            Dúvidas Comuns
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Perguntas <span className="text-lime text-glow-lime">Frequentes</span>
          </h2>
          <p className="mt-3 text-muted-lavender max-w-2xl mx-auto">
            As perguntas que todo servidor faz quando começa a criar ferramentas com IA.
            Se a sua não está aqui, tente a seção &quot;Manutenção e Socorro&quot;.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <FaqAccordionItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-lavender">
            Ainda tem dúvidas? Volte ao início do guia e comece pela seção{' '}
            <a
              href="#teste-5-minutos"
              className="text-lime hover:underline underline-offset-4"
            >
              Teste em 5 Minutos
            </a>{' '}
            — a melhor forma de aprender é fazendo!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
