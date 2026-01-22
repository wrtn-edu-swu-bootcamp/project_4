/**
 * Background Service Worker
 * 확장 프로그램 설치, 업데이트 및 전역 상태 관리
 */

import { initDB, saveTerms } from '../utils/storage.js';
import { info } from '../utils/logger.js';

/**
 * 설치 이벤트
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  info('Extension installed:', details.reason);

  if (details.reason === 'install') {
    // 첫 설치 시
    await handleFirstInstall();
  } else if (details.reason === 'update') {
    // 업데이트 시
    info('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

/**
 * 첫 설치 처리
 */
async function handleFirstInstall() {
  try {
    // IndexedDB 초기화
    await initDB();
    info('IndexedDB initialized');

    // 용어 데이터 로드 (실제로는 JSON 파일에서 읽어옴)
    await loadTermsData();

    // 온보딩 페이지 열기
    chrome.tabs.create({
      url: chrome.runtime.getURL('src/onboarding/onboarding.html'),
    });
  } catch (error) {
    console.error('Failed to handle first install:', error);
  }
}

/**
 * 용어 데이터 로드
 */
async function loadTermsData() {
  // TODO: 실제 JSON 파일에서 읽어오기
  // 현재는 샘플 데이터로 대체
  const sampleTerms = [
    {
      id: 'term-001',
      name: '복리',
      category: '금리 관련',
      aliases: ['복리식', '복리 방식'],
      description: '이자에도 이자가 붙는 방식이에요. 마치 눈덩이가 굴러가면서 점점 커지는 것처럼, 시간이 지날수록 받는 이자가 점점 많아집니다.',
      example: '100만원을 연 3% 복리로 2년간 예금한다면:\n- 1년 후: 100만원 + 3만원(이자) = 103만원\n- 2년 후: 103만원 + 3만 900원(이자) = 106만 900원',
      importance: '같은 금리라도 복리로 계산하면 단리보다 수익이 많아요. 장기 예금일수록 복리 상품을 선택하는 것이 유리합니다.',
      relatedTerms: ['단리', '연이율', '만기일시지급식'],
    },
  ];

  await saveTerms(sampleTerms);
  info('Sample terms loaded');
}

/**
 * 메시지 수신
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getExtensionStatus') {
    chrome.storage.sync.get(['isEnabled'], (result) => {
      sendResponse({ enabled: result.isEnabled !== false });
    });
    return true; // 비동기 응답
  }
});

/**
 * 아이콘 클릭 이벤트
 */
chrome.action.onClicked.addListener((tab) => {
  // popup.html이 설정되어 있으므로 자동으로 팝업 표시됨
  info('Extension icon clicked');
});
