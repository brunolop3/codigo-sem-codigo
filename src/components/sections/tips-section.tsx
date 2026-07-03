'use client'

import { motion } from 'framer-motion'
import {
  MessageSquare,
  XCircle,
  AlertTriangle,
  Mail,
  Building2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const tips = [
  {
    icon: MessageSquare,
    title: 'A IA mudou a funcionalidade ao alterar o visual',
    description:
      'Diga: "Você alterou o visual e ficou lindo, mas o botão de enviar parou de funcionar e não manda mais para a planilha. Por favor, junte o visual novo com a lógica do botão da versão anterior."',
    type: 'fix' as const,
  },
  {
    icon: XCircle,
    title: 'Erro de Permissão na Planilha',
    description:
      'Diga: "Está dando erro ao enviar os dados para a planilha. Como eu configuro o meu Google Apps Script para liberar o acesso público (qualquer pessoa) corretamente no momento de implantar (Deploy)?" Ela vai te dar o passo a passo exato.',
    type: 'fix' as const,
  },
]

export default function TipsSection() {
  return (
    <section id="tips" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <AlertTriangle className="size-3.5" />
            Solução de Problemas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Quando Algo Der{' '}
            <span className="text-coral">Errado</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            É normal! Não se assuste. Apenas &quot;jogue&quot; o problema de volta para a IA resolver por você.
          </p>
        </motion.div>

        <div className="space-y-4">
          {tips.map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Card className="bg-surface/80 border-white/6 hover:border-lime/15 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-coral/10 text-coral">
                      <tip.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-lime transition-colors">{tip.title}</h3>
                      <p className="text-sm text-muted-lavender leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Author box */}
        <motion.div className="mt-10 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
                <Building2 className="size-5 text-lime" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-lg">
                  O segredo é não ter medo de errar!
                </p>
                <p className="text-xs text-muted-lavender">Vá ajustando com a IA aos poucos.</p>
              </div>
            </div>

            <p className="text-sm text-muted-lavender leading-relaxed mb-4">
              Em caso de dúvidas sobre como estruturar os seus prompts ou conectar as planilhas, eu posso tentar ajudar! Sinta-se à vontade para me enviar um e-mail.
            </p>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/6 mb-4">
              <Mail className="size-4 text-lime" />
              <a href="mailto:bruno.lopes@uems.br" className="text-sm text-lime hover:underline font-medium">
                bruno.lopes@uems.br
              </a>
            </div>

            <div className="pt-4 border-t border-lime/10">
              <p className="text-xs text-muted-lavender/70 leading-relaxed italic">
                Vale deixar claro que eu não sou programador — minha formação é em Direito! Sou apenas alguém que está aprendendo a utilizar essas ferramentas a cada dia mais para facilitar as nossas rotinas institucionais. O segredo é não ter medo de errar e ir ajustando com a IA aos poucos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
