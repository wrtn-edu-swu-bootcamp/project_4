/**
 * 아이콘 PNG 파일 생성 스크립트
 * sharp 라이브러리를 사용하여 SVG를 PNG로 변환
 */

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const sizes = [16, 32, 48, 128];
const outputDir = join(projectRoot, 'assets', 'icons');

// 간단한 아이콘 SVG (원 안에 "용" 글자)
const createIconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="60" fill="#4A5B6C"/>
  <rect x="32" y="28" width="64" height="72" rx="4" fill="#ffffff"/>
  <rect x="40" y="40" width="36" height="4" rx="2" fill="#5C8A95"/>
  <rect x="40" y="52" width="48" height="3" rx="1.5" fill="#D1D4DA"/>
  <rect x="40" y="60" width="44" height="3" rx="1.5" fill="#D1D4DA"/>
  <circle cx="78" cy="82" r="10" fill="none" stroke="#5C8A95" stroke-width="3"/>
  <line x1="85" y1="89" x2="92" y2="96" stroke="#5C8A95" stroke-width="3" stroke-linecap="round"/>
</svg>
`;

async function generateIcons() {
  console.log('아이콘 생성 시작...');
  
  try {
    await mkdir(outputDir, { recursive: true });
    
    for (const size of sizes) {
      const svg = createIconSvg(size);
      const outputPath = join(outputDir, `icon-${size}.png`);
      
      await sharp(Buffer.from(svg))
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ icon-${size}.png 생성 완료`);
    }
    
    console.log('\n모든 아이콘 생성 완료!');
  } catch (error) {
    console.error('아이콘 생성 실패:', error);
    process.exit(1);
  }
}

generateIcons();
