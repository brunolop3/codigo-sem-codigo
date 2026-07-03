# HANDOVER — Código sem Código

> Guia prático para servidores UEMS criarem ferramentas web com IA — sem saber programar.

---

## Visão Geral e Decisão Arquitetural

### Por que site estático, sem servidor e sem banco?

O site **Código sem Código** é 100% conteúdo educacional + interatividade client-side. Não há:

- **Servidor**: nenhuma API, nenhum server-side rendering dinâmico, nenhuma sessão
- **Banco de dados**: sem Prisma, sem SQLite, sem qualquer persistência no servidor
- **Runtime próprio**: o `next build` gera a pasta `out/` com HTML/CSS/JS estáticos

**Por quê?** Porque o público-alvo (servidores públicos da UEMS, sem formação em programação) precisa de um site que:

1. Funcione como documentação — sempre acessível, sem depender de infraestrutura
2. Seja publicável em qualquer host estático (GitHub Pages, Google Sites, Netlify)
3. Não tenha custos de servidor nem manutenção de infraestrutura
4. Demonstre na prática o que ensina: que ferramentas web podem ser simples

### Stack Técnica

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Framework | Next.js 16 (App Router) | Geração estática (`output: 'export'`) |
| Linguagem | TypeScript 5 | Segurança de tipos |
| Estilo | Tailwind CSS 4 | Utilitários, dark theme |
| Componentes | shadcn/ui (New York) | Biblioteca acessível e customizável |
| Animações | framer-motion | Transições suaves |
| Notificações | Sonner | Toasts elegantes |
| Gráficos | Recharts | Visualizações de dados |
| Estado client | localStorage | Persistência sem servidor |

---

## Mapa de Seções e Componentes

```
src/app/page.tsx                          ← Composição principal (dynamic imports)
src/components/sections/
├── hero.tsx                              ← Hero principal
├── navigation.tsx                        ← Barra de navegação + BuscaGlobal
├── teste-5-minutos.tsx                   ← Vitória rápida
├── guide-intro.tsx                       ← Introdução ao guia
├── principles-section.tsx                ← 4 princípios de bom prompt
├── domando-tabelas.tsx                   ← ★ Seção central + Mesa de Visualização
├── padronizacao.tsx                      ← 10 regras de ouro
├── form-sheet-demo.tsx                   ← Demo de formulário
├── visual-dictionary.tsx                 ← Dicionário visual interativo
├── enade-dashboard.tsx                   ← Dashboard exemplo
├── biblioteca-prompts.tsx                ← Biblioteca de prompts
├── conectar-sheets.tsx                   ← Tutorial Apps Script (ponte)
├── dentro-do-google.tsx                  ← ★ Modo 100% Google (HTML Service)
├── publicar-ferramenta.tsx               ← 3 opções de hospedagem
├── perfect-prompt.tsx                    ← Prompt perfeito
├── comparador-prompt.tsx                 ← Antes/Depois de prompts
├── prompt-builder.tsx                    ← ★ Construtor 2.0 (wizard 4 etapas)
├── levels-section.tsx                    ← Níveis de aprendizado
├── bastidores-section.tsx                ← Dificuldades com IAs
├── security-section.tsx                  ← Segurança básica
├── seguranca-lgpd.tsx                    ← LGPD para servidores
├── manutencao-socorro.tsx                ← Troubleshooting
├── faq.tsx                               ← Perguntas frequentes
├── floating-nav.tsx                      ← Navegação flutuante lateral
├── reading-progress.tsx                  ← Barra de progresso de leitura
├── trilha-jornada.tsx                    ← Trilha de progresso do leitor
├── busca-global.tsx                      ← Busca Ctrl+K
├── section-divider.tsx                   ← Divisor entre seções
├── footer.tsx                            ← Rodapé
└── scroll-to-top.tsx                     ← Botão voltar ao topo

src/content/                              ← DADOS EDITÁVEIS (JSON)
├── types.ts                              ← Interfaces TypeScript
├── prompts.json                          ← Biblioteca de prompts
├── faq.json                              ← Perguntas do FAQ
├── regras-padronizacao.json              ← 10 regras de padronização
├── dicionario.json                       ← Termos do dicionário visual
└── ideias.json                           ← Cards de ideias

src/components/ui/                        ← Componentes base shadcn/ui
├── badge.tsx
├── button.tsx
├── card.tsx
├── chart.tsx
├── command.tsx
├── dialog.tsx
├── sonner.tsx
└── tabs.tsx
```

