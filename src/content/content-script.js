/**
 * Content Script - 메인 로직
 * 페이지에 주입되어 사용자 텍스트 선택을 감지하고 팝업 표시
 */

import { setupSelectionListeners } from './selection-detector.js';
import { renderTermPopup, renderNoMatchPopup, removePopup } from './popup-renderer.js';
import { findTerm } from '../utils/term-matcher.js';
import { getSetting } from '../utils/storage.js';
import { info, error } from '../utils/logger.js';

let isEnabled = true;

/**
 * 초기화
 */
async function init() {
  info('Financial Terms Extension initialized');

  // 설정 불러오기
  isEnabled = await getSetting('isEnabled');

  if (!isEnabled) {
    info('Extension is disabled');
    return;
  }

  // 선택 리스너 설정
  setupSelectionListeners(handleTextSelection);

  // 설정 변경 감지
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.isEnabled) {
      isEnabled = changes.isEnabled.newValue;
      info('Extension enabled status changed:', isEnabled);
    }
  });
}

/**
 * 텍스트 선택 핸들러
 */
async function handleTextSelection(selection) {
  if (!isEnabled) {
    return;
  }

  const { text, rect } = selection;

  try {
    // 용어 검색
    const term = await findTerm(text);

    if (term) {
      // 용어 팝업 표시
      renderTermPopup(term, rect);
    } else {
      // 미등록 용어 팝업 표시
      renderNoMatchPopup(text, rect);
    }
  } catch (err) {
    error('Failed to handle text selection:', err);
  }
}

/**
 * Background script로부터 메시지 수신
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleExtension') {
    isEnabled = message.enabled;
    info('Extension toggled:', isEnabled);
    
    if (!isEnabled) {
      removePopup();
    }
    
    sendResponse({ success: true });
  }
});

// 초기화 실행
init();
