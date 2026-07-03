'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Database,
  Brain,
  Smartphone,
  Gauge,
  Link2,
  Copy,
  FileWarning,
  Wrench,
  ChevronDown,
  Check,
  Terminal,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

/* ─── Problem Data ─── */
interface ProblemSolution {
  step: string
}

interface ProblemData {
  id: string
  title: string
  icon: React.ElementType
  description: string
  solutions: ProblemSolution[]
  promptSnippet: string
  promptLabel: string
}

const problems: ProblemData[] = [
  {
    id: 'planilha-parou',
    title: 'Minha ferramenta parou de salvar na planilha',
    icon: Database,
    description:
      'A ferramenta funcionava bem, mas de repente os dados não estão sendo salvos na planilha. Isso geralmente acontece após mudanças no Apps Script ou perda de permissões.',
    solutions: [
      { step: 'Verifique se a URL do Apps Script está correta no código HTML' },
      { step: 'Abra o Apps Script e faça um novo deploy (Implantação > Nova implantação)' },
      { step: 'Confira se as permissões do script continuam ativas (Execute como: eu)' },
      { step: 'Teste a URL diretamente no navegador — deve retornar dados JSON' },
      { step: 'Verifique o console do navegador (F12) para mensagens de erro' },
    ],
    promptSnippet:
      'Minha ferramenta HTML não está salvando dados na planilha. O URL do Apps Script é [cole aqui]. Ao tentar salvar, o console mostra o erro: [cole o erro]. Pode me ajudar a identificar e corrigir o problema?',
    promptLabel: 'Prompt para diagnosticar erro de salvamento',
  },
  {
    id: 'ia-esqueceu',
    title: 'A IA esqueceu parte do código ao editar',
    icon: Brain,
    description:
      'Você pediu para a IA fazer uma modificação e ela reescreveu o código inteiro, mas esqueceu ou alterou partes que estavam funcionando antes. Isso é comum em conversas longas.',
    solutions: [
      { step: 'Sempre cole o código COMPLETO e atualizado antes de pedir mudanças' },
      { step: 'Se a conversa ficou muito longa, comece um novo chat com o código atual' },
      { step: 'Seja específico: "Altere APENAS a função X, não modifique o restante"' },
      { step: 'Guarde sempre uma cópia do código que funciona antes de pedir mudanças' },
      { step: 'Use o prompt de manutenção abaixo para orientar a IA' },
    ],
    promptSnippet:
      'Aqui está meu código HTML completo que está funcionando:\n\n[cole o código]\n\nPreciso que você altere APENAS [descreva a mudança]. NÃO modifique nada além do que estou pedindo. Me devolva o código completo atualizado.',
    promptLabel: 'Prompt para editar sem quebrar',
  },
  {
    id: 'layout-celular',
    title: 'O layout quebrou no celular',
    icon: Smartphone,
    description:
      'A ferramenta funciona perfeitamente no computador, mas no celular os elementos ficam desalinhados, cortados ou sobrepostos. Isso acontece quando o código não foi feito com design responsivo.',
    solutions: [
      { step: 'Verifique se a tag <meta name="viewport"> está presente no <head>' },
      { step: 'Adicione: <meta name="viewport" content="width=device-width, initial-scale=1.0">' },
      { step: 'Substitua larguras fixas (ex: width: 800px) por larguras flexíveis (width: 100%)' },
      { step: 'Use media queries para ajustar o layout em telas menores' },
      { step: 'Teste no celular após cada alteração' },
    ],
    promptSnippet:
      'Meu código funciona bem no computador, mas quebra no celular. Adicione design responsivo (mobile-first). Mantenha toda a funcionalidade existente. Aqui está o código:\n\n[cole o código]',
    promptLabel: 'Prompt para corrigir layout mobile',
  },
  {
    id: 'planilha-lenta',
    title: 'A planilha ficou lenta com muitas linhas',
    icon: Gauge,
    description:
      'Quando a planilha tinha poucas linhas, tudo era rápido. Mas agora com centenas ou milhares de registros, a ferramenta demora para carregar ou trava. Isso é comum quando se carrega todos os dados de uma vez.',
    solutions: [
      { step: 'Implemente paginação: carregue apenas 25-50 registros por vez' },
      { step: 'Adicione um campo de busca para filtrar dados no servidor (via Apps Script)' },
      { step: 'No Apps Script, use getRange() em vez de getDataRange() para limitar a consulta' },
      { step: 'Crie filtros por coluna no Apps Script para retornar apenas dados relevantes' },
      { step: 'Considere usar cache no Apps Script com CacheService' },
    ],
    promptSnippet:
      'Minha ferramenta está lenta porque a planilha tem muitas linhas. Adicione paginação (25 registros por página), busca por texto e filtros. Os dados vêm do Apps Script. Aqui está o código:\n\n[cole o código]',
    promptLabel: 'Prompt para adicionar paginação',
  },
  {
    id: 'link-mudou',
    title: 'O link do Apps Script mudou',
    icon: Link2,
    description:
      'Cada nova implantação do Apps Script gera um novo URL. Se você refez o deploy, o link antigo para de funcionar e a ferramenta quebra.',
    solutions: [
      { step: 'Sempre use "Nova implantação" para criar o primeiro deploy' },
      { step: 'Para atualizações, use "Gerenciar implantações" > editar a existente > "Nova versão"' },
      { step: 'Isso mantém o mesmo URL e apenas atualiza o código' },
      { step: 'Se precisou criar nova implantação, atualize o URL no código HTML' },
      { step: 'Guarde o URL em um lugar de fácil acesso no código (variável no topo)' },
    ],
    promptSnippet:
      'O URL do meu Apps Script mudou de [URL antigo] para [URL novo]. Substitua no código e me devolva atualizado. Aqui está o código:\n\n[cole o código]',
    promptLabel: 'Prompt para atualizar URL',
  },
  {
    id: 'dados-duplicados',
    title: 'Dados duplicados na planilha',
    icon: Copy,
    description:
      'Ao submeter o formulário, os dados estão sendo salvos mais de uma vez na planilha. Isso pode acontecer por cliques duplos no botão de enviar ou por falta de validação.',
    solutions: [
      { step: 'Desabilite o botão de envio após o primeiro clique (disabled = true)' },
      { step: 'Adicione uma verificação de ID único antes de salvar' },
      { step: 'No Apps Script, implemente verificação de duplicata antes de appendRow()' },
      { step: 'Use um campo de timestamp + combinação de dados como ID único' },
      { step: 'Adicione feedback visual (loading spinner) durante o envio' },
    ],
    promptSnippet:
      'Meus dados estão sendo duplicados na planilha. Adicione: 1) Desabilitar o botão após o clique, 2) Verificação de ID único no Apps Script, 3) Loading spinner durante envio. Aqui está o código:\n\n[cole o código]',
    promptLabel: 'Prompt para evitar duplicação',
  },
  {
    id: 'encoding',
    title: 'Caracteres estranhos (encoding)',
    icon: FileWarning,
    description:
      'Acentos, cedilhas e caracteres especiais aparecem como símbolos estranhos (ex: "Ã©" em vez de "é"). Isso é um problema de codificação de caracteres.',
    solutions: [
      { step: 'Adicione <meta charset="UTF-8"> no <head> do HTML' },
      { step: 'No Apps Script, use ContentService.MimeType.JSON com charset UTF-8' },
      { step: 'Ao enviar dados, use encodeURIComponent() nos valores' },
      { step: 'No Apps Script, decodifique com decodeURIComponent() se necessário' },
      { step: 'Verifique se a planilha está configurada com locale correto (Brasil)' },
    ],
    promptSnippet:
      'Os acentos estão aparecendo como caracteres estranhos (encoding). Corrija para que acentos, cedilhas e caracteres especiais funcionem corretamente. Adicione charset UTF-8 e encodeURIComponent onde necessário. Aqui está o código:\n\n[cole o código]',
    promptLabel: 'Prompt para corrigir encoding',
  },
  {
    id: 'corrigir-sem-quebrar',
    title: 'Como pedir para a IA corrigir sem quebrar o resto',
    icon: Wrench,
    description:
      'O maior medo de quem não programa: pedir uma correção e a IA quebrar o que estava funcionando. Com a abordagem certa, isso raramente acontece.',
    solutions: [
      { step: 'Cole SEMPRE o código completo e atualizado antes de pedir qualquer mudança' },
      { step: 'Descreva o problema específico de forma clara e objetiva' },
      { step: 'Use a frase mágica: "não mude nada além do que estou pedindo"' },
      { step: 'Peça para a IA explicar o que vai mudar antes de fornecer o código' },
      { step: 'Teste imediatamente após cada mudança — não acumule alterações' },
      { step: 'Mantenha backups do código que funciona (copie e cole em um arquivo)' },
    ],
    promptSnippet:
      'Aqui está meu código que está funcionando:\n\n[cole o código completo]\n\nO problema é: [descreva especificamente o que está errado]\n\nPor favor, corrija APENAS o problema descrito. NÃO mude nada além do que estou pedindo. Me devolva o código completo atualizado e explique o que mudou.',
    promptLabel: 'Prompt de manutenção seguro',
  },
]

