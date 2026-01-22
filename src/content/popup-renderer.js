/**
 * 팝업 렌더링 모듈
 * 용어 해설 팝업 DOM 생성 및 표시
 */

import { debug } from '../utils/logger.js';

const POPUP_ID = 'financial-terms-popup';
const POPUP_CLASS = 'financial-terms-popup';

/**
 * 팝업 위치 계산
 */
function calculatePopupPosition(targetRect, popupElement) {
  const popup = popupElement.getBoundingClientRect();
  const margin = 8;

  let top = targetRect.top - popup.height - margin;
  let left = targetRect.left;

  // 위쪽 공간이 부족하면 아래에 표시
  if (top < 0) {
    top = targetRect.bottom + margin;
  }

  // 오른쪽으로 넘치면 조정
  if (left + popup.width > window.innerWidth) {
    left = window.innerWidth - popup.width - 16;
  }

  // 왼쪽으로 넘치면 조정
  if (left < 0) {
    left = 16;
  }

  return { top: top + window.scrollY, left: left + window.scrollX };
}

/**
 * 용어 팝업 렌더링
 */
export function renderTermPopup(termData, targetRect) {
  // 기존 팝업 제거
  removePopup();

  // 팝업 생성
  const popup = document.createElement('div');
  popup.id = POPUP_ID;
  popup.className = POPUP_CLASS;
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-labelledby', 'popup-title');

  // Shadow DOM 사용하여 페이지 CSS와 격리
  const shadow = popup.attachShadow({ mode: 'open' });

  // 스타일 추가
  const style = document.createElement('style');
  style.textContent = getPopupStyles();
  shadow.appendChild(style);

  // 컨텐츠 생성
  const content = document.createElement('div');
  content.className = 'popup-container';
  content.innerHTML = `
    <div class="popup-header">
      <h2 id="popup-title" class="popup-title">${termData.name}</h2>
      <span class="popup-category">${termData.category}</span>
    </div>
    
    <div class="popup-body">
      <div class="popup-section">
        <p class="popup-description">${termData.description}</p>
      </div>
      
      ${
        termData.example
          ? `
        <div class="popup-section">
          <h3 class="popup-section-title">💡 예시</h3>
          <div class="popup-example">${termData.example}</div>
        </div>
      `
          : ''
      }
      
      ${
        termData.importance
          ? `
        <div class="popup-section">
          <h3 class="popup-section-title">❗ 왜 중요한가요?</h3>
          <p class="popup-section-content">${termData.importance}</p>
        </div>
      `
          : ''
      }
      
      ${
        termData.relatedTerms && termData.relatedTerms.length > 0
          ? `
        <div class="popup-section">
          <h3 class="popup-section-title">🔗 관련 용어</h3>
          <div class="related-terms">
            ${termData.relatedTerms.map((term) => `<span class="related-term">${term}</span>`).join('')}
          </div>
        </div>
      `
          : ''
      }
    </div>
    
    <div class="popup-footer">
      <p class="popup-disclaimer">※ 본 설명은 참고용이며, 정확한 정보는 해당 금융기관에 확인하세요.</p>
    </div>
    
    <button class="popup-close" aria-label="팝업 닫기">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  `;

  shadow.appendChild(content);

  // DOM에 추가 (임시 위치)
  popup.style.position = 'absolute';
  popup.style.visibility = 'hidden';
  document.body.appendChild(popup);

  // 위치 계산 및 적용
  const position = calculatePopupPosition(targetRect, popup);
  popup.style.top = `${position.top}px`;
  popup.style.left = `${position.left}px`;
  popup.style.visibility = 'visible';

  // 닫기 버튼 이벤트
  const closeBtn = shadow.querySelector('.popup-close');
  closeBtn.addEventListener('click', removePopup);

  // 외부 클릭 시 닫기
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);

  // ESC 키로 닫기
  document.addEventListener('keydown', handleEscapeKey);

  debug('Term popup rendered:', termData.name);
}

/**
 * 미등록 용어 팝업 렌더링
 */
