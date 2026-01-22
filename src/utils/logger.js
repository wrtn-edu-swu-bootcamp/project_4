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

// 현재 로그 레벨 (프로덕션에서는 WARN 이상만)
const CURRENT_LEVEL = process.env.NODE_ENV === 'production' ? LOG_LEVEL.WARN : LOG_LEVEL.DEBUG;

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
