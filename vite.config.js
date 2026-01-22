import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        // manifest.json 복사
        {
          src: 'manifest.json',
          dest: '.',
        },
        // 아이콘 복사
        {
          src: 'assets/icons/*.png',
          dest: 'assets/icons',
        },
        // 용어 데이터 JSON 복사
        {
          src: 'src/data/terms/*.json',
          dest: 'src/data/terms',
        },
        // content-style.css 복사
        {
          src: 'src/content/content-style.css',
          dest: 'src/content',
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Content Script
        'content-script': resolve(__dirname, 'src/content/content-script.js'),
        // Background Service Worker
        'service-worker': resolve(__dirname, 'src/background/service-worker.js'),
        // Popup
        popup: resolve(__dirname, 'src/popup/popup.html'),
        // Options
        options: resolve(__dirname, 'src/options/options.html'),
        // Onboarding
        onboarding: resolve(__dirname, 'src/onboarding/onboarding.html'),
      },
      output: {
        // Content script는 IIFE 형식으로 (ES module이 아님)
        format: 'es',
        // 코드 스플리팅 비활성화 - 모든 코드를 하나의 파일로
        manualChunks: undefined,
        inlineDynamicImports: false,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content-script') {
            return 'src/content/content-script.js';
          }
          if (chunkInfo.name === 'service-worker') {
            return 'src/background/service-worker.js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'src/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
