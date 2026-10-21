// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site (repository: SaraEOlivera/propuesta-regenesis)
  // Final URL: https://saraeolivera.github.io/propuesta-regenesis/
  site: 'https://saraeolivera.github.io',
  base: '/propuesta-regenesis',
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true, port: 4321 },
});
