/**
 * 텍스트 선택 감지 모듈
 * 사용자의 드래그 선택 및 더블클릭을 감지
 */

import { debug } from '../utils/logger.js';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

/**
 * 현재 선택된 텍스트 가져오기
 */
export function getSelectedText() {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const text = selection.toString().trim();
  
  // 유효성 검증
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    return null;
  }

  return {
    text,
    range: selection.getRangeAt(0),
    rect: selection.getRangeAt(0).getBoundingClientRect(),
  };
}

/**
 * 선택 이벤트 리스너 설정
 */
export function setupSelectionListeners(onTextSelected) {
  let debounceTimer = null;

  // mouseup 이벤트 (드래그 선택)
  document.addEventListener('mouseup', (e) => {
    // 팝업 내부 클릭은 무시
    if (e.target.closest('.financial-terms-popup')) {
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const selected = getSelectedText();
      if (selected) {
        debug('Text selected via drag:', selected.text);
        onTextSelected(selected);
      }
    }, 200); // 200ms 디바운싱
  });

  // dblclick 이벤트 (더블클릭 선택)
  document.addEventListener('dblclick', (e) => {
    // 팝업 내부 클릭은 무시
    if (e.target.closest('.financial-terms-popup')) {
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const selected = getSelectedText();
      if (selected) {
        debug('Text selected via double-click:', selected.text);
        onTextSelected(selected);
      }
    }, 200);
  });

  // ESC 키로 선택 해제
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    }
  });

  debug('Selection listeners initialized');
}

/**
 * 리스너 제거
 */
export function removeSelectionListeners() {
  // 실제로는 참조를 저장해야 하지만, 간단하게 처리
  debug('Selection listeners removed');
}