---

## COMO EDITAR CONTEÚDO SEM PROGRAMAR

### Adicionar um prompt na Biblioteca

1. Abra `src/content/prompts.json`
2. Copie um bloco existente e cole no final do array (antes do `]` de fechamento)
3. Preencha os campos:

```json
{
  "id": "meu-novo-prompt",
  "titulo": "Nome do Prompt",
  "categoria": "Formulários/Cadastro",
  "nivel": 1,
  "descricao": "O que este prompt faz em uma frase",
  "casoDeUso": "Exemplo real na UEMS: setor X usa para Y",
  "prompt": "O texto completo do prompt que o usuário vai copiar..."
}
```

**Categorias disponíveis**: `"Formulários/Cadastro"`, `"Visualização de Tabelas"`, `"Calculadoras/Lógica"`, `"Documentos/Padronização"`

**Níveis**: `1` (iniciante), `2` (intermediário), `3` (avançado)

4. Salve o arquivo. O site atualiza automaticamente no `bun run dev`.

### Adicionar uma pergunta no FAQ

1. Abra `src/content/faq.json`
2. Copie um bloco existente e cole no final do array
3. Preencha:

```json
{
  "id": "minha-pergunta",
  "question": "Pergunta aqui?",
  "answer": "Resposta detalhada aqui. Pode ser longa.",
  "categoria": "geral"
}
```

**Categorias**: `"geral"`, `"tecnico"`, `"seguranca"`

### Adicionar uma regra de padronização

1. Abra `src/content/regras-padronizacao.json`
2. Copie um bloco existente e cole no final do array
3. Preencha:

```json
{
  "numero": 11,
  "regra": "Título da regra",
  "explicacao": "Por que esta regra é importante e o que acontece se não for seguida.",
  "exemploCerto": "Como deve ser (exemplo concreto)",
  "exemploErrado": "Como NÃO deve ser (exemplo concreto)"
}
```

### Adicionar um termo no Dicionário Visual

1. Abra `src/content/dicionario.json`
2. Copie um bloco existente e cole no final do array
3. Preencha:

```json
{
  "termo": "Nome do Termo",
  "definicao": "Explicação do termo em linguagem simples.",
  "exemplo": "Prompt de exemplo que usa este conceito (opcional)"
}
```

### Adicionar uma ideia

1. Abra `src/content/ideias.json`
2. Copie um bloco existente e cole no final do array
3. Preencha:

```json
{
  "titulo": "Nome da Ideia",
  "subtitulo": "Breve descrição",
  "descricao": "Explicação detalhada de como esta ferramenta pode ser usada na UEMS.",
  "cor": "lime",
  "prompt": "Prompt completo para gerar esta ferramenta..."
}
```

**Cores**: `"lime"` ou `"coral"`

---

## Como Trocar o Dataset Demo

O dataset da Mesa de Visualização está em `src/components/sections/domando-tabelas.tsx`, na função `generateDemoData()`. Para trocar:

1. Localize a função `generateDemoData()` no arquivo
2. Altere os arrays `cursos`, `unidades` e a lógica de geração
3. Mantenha a interface `MesaRow` com os mesmos campos: `curso`, `unidade`, `codigo`, `grau`, `conceito`, `ano`
4. Se precisar de campos diferentes, atualize também a interface `MesaRow` e os cabeçalhos da tabela

---

## Como Rodar Localmente

