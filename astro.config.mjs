// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

const site = process.env.PUBLIC_SITE_URL || 'https://example.gitlab.io/da-studio/';
const base = process.env.PUBLIC_BASE_PATH || '/';
const cacheDir = process.env.PUBLIC_ASTRO_CACHE_DIR || './node_modules/.astro';

export default defineConfig({
  site,
  base,
  cacheDir,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), mdx()],
  vite: {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '1.0.0'),
    },
  },
});
