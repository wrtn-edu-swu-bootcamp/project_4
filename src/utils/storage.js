/**
 * Storage 유틸리티
 * Chrome Storage API 관리 (설정)
 * 용어 데이터는 정적 JSON 파일에서 로드
 */

import { getAllTermsData } from '../data/index.js';

// Chrome Storage 기본 설정값
const DEFAULT_SETTINGS = {
  isEnabled: true,
  selectionMethod: 'both', // 'drag' | 'dblclick' | 'both'
  popupPosition: 'auto', // 'above' | 'below' | 'auto'
  popupSize: 'medium', // 'small' | 'medium' | 'large'
  hoverPreviewEnabled: false,
  allowAnalytics: false,
};

/**
 * 사용자 설정 가져오기
 */
export async function getSettings() {
  try {
    const result = await chrome.storage.sync.get(DEFAULT_SETTINGS);
    return result;
  } catch (error) {
    console.error('Failed to get settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 사용자 설정 저장하기
 */
export async function saveSettings(settings) {
  try {
    await chrome.storage.sync.set(settings);
    return true;
  } catch (error) {
    console.error('Failed to save settings:', error);
    return false;
  }
}

/**
 * 특정 설정값 가져오기
 */
export async function getSetting(key) {
  const settings = await getSettings();
  return settings[key];
}

/**
 * 특정 설정값 저장하기
 */
export async function saveSetting(key, value) {
  try {
    await chrome.storage.sync.set({ [key]: value });
    return true;
  } catch (error) {
    console.error(`Failed to save setting ${key}:`, error);
    return false;
  }
}

// ============================================
// 용어 데이터 관리 (JSON 파일 기반)
// ============================================

/**
 * 모든 용어 가져오기
 * 정적 JSON 파일에서 직접 로드
 */
export function getAllTerms() {
  return getAllTermsData();
}

/**
 * ID로 용어 가져오기
 */
export function getTermById(id) {
  const allTerms = getAllTermsData();
  return allTerms.find((term) => term.id === id) || null;
}

/**
 * 용어 통계 가져오기
 */
export function getTermsCount() {
  return getAllTermsData().length;
}
