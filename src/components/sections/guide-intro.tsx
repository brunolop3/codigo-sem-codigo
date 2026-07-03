'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Shield, Eye, Wrench, Palette } from 'lucide-react'

export default function GuideIntro() {
  return (
    <section id="guide" className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-6">
            <BookOpen className="size-3.5" />
            Guia Prático para Servidores UEMS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-lime">Código sem Código:</span>
            <br />
            Guia Prático para Criar Ferramentas Web com IA
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-muted-lavender leading-relaxed">
            <p>
              Este guia foi criado para ajudar <strong className="text-foreground">qualquer pessoa</strong> —
              mesmo quem nunca programou na vida — a construir aplicações, painéis e automações usando
              Inteligência Artificial (como{' '}
              <a href="https://z.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Z.ai</a>,{' '}
              <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Gemini</a>,{' '}
              <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">ChatGPT</a>,{' '}
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Claude</a> e{' '}
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Google AI Studio</a>) integrados ao Google Sheets.
            </p>
            <p>
              A chave para o sucesso é saber como &quot;pedir&quot; para a IA. O que chamamos de &quot;pedir&quot;
              é o <strong className="text-lime">Prompt</strong>. A regra de ouro é:{' '}
              <em className="text-foreground not-italic font-semibold">
                você explica O QUE quer, e a IA descobre COMO programar isso.
              </em>
            </p>
          </div>

          {/* Dica de Ouro */}
          <motion.div className="mt-8 rounded-xl border border-lime/20 bg-lime/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime/15 flex items-center justify-center mt-0.5">
                <Lightbulb className="size-5 text-lime" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Dica de Ouro: Dê preferência a IAs com &quot;Preview&quot; (Visualização)
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed">
                  Para facilitar imensamente a sua vida, use IAs que mostram o resultado na própria tela,
                  como o <a href="https://z.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Z.ai</a> (que cria e visualiza o site em tempo real),
                  o <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Google AI Studio</a> (versão avançada do Gemini com mais recursos),
                  o <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Gemini</a> (que abre o site do lado direito)
                  ou o <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-lime transition-colors underline decoration-lime/30 underline-offset-2">Claude</a> (com o recurso Artifacts). Você
                  escreve o pedido, a IA cria a página e você já testa ela funcionando ali mesmo!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dica de Segurança - Spreadsheet Privacy */}
          <motion.div className="mt-6 rounded-xl border border-coral/20 bg-coral/5 p-6 relative overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral/15 flex items-center justify-center mt-0.5">
                <Shield className="size-5 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Dica de Segurança: Minha planilha precisa ficar pública?
                </h3>
                <p className="text-sm text-muted-lavender leading-relaxed mb-3">
                  <strong className="text-coral">NÃO!</strong> Você nunca precisa (e nem deve) deixar sua planilha com dados sensíveis pública na internet, e muito menos enviar o link dela para a Inteligência Artificial.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                    <p className="text-sm text-foreground font-medium mb-1">Para a IA entender sua planilha:</p>
                    <p className="text-xs text-muted-lavender leading-relaxed">
                      Você não manda o link para ela. O truque mais rápido e eficiente é simplesmente ir na sua planilha, copiar a linha do cabeçalho (os títulos) e pelo menos uma linha com dados preenchidos, e colar direto na conversa com a IA. Com isso, ela entende as colunas e que tipo de informação vai em cada uma.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/6">
                    <p className="text-sm text-foreground font-medium mb-1">Para o Site conseguir enviar dados para a Planilha:</p>
                    <p className="text-xs text-muted-lavender leading-relaxed">
                      Sua planilha continua privada e segura no seu Google Drive. O que você vai liberar para &quot;Qualquer Pessoa&quot; é apenas o código (o Apps Script) que recebe os dados. É como se a sua planilha fosse um cofre trancado: o código é apenas uma fenda na porta onde as pessoas inserem papéis (dados), mas ninguém além de você consegue abrir o cofre para ver o que tem dentro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow visual */}
          <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            {[
              { step: '01', icon: Eye, title: 'Descreva', desc: 'Explique o que precisa em linguagem simples' },
              { step: '02', icon: Wrench, title: 'Construa', desc: 'Funcionalidade primeiro, sem se preocupar com o visual' },
              { step: '03', icon: Palette, title: 'Pinte', desc: 'Com tudo funcionando, melhore o visual' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-white/6">
                <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon className="size-3.5 text-lime" />
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  </div>
                  <p className="text-xs text-muted-lavender">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
