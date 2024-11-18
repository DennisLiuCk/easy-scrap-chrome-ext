// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyToHistory",
        title: "Copy to History",
        contexts: ["selection"]
    });
});

// Format date to a shorter version
function formatDate(date) {
    const now = new Date();
    const today = now.toDateString();
    const yesterday = new Date(now.setDate(now.getDate() - 1)).toDateString();
    const inputDate = new Date(date);
    
    if (inputDate.toDateString() === today) {
        return inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (inputDate.toDateString() === yesterday) {
        return 'Yesterday ' + inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        return inputDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
               ' ' + inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyToHistory" && info.selectionText) {
        // Get current history
        chrome.storage.local.get('copyHistory', function(result) {
            let copyHistory = result.copyHistory || [];
            
            const now = new Date();
            
            // Add new text to the beginning with page title
            copyHistory.unshift({
                text: info.selectionText,
                timestamp: formatDate(now),
                pageTitle: tab.title || 'Unknown Page'
            });
            
            // Keep only last 5 items
            copyHistory = copyHistory.slice(0, 5);
            
            // Save to storage
            chrome.storage.local.set({ copyHistory });
        });
    }
});
