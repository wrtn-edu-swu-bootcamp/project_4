/**
 * Popup Script
 * 툴바 아이콘 클릭 시 표시되는 팝업 (MVP 버전)
 */

import { getSettings, saveSetting, getTermsCount } from '../utils/storage.js';

// DOM 요소
const enableToggle = document.getElementById('enableToggle');
const statusText = document.getElementById('statusText');
const termCount = document.getElementById('termCount');

/**
 * 초기화
 */
async function init() {
  // 설정 불러오기
  const settings = await getSettings();
  enableToggle.checked = settings.isEnabled;
  updateStatusText(settings.isEnabled);

  // 통계 불러오기
  loadStats();

  // 이벤트 리스너
  enableToggle.addEventListener('change', handleToggle);
}

/**
 * ON/OFF 토글
 */
async function handleToggle() {
  const isEnabled = enableToggle.checked;
  await saveSetting('isEnabled', isEnabled);
  updateStatusText(isEnabled);

  // 모든 탭의 content script에 메시지 전송
  const tabs = await chrome.tabs.query({});
  tabs.forEach((tab) => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'toggleExtension',
      enabled: isEnabled,
    }).catch(() => {
      // Content script가 없는 탭은 무시
    });
  });
}

/**
 * 상태 텍스트 업데이트
 */
function updateStatusText(isEnabled) {
  statusText.textContent = isEnabled ? '활성' : '비활성';
  statusText.className = `status-text ${isEnabled ? 'active' : 'inactive'}`;
}

/**
 * 통계 불러오기
 */
function loadStats() {
  try {
    // 등록된 용어 수
    const count = getTermsCount();
    termCount.textContent = `${count}개`;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// 초기화 실행
init();
