/**
 * Background Service Worker
 * 확장 프로그램 설치, 업데이트 및 전역 상태 관리
 */

import { info } from '../utils/logger.js';

/**
 * 설치 이벤트
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  info('Extension installed:', details.reason);

  if (details.reason === 'install') {
    // 첫 설치 시
    handleFirstInstall();
  } else if (details.reason === 'update') {
    // 업데이트 시
    info('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

/**
 * 첫 설치 처리
 */
function handleFirstInstall() {
  try {
    // MVP: 용어 데이터는 확장 프로그램에 내장된 정적 JSON 파일 사용
    // 별도 초기화 불필요
    info('Terms data ready (embedded JSON)');

    // 온보딩 페이지 열기
    // chrome.tabs.create({
    //   url: chrome.runtime.getURL('src/onboarding/onboarding.html'),
    // });
  } catch (error) {
    console.error('Failed to handle first install:', error);
  }
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
