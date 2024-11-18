// Log that content script is loaded
console.log('Copy History content script loaded');

// Function to send copied text to background script
function sendCopiedText(text) {
    if (text) {
        chrome.runtime.sendMessage({
            type: 'COPY_TEXT',
            text: text.trim()
        });
    }
}

// Function to handle copy event
function handleCopy(e) {
    try {
        // Get the selected text
        const selectedText = window.getSelection().toString().trim();
        console.log('Copy event detected, selected text:', selectedText);
        
        if (selectedText) {
            // Store directly in chrome.storage
            chrome.storage.local.get('copyHistory', function(result) {
                let copyHistory = result.copyHistory || [];
                console.log('Current history:', copyHistory);
                
                // Add new text to the beginning of the array
                copyHistory.unshift({
                    text: selectedText,
                    timestamp: new Date().toLocaleString()
                });
                
                // Keep only the last 5 items
                copyHistory = copyHistory.slice(0, 5);
                
                // Save updated history
                chrome.storage.local.set({ copyHistory }, () => {
                    console.log('Updated history:', copyHistory);
                    if (chrome.runtime.lastError) {
                        console.error('Error saving to storage:', chrome.runtime.lastError);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error in copy event handler:', error);
    }
}

// Listen for copy event
document.addEventListener('copy', function(e) {
    const selectedText = window.getSelection().toString();
    console.log('Copy event detected, text:', selectedText);
    sendCopiedText(selectedText);
    handleCopy(e);
});

// Listen for keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
        console.log('Ctrl+C detected');
        setTimeout(() => {
            const selectedText = window.getSelection().toString();
            console.log('Selected text after Ctrl+C:', selectedText);
            sendCopiedText(selectedText);
        }, 100);
    }
});

// Create a hidden textarea for clipboard operations
const textarea = document.createElement('textarea');
textarea.style.position = 'fixed';
textarea.style.top = '-999px';
textarea.style.left = '-999px';
document.body.appendChild(textarea);

// Monitor clipboard changes using execCommand
document.addEventListener('selectionchange', function() {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        textarea.value = selection.toString();
        textarea.select();
    }
});
