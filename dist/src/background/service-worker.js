const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2
};
const isDev = typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getManifest ? !("update_url" in chrome.runtime.getManifest()) : true;
const CURRENT_LEVEL = isDev ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN;
const PREFIX = "[금융용어]";
function info(...args) {
  if (CURRENT_LEVEL <= LOG_LEVEL.INFO) {
    console.info(`${PREFIX} [INFO]`, ...args);
  }
}
chrome.runtime.onInstalled.addListener(async (details) => {
  info("Extension installed:", details.reason);
  if (details.reason === "install") {
    handleFirstInstall();
  } else if (details.reason === "update") {
    info("Extension updated to version:", chrome.runtime.getManifest().version);
  }
});
function handleFirstInstall() {
  try {
    info("Terms data ready (embedded JSON)");
  } catch (error) {
    console.error("Failed to handle first install:", error);
  }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getExtensionStatus") {
    chrome.storage.sync.get(["isEnabled"], (result) => {
      sendResponse({ enabled: result.isEnabled !== false });
    });
    return true;
  }
});
chrome.action.onClicked.addListener((tab) => {
  info("Extension icon clicked");
});
