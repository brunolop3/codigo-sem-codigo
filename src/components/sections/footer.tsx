'use client'

import { motion } from 'framer-motion'
import { Zap, Mail, BookOpen, Shield, Wrench } from 'lucide-react'

const footerLinks = [
  {
    title: 'Aprender',
    icon: BookOpen,
    links: [
      { label: 'Guia de Introdução', href: '#guide' },
      { label: 'Teste em 5 Minutos', href: '#teste5min' },
      { label: 'Biblioteca de Prompts', href: '#biblioteca' },
      { label: 'Construtor de Prompt', href: '#builder' },
    ],
  },
  {
    title: 'Construir',
    icon: Wrench,
    links: [
      { label: 'Domando Tabelas', href: '#tabelas' },
      { label: 'Padronização', href: '#padronizacao' },
      { label: 'Conectar ao Sheets', href: '#conectar' },
      { label: '100% no Google', href: '#dentro-do-google' },
    ],
  },
  {
    title: 'Proteger',
    icon: Shield,
    links: [
      { label: 'Segurança e LGPD', href: '#seguranca-lgpd' },
      { label: 'Publicar com Segurança', href: '#publicar' },
      { label: 'Manutenção e Socorro', href: '#socorro' },
      { label: 'Perguntas Frequentes', href: '#faq' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-surface/50 mt-auto">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
                  <Zap className="size-4.5 text-navy" />
                </div>
                <span className="font-bold text-lg">
                  Código<span className="text-lime">semCódigo</span>
                </span>
              </div>
              <p className="text-sm text-muted-lavender leading-relaxed mb-4 max-w-xs">
                Guia prático para servidores UEMS criarem ferramentas web com IA — mesmo sem saber programar.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:bruno.lopes@uems.br"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-lavender hover:text-lime transition-colors group w-fit"
                >
                  <Mail className="size-3.5 group-hover:scale-110 transition-transform" />
                  bruno.lopes@uems.br
                </a>
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: colIndex * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <column.icon className="size-4 text-lime/70" />
                <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-lavender hover:text-lime transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-lime/60 transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-lavender/70 text-center sm:text-left">
              Pró-Reitoria de Ensino · Universidade Estadual de Mato Grosso do Sul
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-lavender/70">
              <span>Feito com IA, para criar com IA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="h-1 bg-gradient-to-r from-transparent via-lime/20 to-transparent" />
    </footer>
  )
}
