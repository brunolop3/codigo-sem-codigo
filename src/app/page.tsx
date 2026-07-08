import dynamic from 'next/dynamic'
import Hero from '@/components/sections/hero'
import Navigation from '@/components/sections/navigation'
import GuideIntro from '@/components/sections/guide-intro'
import PrinciplesSection from '@/components/sections/principles-section'
import Teste5Minutos from '@/components/sections/teste-5-minutos'
import ReadingProgress from '@/components/sections/reading-progress'
import FloatingNav from '@/components/sections/floating-nav'
import TrilhaJornada from '@/components/sections/trilha-jornada'
import SectionDivider from '@/components/sections/section-divider'
import Footer from '@/components/sections/footer'
import ScrollToTop from '@/components/sections/scroll-to-top'
import AtalhosTeclado from '@/components/sections/atalhos-teclado'
import OnboardingTour from '@/components/sections/onboarding-tour'
import AchievementBadges from '@/components/sections/achievement-badges'

/* ─── Dynamic imports para seções pesadas abaixo da dobra ───
 * Reduzem o bundle inicial e melhoram o tempo de carregamento.
 * Cada seção carrega sob demanda quando o usuário se aproxima dela.
 *
 * NOTA: NÃO usamos `ssr: false` porque o site usa `output: 'export'`
 * (geração estática). Com export estático, todas as seções são
 * pré-renderizadas no build, e o dynamic import serve apenas para
 * code-splitting (dividir o JS em chunks menores).
 */
const DomandoTabelas = dynamic(() => import('@/components/sections/domando-tabelas'), { loading: () => <SectionSkeleton /> })
const Padronizacao = dynamic(() => import('@/components/sections/padronizacao'), { loading: () => <SectionSkeleton /> })
const FormSheetDemo = dynamic(() => import('@/components/sections/form-sheet-demo'), { loading: () => <SectionSkeleton /> })
const VisualDictionary = dynamic(() => import('@/components/sections/visual-dictionary'), { loading: () => <SectionSkeleton /> })
const EnadeDashboard = dynamic(() => import('@/components/sections/enade-dashboard'), { loading: () => <SectionSkeleton /> })
const BibliotecaPrompts = dynamic(() => import('@/components/sections/biblioteca-prompts'), { loading: () => <SectionSkeleton /> })
const ConectarSheets = dynamic(() => import('@/components/sections/conectar-sheets'), { loading: () => <SectionSkeleton /> })
const DentroDoGoogle = dynamic(() => import('@/components/sections/dentro-do-google'), { loading: () => <SectionSkeleton /> })
const PublicarFerramenta = dynamic(() => import('@/components/sections/publicar-ferramenta'), { loading: () => <SectionSkeleton /> })
const PerfectPrompt = dynamic(() => import('@/components/sections/perfect-prompt'), { loading: () => <SectionSkeleton /> })
const ComparadorPrompt = dynamic(() => import('@/components/sections/comparador-prompt'), { loading: () => <SectionSkeleton /> })
const PromptBuilder = dynamic(() => import('@/components/sections/prompt-builder'), { loading: () => <SectionSkeleton /> })
const LevelsSection = dynamic(() => import('@/components/sections/levels-section'), { loading: () => <SectionSkeleton /> })
const AiStudioGuide = dynamic(() => import('@/components/sections/ai-studio-guide'), { loading: () => <SectionSkeleton /> })
const BastidoresSection = dynamic(() => import('@/components/sections/bastidores-section'), { loading: () => <SectionSkeleton /> })
const SecuritySection = dynamic(() => import('@/components/sections/security-section'), { loading: () => <SectionSkeleton /> })
const SegurancaLgpd = dynamic(() => import('@/components/sections/seguranca-lgpd'), { loading: () => <SectionSkeleton /> })
const ManutencaoSocorro = dynamic(() => import('@/components/sections/manutencao-socorro'), { loading: () => <SectionSkeleton /> })
const Faq = dynamic(() => import('@/components/sections/faq'), { loading: () => <SectionSkeleton /> })

/** Skeleton placeholder enquanto seções dinâmicas carregam */
function SectionSkeleton() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-white/5 rounded-lg w-1/3 mx-auto" />
        <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="h-32 bg-white/5 rounded-xl" />
          <div className="h-32 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgress />
      <Navigation />
      <FloatingNav />
      <main className="flex-1">
        <Hero />
        <SectionDivider variant="lime" />
        <Teste5Minutos />
        <SectionDivider variant="coral" />
        <GuideIntro />
        <SectionDivider variant="mixed" />
        <PrinciplesSection />
        <SectionDivider variant="coral" />
        <DomandoTabelas />
        <SectionDivider variant="lime" />
        <Padronizacao />
        <SectionDivider variant="mixed" />
        <FormSheetDemo />
        <SectionDivider variant="coral" />
        <VisualDictionary />
        <SectionDivider variant="coral" />
        <EnadeDashboard />
        <SectionDivider variant="mixed" />
        <BibliotecaPrompts />
        <SectionDivider variant="lime" />
        <ConectarSheets />
        <SectionDivider variant="mixed" />
        <DentroDoGoogle />
        <SectionDivider variant="lime" />
        <PublicarFerramenta />
        <SectionDivider variant="coral" />
        <PerfectPrompt />
        <SectionDivider variant="mixed" />
        <ComparadorPrompt />
        <SectionDivider variant="lime" />
        <PromptBuilder />
        <SectionDivider variant="coral" />
        <AiStudioGuide />
        <SectionDivider variant="lime" />
        <LevelsSection />
        <SectionDivider variant="mixed" />
        <BastidoresSection />
        <SectionDivider variant="lime" />
        <SecuritySection />
        <SectionDivider variant="coral" />
        <SegurancaLgpd />
        <SectionDivider variant="mixed" />
        <ManutencaoSocorro />
        <SectionDivider variant="coral" />
        <Faq />
      </main>
      <Footer />
      <ScrollToTop />
      <TrilhaJornada />
      <AtalhosTeclado />
      <OnboardingTour />
      <AchievementBadges />
    </div>
  )
}
