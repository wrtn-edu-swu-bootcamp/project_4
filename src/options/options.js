/**
 * Options Script
 * 설정 페이지 관리
 */

import { getSettings, saveSettings, getTermsCount } from '../utils/storage.js';

// DOM 요소
const enableService = document.getElementById('enableService');
const selectionMethod = document.getElementById('selectionMethod');
const popupPosition = document.getElementById('popupPosition');
const popupSize = document.getElementById('popupSize');
const hoverPreview = document.getElementById('hoverPreview');
const allowAnalytics = document.getElementById('allowAnalytics');
const clearDataBtn = document.getElementById('clearData');
const termCount = document.getElementById('termCount');
const saveStatus = document.getElementById('saveStatus');

/**
 * 초기화
 */
async function init() {
  // 설정 불러오기
  const settings = await getSettings();
  
  enableService.checked = settings.isEnabled;
  selectionMethod.value = settings.selectionMethod;
  popupPosition.value = settings.popupPosition;
  popupSize.value = settings.popupSize;
  hoverPreview.checked = settings.hoverPreviewEnabled;
  allowAnalytics.checked = settings.allowAnalytics;

  // 용어 수 불러오기 (동기 함수)
  loadTermCount();

  // 이벤트 리스너
  enableService.addEventListener('change', handleSave);
  selectionMethod.addEventListener('change', handleSave);
  popupPosition.addEventListener('change', handleSave);
  popupSize.addEventListener('change', handleSave);
  hoverPreview.addEventListener('change', handleSave);
  allowAnalytics.addEventListener('change', handleSave);
  clearDataBtn.addEventListener('click', handleClearData);
}

/**
 * 설정 저장
 */
async function handleSave() {
  const settings = {
    isEnabled: enableService.checked,
    selectionMethod: selectionMethod.value,
    popupPosition: popupPosition.value,
    popupSize: popupSize.value,
    hoverPreviewEnabled: hoverPreview.checked,
    allowAnalytics: allowAnalytics.checked,
  };

  const success = await saveSettings(settings);
  
  if (success) {
    showSaveStatus('저장되었습니다', 'success');
  } else {
    showSaveStatus('저장 실패', 'error');
  }
}

/**
 * 저장 상태 표시
 */
function showSaveStatus(message, type = 'success') {
  saveStatus.textContent = message;
  saveStatus.className = `save-status ${type}`;
  
  setTimeout(() => {
    saveStatus.textContent = '설정이 자동으로 저장됩니다';
    saveStatus.className = 'save-status';
  }, 2000);
}

/**
 * 용어 수 불러오기
 */
function loadTermCount() {
  try {
    const count = getTermsCount();
    termCount.textContent = `${count}개`;
  } catch (error) {
    console.error('Failed to load term count:', error);
    termCount.textContent = '불러오기 실패';
  }
}

/**
 * 데이터 삭제
 */
async function handleClearData() {
  if (!confirm('모든 설정과 비교 메모를 삭제하시겠습니까?\n용어 사전은 유지됩니다.')) {
    return;
  }

  try {
    // Chrome Storage 초기화
    await chrome.storage.sync.clear();
    
    // localStorage 초기화
    localStorage.clear();
    
    alert('데이터가 삭제되었습니다. 페이지를 새로고침합니다.');
    location.reload();
  } catch (error) {
    console.error('Failed to clear data:', error);
    alert('데이터 삭제에 실패했습니다.');
  }
}

// 초기화 실행
init();
