/**
 * Popup Script
 * 툴바 아이콘 클릭 시 표시되는 팝업
 */

import { getSettings, saveSetting } from '../utils/storage.js';
import { getAllTerms } from '../utils/storage.js';

// DOM 요소
const enableToggle = document.getElementById('enableToggle');
const statusText = document.getElementById('statusText');
const termCount = document.getElementById('termCount');
const todayCount = document.getElementById('todayCount');
const settingsBtn = document.getElementById('settingsBtn');
const helpBtn = document.getElementById('helpBtn');

/**
 * 초기화
 */
async function init() {
  // 설정 불러오기
  const settings = await getSettings();
  enableToggle.checked = settings.isEnabled;
  updateStatusText(settings.isEnabled);

  // 통계 불러오기
  await loadStats();

  // 이벤트 리스너
  enableToggle.addEventListener('change', handleToggle);
  settingsBtn.addEventListener('click', openSettings);
  helpBtn.addEventListener('click', openHelp);
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
async function loadStats() {
  try {
    // 등록된 용어 수
    const terms = await getAllTerms();
    termCount.textContent = `${terms.length}개`;

    // 오늘 조회 수 (localStorage 사용)
    const today = new Date().toDateString();
    const statsKey = `stats_${today}`;
    const todayStats = localStorage.getItem(statsKey);
    todayCount.textContent = `${todayStats || 0}회`;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

/**
 * 설정 페이지 열기
 */
function openSettings() {
  chrome.runtime.openOptionsPage();
}

/**
 * 도움말 열기
 */
function openHelp() {
  chrome.tabs.create({
    url: 'https://github.com/judy0/financial-terms-extension',
  });
}

// 초기화 실행
init();
