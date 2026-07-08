'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  FileWarning,
  Ghost,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const bastidores = [
  {
    icon: Brain,
    title: 'A "Amnésia" da IA',
    description: 'Em conversas muito longas, a IA gratuita pode "esquecer" como o código estava no início ou se perder nas regras que você pediu lá atrás.',
    solution: 'Se o código quebrar muito e a IA começar a rodar em círculos, o melhor é abrir um chat novo, colar o último código que estava funcionando e continuar dali.',
    color: 'coral',
  },
  {
    icon: FileWarning,
    title: 'A "Preguiça" (Snippets Incompletos)',
    description: 'Às vezes a IA responde apenas com a parte do código que mudou (exemplo: // resto do código aqui...). Para quem não programa, juntar esses pedaços é terrível.',
    solution: 'Sempre reforce no seu prompt: "Me envie o código HTML completo e atualizado em um único arquivo, sem omitir nenhuma parte".',
    color: 'lime',
  },
  {
    icon: Ghost,
    title: 'Alucinações',
    description: 'A IA pode inventar funções que não existem ou que não funcionam bem no Google Apps Script.',
    solution: 'É por isso que a "Regra da Construção" é tão importante: teste um passo de cada vez.',
    color: 'coral',
  },
]

export default function BastidoresSection() {
  return (
    <section id="bastidores" className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <AlertTriangle className="size-3.5" />
            Os Bastidores
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Dificuldades Reais com{' '}
            <span className="text-coral">IAs Gratuitas</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Construir tudo isso usando versões gratuitas das IAs é incrível, mas tem seus percalços. No nosso processo de aprendizado, enfrentamos alguns desafios que você também pode encontrar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bastidores.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full bg-surface/80 border-white/6 hover:border-coral/20 transition-all duration-300 pattern-card">
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${item.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'}`}>
                    <item.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-lavender leading-relaxed mb-4">{item.description}</p>
                  <div className="p-3 rounded-lg bg-lime/5 border border-lime/10">
                    <p className="text-xs text-foreground font-medium mb-1 flex items-center gap-1.5">
                      <Lightbulb className="size-3 text-lime" />
                      O que fazer:
                    </p>
                    <p className="text-xs text-muted-lavender leading-relaxed">{item.solution}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Google AI Studio callout */}
        <motion.div
          className="mt-8 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center mt-0.5">
              <Sparkles className="size-5 text-lime" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Dica: O <span className="text-lime">Google AI Studio</span> resolve vários desses problemas
              </h3>
              <p className="text-sm text-muted-lavender leading-relaxed">
                O <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Google AI Studio</a> é a versão avançada do Gemini — gratuita e com recursos que combatem esses problemas.
                Com as <strong className="text-lime">System Instructions</strong>, você define instruções permanentes que a IA nunca esquece (fim da &quot;amnésia&quot;).
                Com a <strong className="text-lime">seleção de modelo</strong>, você escolhe o Gemini 2.5 Pro para código complexo ou o Gemini 2.5 Flash para respostas rápidas.
                E a janela de contexto maior (até 1 milhão de tokens) significa que conversas longas não se perdem.
                Já o <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Claude</a> é excelente
                para código longo e complexo, com o recurso Artifacts que mostra o resultado em tempo real.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
