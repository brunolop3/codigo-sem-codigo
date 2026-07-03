/* ─── Tipos para os dados de conteúdo do site ───
 * Estes tipos garantem que os JSONs de conteúdo
 * tenham a estrutura correta, permitindo que
 * qualquer servidor da UEMS edite o conteúdo
 * sem precisar entender TypeScript.
 */

/** Prompt da biblioteca de prompts */
export interface PromptItem {
  id: string
  titulo: string
  categoria: 'Formulários/Cadastro' | 'Visualização de Tabelas' | 'Calculadoras/Lógica' | 'Documentos/Padronização'
  nivel: 1 | 2 | 3
  descricao: string
  casoDeUso: string
  prompt: string
}

/** Pergunta do FAQ */
export interface FaqItem {
  id: string
  question: string
  answer: string
  categoria: 'geral' | 'tecnico' | 'seguranca'
}

/** Termo do Dicionário Visual */
export interface DicionarioItem {
  termo: string
  definicao: string
  exemplo?: string
}

/** Ideia de uso */
export interface IdeiaItem {
  titulo: string
  subtitulo: string
  descricao: string
  cor: 'lime' | 'coral'
  prompt: string
}

/** Regra de padronização */
export interface RegraPadronizacao {
  numero: number
  regra: string
  explicacao: string
  exemploCerto: string
  exemploErrado: string
}
