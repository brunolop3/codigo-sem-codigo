import type { NextConfig } from "next";

/* ─── Configuração para site estático ───
 * O site "Código sem Código" é 100% conteúdo + interatividade client-side.
 * Não há servidor, banco de dados ou runtime próprio — apenas HTML/CSS/JS estáticos.
 * `output: 'export'` faz `next build` gerar a pasta out/ com arquivos estáticos.
 * `images.unoptimized` é necessário porque não há servidor para otimizar imagens.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
