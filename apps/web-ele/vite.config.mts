import process from 'node:process';

import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

const target = process.env.VITE_GLOB_API_URL || 'http://localhost:8000/api';

export default defineConfig(async () => {
  return {
    application: { nitroMock: false },
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            target,
            ws: true,
          },
        },
      },
    },
  };
});
