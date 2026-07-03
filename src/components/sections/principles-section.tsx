'use client'

import { motion } from 'framer-motion'
import { Eye, FileText, Layers, Wrench, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const principles = [
  {
    icon: Eye,
    title: 'Seja Claro e Específico',
    description:
      'Converse como se estivesse explicando a tarefa para um estagiário muito inteligente, mas que não conhece sua empresa. Em vez de "faça um site", diga "crie uma página com uma aplicação de cadastro de processos administrativos".',
    color: 'lime',
  },
  {
    icon: FileText,
    title: 'Dê Contexto',
    description:
      'Explique para que serve. "Esta aplicação será usada por servidores no celular para registrar rapidamente o recebimento de malotes na portaria".',
    color: 'coral',
  },
  {
    icon: Layers,
    title: 'Peça Tudo em um Só Lugar',
    description:
      'Para você não ter que lidar com vários arquivos confusos, peça sempre para a IA colocar todo o código do site em um único arquivo.',
    color: 'lime',
  },
  {
    icon: Wrench,
    title: 'A Regra da Construção',
    description:
      'Funcionalidade PRIMEIRO, Visual DEPOIS! Construa as paredes antes de pintar a casa. Peça primeiro a estrutura e o funcionamento. Só depois que estiver tudo funcionando sem erros, peça para caprichar no visual.',
    color: 'coral',
    isHighlighted: true,
  },
]

export default function PrinciplesSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-medium mb-4">
            <Target className="size-3.5" />
            Fundamentos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Princípios para um{' '}
            <span className="text-lime">Bom Prompt</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto">
            Lembre-se destas regrinhas ao conversar com a IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className={`h-full transition-all duration-300 hover:bg-surface pattern-card ${
                p.isHighlighted
                  ? 'bg-coral/5 border-coral/20 hover:border-coral/30'
                  : 'bg-surface/80 border-white/6 hover:border-lime/20'
              }`}>
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    p.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-coral/10 text-coral'
                  }`}>
                    <p.icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${p.color === 'lime' ? 'text-lime' : 'text-coral'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-lime transition-colors">
                      {p.title}
                    </h3>
                    {p.isHighlighted && (
                      <Badge className="bg-coral/15 text-coral text-[10px] border-coral/20">Regra de Ouro</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-lavender leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