/* ─── Accordion Item Component ─── */
function ProblemAccordionItem({
  problem,
  index,
}: {
  problem: ProblemData
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(problem.promptSnippet)
    setCopied(true)
    toast.success('Prompt copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="bg-surface border-white/[0.06] hover:border-coral/20 transition-all duration-300">
        <CardContent className="p-0">
          {/* Header - clickable */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center gap-4 p-5 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-coral/10 border border-coral/20 flex items-center justify-center shrink-0 group-hover:bg-coral/15 transition-colors">
              <problem.icon className="size-5 text-coral" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-coral transition-colors">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-lavender line-clamp-1 mt-0.5">
                {problem.description}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronDown className="size-5 text-muted-lavender" />
            </motion.div>
          </button>

          {/* Expandable Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-muted-lavender leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Solutions */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <RefreshCw className="size-4 text-lime" />
                      Solução passo a passo
                    </h4>
                    <ol className="space-y-2">
                      {problem.solutions.map((sol, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-lavender"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lime/10 text-lime text-xs flex items-center justify-center font-medium mt-0.5">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{sol.step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Prompt Snippet */}
                  <div className="rounded-lg bg-navy border border-white/[0.06] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Terminal className="size-3.5 text-coral" />
                        <span className="text-xs font-medium text-coral">
                          {problem.promptLabel}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyPrompt}
                        className="h-7 px-2.5 text-xs text-muted-lavender hover:text-lime cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3 mr-1" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 mr-1" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 text-xs text-muted-lavender whitespace-pre-wrap leading-relaxed font-mono">
                      {problem.promptSnippet}
                    </pre>
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
export default function ManutencaoSocorro() {
  return (
    <section id="socorro" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-coral/10 text-coral border-coral/20 mb-4" variant="outline">
            <AlertTriangle className="size-3.5 mr-1.5" />
            Socorro!
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Manutenção e <span className="text-coral">Socorro</span>
          </h2>
          <p className="mt-3 text-muted-lavender max-w-2xl mx-auto">
            Deu algo errado? Calma, é normal! Toda ferramenta precisa de ajustes.
            Veja os problemas mais comuns e como resolvê-los — com prompts prontos para pedir ajuda à IA.
          </p>
        </motion.div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {problems.map((problem, index) => (
            <ProblemAccordionItem
              key={problem.id}
              problem={problem}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