export function renderNoMatchPopup(text, targetRect) {
  removePopup();

  const popup = document.createElement('div');
  popup.id = POPUP_ID;
  popup.className = POPUP_CLASS;

  const shadow = popup.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = getPopupStyles();
  shadow.appendChild(style);

  const content = document.createElement('div');
  content.className = 'popup-container popup-no-match';
  content.innerHTML = `
    <div class="popup-header">
      <h2 class="popup-title">해설을 찾을 수 없습니다</h2>
    </div>
    
    <div class="popup-body">
      <p class="popup-description">"${text}"에 대한 해설이 등록되지 않았습니다.</p>
      
      <div class="popup-section">
        <h3 class="popup-section-title">🔍 다른 곳에서 검색하기</h3>
        <div class="search-links">
          <a href="https://search.naver.com/search.naver?query=${encodeURIComponent(text)}+금융+용어" target="_blank" class="search-link">
            네이버 검색
          </a>
          <a href="https://dic.hankyung.com/economy/view/?seq=416" target="_blank" class="search-link">
            한국경제 용어사전
          </a>
        </div>
      </div>
    </div>
    
    <button class="popup-close" aria-label="팝업 닫기">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  `;

  shadow.appendChild(content);

  popup.style.position = 'absolute';
  popup.style.visibility = 'hidden';
  document.body.appendChild(popup);

  const position = calculatePopupPosition(targetRect, popup);
  popup.style.top = `${position.top}px`;
  popup.style.left = `${position.left}px`;
  popup.style.visibility = 'visible';

  const closeBtn = shadow.querySelector('.popup-close');
  closeBtn.addEventListener('click', removePopup);

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);

  document.addEventListener('keydown', handleEscapeKey);

  debug('No match popup rendered for:', text);
}

/**
 * 팝업 제거
 */
export function removePopup() {
  const existing = document.getElementById(POPUP_ID);
  if (existing) {
    existing.remove();
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscapeKey);
    debug('Popup removed');
  }
}

/**
 * 외부 클릭 핸들러
 */
function handleOutsideClick(e) {
  const popup = document.getElementById(POPUP_ID);
  if (popup && !e.target.closest(`#${POPUP_ID}`)) {
    removePopup();
  }
}

/**
 * ESC 키 핸들러
 */
function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    removePopup();
  }
}

/**
 * 팝업 스타일 (Shadow DOM용)
 */
function getPopupStyles() {
  return `
    @import url('/src/styles/variables.css');
    
    .popup-container {
      max-width: 400px;
      max-height: 600px;
      background-color: #ffffff;
      border: 1px solid #d1d4da;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(42, 52, 64, 0.12), 0 2px 4px rgba(42, 52, 64, 0.08);
      padding: 24px;
      font-family: 'Pretendard', -apple-system, sans-serif;
      animation: popupFadeIn 0.25s ease-out;
    }
    
    @keyframes popupFadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .popup-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #d1d4da;
    }
    
    .popup-title {
      font-size: 20px;
      font-weight: 600;
      color: #2f3c4a;
      margin: 0 0 4px 0;
    }
    
    .popup-category {
      font-size: 12px;
      color: #8b909a;
    }
    
    .popup-body {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .popup-section {
      margin-bottom: 20px;
    }
    
    .popup-section:last-child {
      margin-bottom: 0;
    }
    
    .popup-description {
      font-size: 16px;
      line-height: 1.6;
      color: #1a1d23;
    }
    
    .popup-section-title {
      font-size: 14px;
      font-weight: 600;
      color: #4a4f5a;
      margin-bottom: 8px;
    }
    
    .popup-example {
      background-color: #f5f6f8;
      border-left: 3px solid #4a5b6c;
      padding: 16px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.6;
      color: #1a1d23;
    }
    
    .related-terms {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .related-term {
      display: inline-flex;
      padding: 8px 12px;
      background-color: #f5f6f8;
      border: 1px solid #d1d4da;
      border-radius: 16px;
      font-size: 14px;
      color: #5c8a95;
    }
    
    .popup-footer {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #d1d4da;
    }
    
    .popup-disclaimer {
      font-size: 12px;
      line-height: 1.5;
      color: #8b909a;
      margin: 0;
    }
    
    .popup-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      border-radius: 4px;
      color: #8b909a;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .popup-close:hover {
      background-color: #f5f6f8;
      color: #1a1d23;
    }
    
    .search-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .search-link {
      display: inline-block;
      padding: 8px 16px;
      background-color: #e8ebf0;
      color: #4a5b6c;
      border-radius: 6px;
      text-decoration: none;
      font-size: 14px;
      transition: background-color 0.2s ease;
    }
    
    .search-link:hover {
      background-color: #4a5b6c;
      color: #ffffff;
    }
  `;
}
