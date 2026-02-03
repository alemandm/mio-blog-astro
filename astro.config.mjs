import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // output: 'hybrid' is deprecated, 'static' is default and supports SSR with adapter
  adapter: vercel(),
  integrations: [
    keystatic(),
    markdoc(),
    tailwind(),
    react()
  ]
});