### Pré-requisitos
- [Bun](https://bun.sh/) instalado (ou Node.js 18+)

### Instalação e desenvolvimento

```bash
# Instalar dependências
bun install

# Rodar em modo desenvolvimento (http://localhost:3000)
bun run dev

# Verificar qualidade do código
bun run lint

# Gerar build estático (pasta out/)
bun run build
```

---

## Como Publicar no GitHub Pages

### Passo a passo completo

1. **Crie um repositório no GitHub** (ex: `codigo-sem-codigo`)

2. **Inicialize o git e faça o primeiro push:**
```bash
cd /home/z/my-project
git init
git add .
git commit -m "Primeiro commit: site Código sem Código"
git remote add origin https://github.com/SEU-USUARIO/codigo-sem-codigo.git
git branch -M main
git push -u origin main
```

3. **Gere o build estático:**
```bash
bun run build
```
Isso cria a pasta `out/` com todos os arquivos HTML/CSS/JS.

4. **Configure o GitHub Pages:**
   - Vá em Settings → Pages
   - Source: "GitHub Actions"
   - Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

5. **Push e aguarde o deploy:**
```bash
git add .
git commit -m "Adicionar GitHub Actions para deploy"
git push
```

6. **Acesse o site** em `https://SEU-USUARIO.github.io/codigo-sem-codigo/`

### Publicar no Google Sites

1. Rode `bun run build`
2. No Google Sites, insira o HTML como "Incorporar" (Embed)
3. Ou hospede a pasta `out/` no Google Cloud Storage

### Publicar no Moodle/Intranet

1. Rode `bun run build`
2. Compacte a pasta `out/` como ZIP
3. Faça upload no Moodle como recurso "Página" ou "Arquivo"

---

## Notas de Manutenção

- **Nunca** adicione servidor, banco de dados ou API ao projeto — contradiz o que o site ensina
- **Sempre** que adicionar conteúdo, edite os JSONs em `src/content/` — nunca os componentes .tsx
- **Sempre** rode `bun run lint` antes de commitar
- Os componentes em `src/components/ui/` são da biblioteca shadcn/ui — não edite diretamente
- As seções em `src/components/sections/` usam framer-motion para animações — mantenha-as sutis
- O tema é dark por padrão (classe `dark` no `<html>`) com paleta lime/navy/coral
- **Tema claro/escuro**: O toggle fica na barra de navegação (ícone Sol/Lua). A preferência é salva em `localStorage` com a chave `csc-theme`. Para adicionar suporte a light mode em novos componentes, use `html:not(.dark)` no CSS
- **WhatsApp**: O botão "Compartilhar" na seção Teste 5 Minutos abre o WhatsApp com mensagem pré-preenchida
- **Scroll-to-top**: Botão circular com indicador de progresso de leitura (anel SVG animado)
- **Busca global**: Ctrl+K abre o modal de busca (usa shadcn Command)
- **Atalhos de teclado**: Pressione `?` para ver todos os atalhos disponíveis
- **Trilha de Jornada**: Progresso persistido em `localStorage` com a chave `csc-jornada-progresso`

## Classes CSS Utilitárias Disponíveis

| Classe | Efeito |
|--------|--------|
| `glow-lime` | Box-shadow verde-limão |
| `glow-coral` | Box-shadow coral |
| `text-glow-lime` | Text-shadow verde-limão |
| `glass` | Glassmorphism sutil |
| `glass-strong` | Glassmorphism forte |
| `bg-gradient-mesh` | Gradiente radial decorativo |
| `bg-gradient-aurora` | Gradiente aurora |
| `noise-overlay` | Textura de ruído sutil |
| `pattern-card` | Hover com translateY e shadow |
| `card-lift` | Hover lift suave |
| `border-glow` | Borda animada com gradiente no hover |
| `animate-shimmer` | Efeito shimmer (brilho deslizante) |
| `animate-float` | Flutuação suave |
| `hover-bounce` | Bounce sutil no hover |
| `text-gradient-lime` | Texto com gradiente verde-limão |
| `text-gradient-coral` | Texto com gradiente coral |
| `focus-ring` | Outline de foco acessível |
| `animate-pulse-lime` | Pulso verde-limão |
| `animate-next-pulse` | Pulso para botão "Próximo" |

---

## Atualizações — Rodada CRON-REVIEW-2

### Novas Funcionalidades Adicionadas

#### 1. Favoritos / Marcador de Prompts
- **Onde**: Biblioteca de Prompts (`#biblioteca`)
- **Como usar**: Clique no ícone de marca-página (canto superior direito de cada card) para favoritar. Clique no botão "Favoritos" na barra de filtro para ver só os favoritos.
- **Persistência**: localStorage chave `csc-prompt-favorites` (array de IDs)
- **Contador**: Badge âmbar no botão "Favoritos" mostra o total
- **Toast feedback**: "Adicionado aos favoritos!" / "Removido dos favoritos"

#### 2. Imprimir / Salvar como PDF
- **Onde**: Botão de impressora na barra de navegação (desktop)
- **Atalho**: Tecla `p` (sem modificadores)
- **CSS otimizado para papel**: fundo branco, texto preto, elementos flutuantes ocultos, URLs visíveis após links externos, quebras de página entre seções

#### 3. Atalhos de Teclado Estendidos
- Total de atalhos: 9 → **16**
- **Novos atalhos de navegação `g + letra`**:
  - `g a` → Tabelas
  - `g p` → Padronização
  - `g r` → Conectar (Sheets)
  - `g d` → Dentro do Google
  - `g s` → Socorro
- **Novo atalho único**: `p` → Imprimir / Salvar PDF

### Melhorias Visuais (VLM-driven)

| Seção | Mudança |
|-------|---------|
| Biblioteca | Subtítulo com maior contraste, hover states reforçados, cards maiores |
| Biblioteca | Card header spacing aumentado (mb-3 → mb-4), ícone ampliado (w-9 → w-10) |
| Biblioteca | Title font-size aumentado (text-sm → text-base) |
| Prompt Builder | Preset selecionado com checkmark animado + ring lime + shadow mais forte |
| Prompt Builder | Preset description mais legível quando selecionado (text-foreground/80) |
| Hero | Subtítulo e tagline com maior contraste (text-foreground/70 e /55) |
| Mesa de Visualização | Subtítulo e label da toggle bar com maior contraste |

### Atalhos de Teclado Completo

| Tecla | Ação |
|-------|------|
| `Ctrl K` / `Cmd K` | Busca global |
| `?` | Mostra dialog de atalhos |
| `p` | Imprimir / Salvar PDF |
| `g u` | Guia |
| `g t` | Teste 5min |
| `g a` | Tabelas |
| `g p` | Padronização |
| `g b` | Biblioteca |
| `g r` | Conectar (Sheets) |
| `g d` | Dentro do Google |
| `g c` | Construtor |
| `g s` | Socorro |
| `g f` | FAQ |
| `Home` | Topo |
| `End` | Final |
| `Esc` | Fechar dialogs |

### Estado Atual do Projeto
- ✅ 21 seções renderizando
- ✅ Lint limpo (zero errors, zero warnings)
- ✅ HTTP 200 consistente
- ✅ VLM scores: 8/10 em todas as seções avaliadas
- ✅ Build estático funcional (`output: 'export'`)
- ✅ Sem servidor, sem banco, sem API
- ✅ Tema claro/escuro funcional
- ✅ 16 atalhos de teclado
- ✅ Print/PDF otimizado
- ✅ Favoritos com persistência

### Próximos Passos Recomendados
1. **Light mode completo**: Adicionar `html:not(.dark)` overrides para `bg-surface`, `text-muted-lavender` em todos os componentes
2. **Copy history**: Últimos 5 prompts copiados acessíveis via BuscaGlobal
3. **Tour guiado**: Onboarding para primeiros visitantes
4. **Refatorar Print CSS**: Migrar de seletores de classe para `data-print-hide` attribute
