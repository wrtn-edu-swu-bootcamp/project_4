/**
 * Chrome Extension 빌드 스크립트
 * Content script를 단일 IIFE 파일로 번들링
 */

import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, mkdirSync, existsSync, readdirSync, cpSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

async function buildExtension() {
  console.log('🔨 Chrome Extension 빌드 시작...\n');

  // 1. Content Script 빌드 (IIFE 형식, 단일 파일)
  console.log('1️⃣ Content Script 빌드 중...');
  await build({
    configFile: false,
    root: projectRoot,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: resolve(projectRoot, 'src/content/content-script.js'),
        name: 'FinancialTermsContent',
        formats: ['iife'],
        fileName: () => 'src/content/content-script.js',
      },
      rollupOptions: {
        output: {
          // 모든 코드를 인라인으로
          inlineDynamicImports: true,
        },
      },
      minify: 'terser',
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src'),
      },
    },
  });
  console.log('   ✅ Content Script 빌드 완료\n');

  // 2. Background Service Worker 빌드 (ES Module)
  console.log('2️⃣ Background Service Worker 빌드 중...');
  await build({
    configFile: false,
    root: projectRoot,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      lib: {
        entry: resolve(projectRoot, 'src/background/service-worker.js'),
        formats: ['es'],
        fileName: () => 'src/background/service-worker.js',
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      minify: 'terser',
      sourcemap: false,
    },
  });
  console.log('   ✅ Service Worker 빌드 완료\n');

  // 3. Popup HTML 빌드 (MVP: Options, Onboarding 제외)
  console.log('3️⃣ Popup UI 빌드 중...');
  await build({
    configFile: false,
    root: projectRoot,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      rollupOptions: {
        input: {
          popup: resolve(projectRoot, 'src/popup/popup.html'),
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'src/[name][extname]',
        },
      },
      minify: 'terser',
      sourcemap: false,
    },
  });
  console.log('   ✅ Popup UI 빌드 완료\n');

  // 4. 정적 파일 복사
  console.log('4️⃣ 정적 파일 복사 중...');
  
  const distDir = resolve(projectRoot, 'dist');
  
  // manifest.json 복사
  copyFileSync(
    resolve(projectRoot, 'manifest.json'),
    resolve(distDir, 'manifest.json')
  );
  console.log('   ✅ manifest.json 복사');

  // 아이콘 복사
  const iconsDir = resolve(distDir, 'assets', 'icons');
  mkdirSync(iconsDir, { recursive: true });
  const srcIconsDir = resolve(projectRoot, 'assets', 'icons');
  for (const file of readdirSync(srcIconsDir)) {
    if (file.endsWith('.png')) {
      copyFileSync(
        resolve(srcIconsDir, file),
        resolve(iconsDir, file)
      );
    }
  }
  console.log('   ✅ 아이콘 복사');

  // 용어 데이터 복사
  const termsDistDir = resolve(distDir, 'src', 'data', 'terms');
  mkdirSync(termsDistDir, { recursive: true });
  const termsSrcDir = resolve(projectRoot, 'src', 'data', 'terms');
  for (const file of readdirSync(termsSrcDir)) {
    if (file.endsWith('.json')) {
      copyFileSync(
        resolve(termsSrcDir, file),
        resolve(termsDistDir, file)
      );
    }
  }
  console.log('   ✅ 용어 데이터 복사');

  // content-style.css 복사
  const contentDir = resolve(distDir, 'src', 'content');
  mkdirSync(contentDir, { recursive: true });
  copyFileSync(
    resolve(projectRoot, 'src', 'content', 'content-style.css'),
    resolve(contentDir, 'content-style.css')
  );
  console.log('   ✅ content-style.css 복사');

  console.log('\n✨ 빌드 완료! dist/ 폴더를 Chrome에 로드하세요.');
  console.log('   chrome://extensions → 개발자 모드 → 압축해제된 확장 프로그램 로드\n');
}

buildExtension().catch((err) => {
  console.error('빌드 실패:', err);
  process.exit(1);
});
