chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTabs") {
        chrome.tabs.query({}, (tab) => {
            if (chrome.runtime.lastError) {
                sendResponse({ error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ tabCount: tab });
            }
        });
        return true;
    }
});
chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.tabs.query({}, (result) => {
        result.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { action: "remove", closedTabId: tab, rmove: tabId });
        });
    });
});