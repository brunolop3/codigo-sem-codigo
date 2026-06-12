'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Copy, Check, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const stylePresets = [
  { label: 'Moderno e Limpo', value: 'moderno, com design limpo, cantos arredondados e cores suaves' },
  { label: 'Minimalista', value: 'minimalista, com muito espaço em branco e tipografia elegante' },
  { label: 'Colorido e Divertido', value: 'colorido e divertido, com ícones animados e cores vibrantes' },
  { label: 'Profissional Corporativo', value: 'profissional corporativo, com cores sóbrias (azul e cinza) e layout estruturado' },
  { label: 'Escuro e Tecnológico', value: 'escuro e tecnológico, com fundo escuro, acentos neon e estilo futurista' },
]

export default function PromptBuilder() {
  const [fields, setFields] = useState({
    toolName: '',
    field1: '',
    field1Desc: '',
    field2: '',
    field2Desc: '',
    field3: '',
    field3Desc: '',
    style: '',
    behavior: '',
    integration: '',
  })
  const [copied, setCopied] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [generated, setGenerated] = useState(false)

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (generated) setGenerated(false)
  }

  const generatedPrompt = `Atue como um criador de sites profissional. Crie um arquivo único contendo ${fields.toolName || '[NOME DA FERRAMENTA]'}.

O que precisa ter:
- ${fields.field1 || '[CAMPO 1]'}: ${fields.field1Desc || '[DESCRIÇÃO]'}
- ${fields.field2 || '[CAMPO 2]'}: ${fields.field2Desc || '[DESCRIÇÃO]'}
- ${fields.field3 || '[CAMPO 3]'}: ${fields.field3Desc || '[DESCRIÇÃO]'}

Visual: ${fields.style || '[ESTILO DESEJADO]'}
Funcionamento: ${fields.behavior || '[O QUE DEVE ACONTECER]'}
${fields.integration ? `Integração: ${fields.integration}` : 'Integração: [SE PRECISAR - ex: envie os dados para o Google Sheets]'}

Coloque todo o código necessário em um único arquivo, para facilitar para mim, pois não sou programador.`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = generatedPrompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleReset = () => {
    setFields({
      toolName: '',
      field1: '',
      field1Desc: '',
      field2: '',
      field2Desc: '',
      field3: '',
      field3Desc: '',
      style: '',
      behavior: '',
      integration: '',
    })
    setGenerated(false)
  }

  const isReady = fields.toolName && fields.field1 && fields.behavior

  return (
    <section id="builder" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-lime/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-coral/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-xs font-medium mb-4">
            <Wand2 className="size-3.5" />
            Construtor Interativo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Monte Seu{' '}
            <span className="text-lime text-glow-lime">Prompt</span>
          </h2>
          <p className="text-muted-lavender text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Preencha os campos abaixo e gere automaticamente um prompt personalizado para criar sua ferramenta web.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-surface/80 border-white/6 overflow-hidden">
            <CardContent className="p-0">
              {/* Builder form */}
              <div className="p-5 sm:p-8 space-y-6">
                {/* Tool name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome da Ferramenta <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    value={fields.toolName}
                    onChange={(e) => updateField('toolName', e.target.value)}
                    placeholder="ex: Sistema de Pedido de Materiais"
                    className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                  />
                </div>

                {/* Fields grid */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Campos do Formulário <span className="text-coral">*</span>
                  </label>
                  <div className="space-y-3">
                    {[
                      { num: 1, nameKey: 'field1', descKey: 'field1Desc', namePh: 'ex: Nome Completo', descPh: 'ex: texto curto, obrigatório' },
                      { num: 2, nameKey: 'field2', descKey: 'field2Desc', namePh: 'ex: Setor', descPh: 'ex: menu dropdown com opções' },
                      { num: 3, nameKey: 'field3', descKey: 'field3Desc', namePh: 'ex: Descrição do Pedido', descPh: 'ex: texto longo, várias linhas' },
                    ].map((f) => (
                      <div key={f.num} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-md bg-lime/10 text-lime text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">
                          {f.num}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={fields[f.nameKey as keyof typeof fields]}
                            onChange={(e) => updateField(f.nameKey, e.target.value)}
                            placeholder={f.namePh}
                            className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                          />
                          <input
                            type="text"
                            value={fields[f.descKey as keyof typeof fields]}
                            onChange={(e) => updateField(f.descKey, e.target.value)}
                            placeholder={f.descPh}
                            className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style preset */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Estilo Visual
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowPresets(!showPresets)}
                      className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/10 text-left flex items-center justify-between hover:border-white/20 transition-colors"
                    >
                      <span className={`text-sm ${fields.style ? 'text-foreground' : 'text-muted-lavender/50'}`}>
                        {fields.style || 'Selecione um estilo ou escreva o seu...'}
                      </span>
                      {showPresets ? (
                        <ChevronUp className="size-4 text-muted-lavender" />
                      ) : (
                        <ChevronDown className="size-4 text-muted-lavender" />
                      )}
                    </button>
                    <AnimatePresence>
                      {showPresets && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-surface border border-white/10 overflow-hidden z-20 shadow-xl"
                        >
                          {stylePresets.map((preset, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                updateField('style', preset.value)
                                setShowPresets(false)
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-muted-lavender hover:text-foreground hover:bg-white/5 transition-colors"
                            >
                              <span className="font-medium text-foreground">{preset.label}</span>
                              <br />
                              <span className="text-xs">{preset.value}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="text"
                    value={fields.style}
                    onChange={(e) => updateField('style', e.target.value)}
                    placeholder="Ou digite seu estilo personalizado aqui..."
                    className="w-full h-10 px-3 mt-2 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                  />
                </div>

                {/* Behavior */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Funcionamento <span className="text-coral">*</span>
                  </label>
                  <textarea
                    value={fields.behavior}
                    onChange={(e) => updateField('behavior', e.target.value)}
                    placeholder="ex: Ao clicar no botão Enviar, salve os dados e mostre uma mensagem de sucesso"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm resize-none"
                  />
                </div>

                {/* Integration (optional) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Integração <span className="text-muted-lavender font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={fields.integration}
                    onChange={(e) => updateField('integration', e.target.value)}
                    placeholder="ex: Envie os dados para uma Planilha do Google"
                    className="w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-lavender/50 focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 sm:px-8 py-4 border-t border-white/6 bg-white/[0.01] flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={() => setGenerated(true)}
                  disabled={!isReady}
                  className="w-full sm:w-auto bg-lime text-navy hover:bg-lime-dark font-semibold h-11 px-6 gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Wand2 className="size-4" />
                  Gerar Prompt
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="w-full sm:w-auto text-muted-lavender hover:text-foreground gap-2"
                >
                  <RotateCcw className="size-4" />
                  Limpar
                </Button>
              </div>

              {/* Generated prompt preview */}
              <AnimatePresence>
                {generated && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/6">
                      <div className="p-5 sm:p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                            Seu Prompt Gerado
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className={`h-8 gap-1.5 text-xs font-medium ${
                              copied
                                ? 'text-lime bg-lime/10'
                                : 'text-muted-lavender hover:text-foreground'
                            }`}
                          >
                            {copied ? (
                              <>
                                <Check className="size-3.5" />
                                Copiado!
                              </>
                            ) : (
                              <>
                                <Copy className="size-3.5" />
                                Copiar
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="code-block">
                          <pre className="p-4 text-xs sm:text-sm leading-relaxed font-mono text-foreground/90 whitespace-pre-wrap max-h-72 overflow-y-auto">
                            {generatedPrompt}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
