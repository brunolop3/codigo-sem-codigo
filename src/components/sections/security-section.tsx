'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Unlock,
  Lock,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function SecuritySection() {
  return (
    <section id="seguranca" className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Shield className="size-3.5" />
            Segurança
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            O Equilíbrio entre{' '}
            <span className="text-lime">Praticidade</span> e{' '}
            <span className="text-coral">Proteção</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Como estamos criando ferramentas ágeis, o nível de segurança depende do tipo de dado que você está manipulando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quando usar acesso público */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-lime/5 border-lime/20 hover:border-lime/30 transition-all duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center">
                    <Unlock className="size-5 text-lime" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Acesso Público</h3>
                    <p className="text-xs text-lime font-medium">&quot;Qualquer Pessoa&quot;</p>
                  </div>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  Se você está criando um painel de indicadores (Dashboard) com dados públicos (como notas do Enade, histórico de vagas) para colocar embutido dentro de uma página do Moodle ou no site da universidade, a configuração deve ser &quot;Qualquer Pessoa&quot;.
                </p>
                <div className="space-y-2">
                  {[
                    'Não há problema — os dados são de domínio público',
                    'Exigir login quebraria o painel dentro do Moodle',
                    'Vale também para aplicações simples de uso interno, onde a praticidade fala mais alto',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-lime flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-lavender leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quando aplicar regras rígidas */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full bg-coral/5 border-coral/20 hover:border-coral/30 transition-all duration-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-coral/15 flex items-center justify-center">
                    <Lock className="size-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Dados Sensíveis</h3>
                    <p className="text-xs text-coral font-medium">Regras Rígidas</p>
                  </div>
                </div>
                <p className="text-sm text-muted-lavender leading-relaxed mb-4">
                  Se você for lidar com dados sensíveis (informações pessoais, avaliações, processos sigilosos), aplique estas regras de ouro:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Validação Dupla',
                      desc: 'Não confie apenas na aplicação (HTML). Peça para a IA fazer com que o Apps Script também verifique se os dados chegaram corretamente antes de salvar.',
                    },
                    {
                      title: 'Nunca exponha senhas no HTML',
                      desc: 'O código do site pode ser lido por qualquer pessoa (F12 → Inspecionar). Tudo que é "secreto" deve ficar no Apps Script.',
                    },
                    {
                      title: 'Restrição de Acesso (@uems.br)',
                      desc: 'Peça para a IA criar um Web App no Apps Script com HtmlService. Na hora de publicar, restrinja o acesso apenas para usuários @uems.br.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                      <p className="text-xs text-foreground font-medium mb-1">{item.title}</p>
                      <p className="text-xs text-muted-lavender leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
