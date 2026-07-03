import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-surface/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-lime flex items-center justify-center">
              <Zap className="size-3.5 text-navy" />
            </div>
            <span className="font-semibold text-sm">
              Código<span className="text-lime">semCódigo</span>
            </span>
          </div>
          <p className="text-xs text-muted-lavender text-center">
            Guia prático para servidores UEMS — Pró-Reitoria de Ensino. Feito com IA, para criar com IA.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-lavender">
            <a href="#guide" className="hover:text-foreground transition-colors">Guia</a>
            <a href="#ideas" className="hover:text-foreground transition-colors">Ideias</a>
            <a href="#seguranca" className="hover:text-foreground transition-colors">Segurança</a>
            <a href="mailto:bruno.lopes@uems.br" className="hover:text-lime transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
