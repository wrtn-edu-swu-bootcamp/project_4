/**
 * 용어 매칭 로직
 * 사용자가 선택한 텍스트를 용어 사전과 매칭
 */

import { getAllTerms } from './storage.js';

// 메모리 캐시 (한 번만 로드)
let termsCache = null;

/**
 * 텍스트 정규화
 * - 공백 제거
 * - 소문자 변환
 * - 특수문자 제거 (일부)
 */
function normalizeText(text) {
  return text
    .trim()
    .replace(/\s+/g, '') // 모든 공백 제거
    .toLowerCase()
    .replace(/[()[\]{}]/g, ''); // 괄호 제거
}

/**
 * 캐시된 용어 목록 가져오기
 * MVP: 정적 JSON 데이터를 메모리에 한 번만 로드
 */
function getCachedTerms() {
  if (!termsCache) {
    // 확장 프로그램에 내장된 정적 데이터 로드
    termsCache = getAllTerms();
  }
  return termsCache;
}

/**
 * 용어 검색
 * @param {string} selectedText - 사용자가 선택한 텍스트
 * @returns {Object|null} - 찾은 용어 객체 또는 null
 */
export function findTerm(selectedText) {
  if (!selectedText || selectedText.length < 2) {
    return null;
  }

  const normalized = normalizeText(selectedText);
  const terms = getCachedTerms();

  // 정확한 이름 매칭
  let match = terms.find((term) => normalizeText(term.name) === normalized);

  // 별칭(aliases)으로 매칭
  if (!match) {
    match = terms.find((term) => {
      if (!term.aliases) return false;
      return term.aliases.some((alias) => normalizeText(alias) === normalized);
    });
  }

  return match || null;
}

/**
 * 여러 용어 한 번에 검색
 * @param {string[]} textList - 텍스트 배열
 * @returns {Map} - 텍스트-용어 매핑
 */
export function findMultipleTerms(textList) {
  const results = new Map();
  
  for (const text of textList) {
    const term = findTerm(text);
    if (term) {
      results.set(text, term);
    }
  }

  return results;
}

/**
 * 캐시 초기화
 */
export function clearCache() {
  termsCache = null;
}

/**
 * 용어 검색 통계 (디버깅용)
 */
export function getSearchStats() {
  const terms = getCachedTerms();
  return {
    totalTerms: terms.length,
    cacheValid: termsCache !== null,
  };
}
