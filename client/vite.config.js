import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const cdnUrl = env.VITE_CDN_URL || '';
  const normalizedCdnUrl = cdnUrl.endsWith('/') ? cdnUrl : `${cdnUrl}/`;

  return {
    plugins: [react()],

    base: cdnUrl ? normalizedCdnUrl : '/',

    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'staging.rurikcode.ru',
        'rurikcode.ru',
      ],
    },
  };
});