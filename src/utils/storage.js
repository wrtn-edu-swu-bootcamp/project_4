/**
 * Storage 유틸리티
 * Chrome Storage API와 IndexedDB 관리
 */

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

// IndexedDB 관리
const DB_NAME = 'FinancialTermsDB';
const DB_VERSION = 1;

/**
 * IndexedDB 초기화
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // terms ObjectStore
      if (!db.objectStoreNames.contains('terms')) {
        const termsStore = db.createObjectStore('terms', { keyPath: 'id' });
        termsStore.createIndex('name', 'name', { unique: false });
        termsStore.createIndex('category', 'category', { unique: false });
      }

      // userSettings ObjectStore
      if (!db.objectStoreNames.contains('userSettings')) {
        db.createObjectStore('userSettings', { keyPath: 'key' });
      }

      // usageStats ObjectStore
      if (!db.objectStoreNames.contains('usageStats')) {
        db.createObjectStore('usageStats', { keyPath: 'timestamp' });
      }
    };
  });
}

/**
 * 용어 데이터 저장
 */
export async function saveTerms(terms) {
  const db = await initDB();
  const transaction = db.transaction(['terms'], 'readwrite');
  const store = transaction.objectStore('terms');

  for (const term of terms) {
    store.put(term);
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
}

/**
 * 모든 용어 가져오기
 */
export async function getAllTerms() {
  const db = await initDB();
  const transaction = db.transaction(['terms'], 'readonly');
  const store = transaction.objectStore('terms');

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * ID로 용어 가져오기
 */
export async function getTermById(id) {
  const db = await initDB();
  const transaction = db.transaction(['terms'], 'readonly');
  const store = transaction.objectStore('terms');

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
