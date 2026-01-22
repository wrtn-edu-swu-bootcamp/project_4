/**
 * 로깅 유틸리티
 * 개발/프로덕션 환경에 따라 로그 출력 제어
 */

const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

// 현재 로그 레벨 (개발 모드에서는 DEBUG, 그 외에는 WARN)
// Chrome Extension에서는 process가 없으므로 안전하게 체크
const isDev = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest 
  ? !('update_url' in chrome.runtime.getManifest()) // update_url이 없으면 개발 모드
  : true;
const CURRENT_LEVEL = isDev ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN;

const PREFIX = '[금융용어]';

/**
 * Debug 로그
 */
export function debug(...args) {
  if (CURRENT_LEVEL <= LOG_LEVEL.DEBUG) {
    console.log(`${PREFIX} [DEBUG]`, ...args);
  }
}

/**
 * Info 로그
 */
export function info(...args) {
  if (CURRENT_LEVEL <= LOG_LEVEL.INFO) {
    console.info(`${PREFIX} [INFO]`, ...args);
  }
}

/**
 * Warning 로그
 */
export function warn(...args) {
  if (CURRENT_LEVEL <= LOG_LEVEL.WARN) {
    console.warn(`${PREFIX} [WARN]`, ...args);
  }
}

/**
 * Error 로그
 */
export function error(...args) {
  if (CURRENT_LEVEL <= LOG_LEVEL.ERROR) {
    console.error(`${PREFIX} [ERROR]`, ...args);
  }
}

/**
 * 성능 측정 시작
 */
export function timeStart(label) {
  if (CURRENT_LEVEL <= LOG_LEVEL.DEBUG) {
    console.time(`${PREFIX} ${label}`);
  }
}

/**
 * 성능 측정 종료
 */
export function timeEnd(label) {
  if (CURRENT_LEVEL <= LOG_LEVEL.DEBUG) {
    console.timeEnd(`${PREFIX} ${label}`);
  }
}
