import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      nesting: true,
    }),
    react(),
  ],
  vite: {
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: [__dirname, path.join(__dirname, '../../common/temp/node_modules')],
      },
    },
  },
});
