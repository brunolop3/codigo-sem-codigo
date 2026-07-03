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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ─── FAQ Data ─── */
interface FaqItem {
  id: string
  question: string
  answer: string
  icon: React.ElementType
  accentColor: 'lime' | 'coral'
}

const faqItems: FaqItem[] = [
  {
    id: 'preciso-saber-programar',
    question: 'Preciso saber programar?',
    answer:
      'Não! É para isso que serve a IA. Você descreve o que precisa em linguagem natural, e ela gera o código. Você não precisa entender de JavaScript, HTML ou CSS — apenas saber o que quer que a ferramenta faça. O único "código" que você vai mexer é copiar e colar o que a IA gerar.',
    icon: Code2,
    accentColor: 'lime',
  },
  {
    id: 'permitido-universidade',
    question: 'Isso é permitido na universidade?',
    answer:
      'Sim! Você está criando ferramentas para melhorar o serviço público — agilizar processos, organizar dados, facilitar o trabalho do setor. Não está acessando sistemas restritos nem violando normas. É como usar Excel, só que mais poderoso. As ferramentas ficam na infraestrutura da UEMS (Google Sheets, Moodle) e os dados continuam protegidos.',
    icon: Building2,
    accentColor: 'lime',
  },
  {
    id: 'qual-ia-melhor',
    question: 'Qual IA é melhor?',
    answer:
      'Depende da tarefa! Z.ai e Google AI Studio são ótimos para visualização e protótipos rápidos. ChatGPT é versátil e resolve a maioria dos casos. Claude é bom para código longo e complexo. A melhor estratégia? Use mais de uma! Teste o mesmo prompt em IAs diferentes e compare os resultados. O importante é que funcione para você.',
    icon: Brain,
    accentColor: 'coral',
  },
  {
    id: 'planilha-grande',
    question: 'Minha planilha tem milhares de linhas, a ferramenta aguenta?',
    answer:
      'Sim, com as técnicas certas! O segredo está na seção "Domando Tabelas" deste guia: use busca por texto para filtrar, implemente paginação (carregar de 25 em 25 registros), e adicione filtros por coluna. O Apps Script consegue lidar com planilhas grandes — o problema é carregar tudo de uma vez no navegador. Com paginação e filtros, sua ferramenta fica rápida mesmo com milhares de linhas.',
    icon: Gauge,
    accentColor: 'coral',
  },
  {
    id: 'colega-preenche-diferente',
    question: 'E se cada colega preenche de um jeito?',
    answer:
      'Esse é um problema clássico! A solução é usar formulários com campos controlados (dropdowns, checkboxes, selects) em vez de campos de texto livre. Veja a seção "Padronização" deste guia para aprender como criar formulários que garantem consistência nos dados. Quando o colega só pode escolher opções pré-definidas, não tem como preencher errado.',
    icon: ClipboardList,
    accentColor: 'lime',
  },
  {
    id: 'quanto-custa',
    question: 'Quanto custa?',
    answer:
      'As IAs gratuitas resolvem 90% dos casos! ChatGPT (versão grátis), Google AI Studio e Z.ai têm planos gratuitos generosos. O Google Sheets é grátis com conta institucional. O GitHub Pages é grátis. O Apps Script é grátis. Ou seja: você pode criar ferramentas profissionais sem gastar nada. Se precisar de mais capacidade, os planos pagos são acessíveis, mas para a maioria dos casos, o gratuito é suficiente.',
    icon: DollarSign,
    accentColor: 'lime',
  },
  {
    id: 'dados-seguros',
    question: 'Os dados ficam seguros?',
    answer:
      'Se você seguir as orientações da seção de Segurança/LGPD, sim! O Google Sheets permite restringir o acesso por domínio (@uems.br). O Apps Script funciona como intermediário — o HTML não acessa a planilha diretamente. E os dados pessoais reais nunca vão para as conversas com IA. É como um cofre com duas chaves: precisa seguir o protocolo, mas funciona.',
    icon: Shield,
    accentColor: 'coral',
  },
  {
    id: 'ia-pode-errar',
    question: 'A IA pode errar?',
    answer:
      'Sim, pode! As IAs às vezes "alucinam" — inventam funções que não existem, usam sintaxe incorreta ou esquecem partes do código. Por isso testamos um passo de cada vez. Se algo não funciona, volte na conversa e diga: "Isso não funcionou, o erro é [cole a mensagem de erro]". A IA vai corrigir. E sempre salve uma cópia do código que funciona antes de pedir mudanças!',
    icon: AlertTriangle,
    accentColor: 'coral',
  },
  {
    id: 'como-atualizo',
    question: 'Como atualizo depois?',
    answer:
      'Simples! Volte na conversa com a IA (ou comece uma nova), cole o código atual e descreva a mudança que precisa. Peça o código completo atualizado. Se o Apps Script mudou, faça um novo deploy e atualize o URL no HTML. Se foi só o HTML, salve o novo arquivo e substitua o anterior. O importante é sempre manter uma cópia do código que funciona.',
    icon: RefreshCw,
    accentColor: 'lime',
  },
  {
    id: 'por-onde-comeco',
    question: 'Por onde começo?',
    answer:
      'Pela seção "Teste em 5 Minutos"! Ela foi feita exatamente para isso — você copia um prompt pronto, cola na IA, salva o resultado como arquivo HTML e abre no navegador. Em 5 minutos você vai ter sua primeira ferramenta funcionando. Depois, explore as outras seções para aprender a conectar com planilhas, padronizar dados e publicar para os colegas.',
    icon: Rocket,
    accentColor: 'lime',
  },
]

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
