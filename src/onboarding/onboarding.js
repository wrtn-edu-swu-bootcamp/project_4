/**
 * Onboarding Script
 * 첫 설치 시 온보딩 프로세스
 */

import { saveSettings } from '../utils/storage.js';

let currentPage = 1;

// DOM 요소
const pages = document.querySelectorAll('.onboarding-page');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const backBtn1 = document.getElementById('backBtn1');
const backBtn2 = document.getElementById('backBtn2');
const startBtn = document.getElementById('startBtn');
const agreeTerms = document.getElementById('agreeTerms');
const agreePrivacy = document.getElementById('agreePrivacy');
const allowAnalytics = document.getElementById('allowAnalytics');

/**
 * 초기화
 */
function init() {
  // 이벤트 리스너
  nextBtn1.addEventListener('click', () => goToPage(2));
  nextBtn2.addEventListener('click', () => goToPage(3));
  backBtn1.addEventListener('click', () => goToPage(1));
  backBtn2.addEventListener('click', () => goToPage(2));
  startBtn.addEventListener('click', handleStart);

  // 동의 체크박스 변경 감지
  agreeTerms.addEventListener('change', updateStartButton);
  agreePrivacy.addEventListener('change', updateStartButton);
}

/**
 * 페이지 이동
 */
function goToPage(pageNumber) {
  pages.forEach((page) => {
    page.classList.remove('active');
  });

  const targetPage = document.querySelector(`[data-page="${pageNumber}"]`);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageNumber;
  }

  // 프로그레스 dots 업데이트
  updateProgressDots();
}

/**
 * 프로그레스 dots 업데이트
 */
function updateProgressDots() {
  const allDots = document.querySelectorAll('.progress-dots .dot');
  allDots.forEach((dot, index) => {
    if (index < currentPage) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/**
 * 시작하기 버튼 활성화 상태 업데이트
 */
function updateStartButton() {
  const canStart = agreeTerms.checked && agreePrivacy.checked;
  startBtn.disabled = !canStart;
}

/**
 * 시작하기
 */
async function handleStart() {
  try {
    // 설정 저장
    await saveSettings({
      isEnabled: true,
      selectionMethod: 'both',
      popupPosition: 'auto',
      popupSize: 'medium',
      hoverPreviewEnabled: false,
      allowAnalytics: allowAnalytics.checked,
    });

    // 온보딩 완료 플래그 저장
    await chrome.storage.sync.set({ onboardingCompleted: true });

    // 성공 메시지
    alert('설정이 완료되었습니다!\n금융 사이트에서 용어를 선택해보세요.');

    // 탭 닫기
    window.close();
  } catch (error) {
    console.error('Failed to complete onboarding:', error);
    alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
  }
}

// 초기화 실행
init();
