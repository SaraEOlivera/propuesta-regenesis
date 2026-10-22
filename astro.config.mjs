// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site (repository: SaraEOlivera/propuesta-regenesis)
// Final URL: https://saraeolivera.github.io/propuesta-regenesis/
const base = "/propuesta-regenesis";

// https://astro.build/config
export default defineConfig({
  site: "https://saraeolivera.github.io",
  base,
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true, port: 4321 },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
