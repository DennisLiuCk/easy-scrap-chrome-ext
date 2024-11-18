document.addEventListener('DOMContentLoaded', async function() {
    const copyHistoryDiv = document.getElementById('copyHistory');
    
    try {
        // Get copy history from storage
        const result = await chrome.storage.local.get('copyHistory');
        const copyHistory = result.copyHistory || [];

        if (copyHistory.length === 0) {
            copyHistoryDiv.innerHTML = '<div class="no-copies">No copy history yet. Right-click and select "Copy to History" to save text!</div>';
            return;
        }

        // Clear existing content
        copyHistoryDiv.innerHTML = '';

        // Display each copied item
        copyHistory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'copy-item';
            
            const itemHeader = document.createElement('div');
            itemHeader.className = 'item-header';
            
            const pageTitle = document.createElement('div');
            pageTitle.className = 'page-title';
            pageTitle.textContent = item.pageTitle || 'Unknown Page';
            pageTitle.title = item.pageTitle; // Show full title on hover
            
            const timestamp = document.createElement('div');
            timestamp.className = 'timestamp';
            timestamp.textContent = item.timestamp;
            
            const text = document.createElement('div');
            text.className = 'text';
            text.textContent = item.text;

            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-btn';
            clearBtn.innerHTML = '&times;';
            clearBtn.title = 'Remove this item';
            clearBtn.onclick = async () => {
                try {
                    // Get current history
                    const result = await chrome.storage.local.get('copyHistory');
                    let copyHistory = result.copyHistory || [];
                    
                    // Remove the item at the specified index
                    copyHistory.splice(index, 1);
                    
                    // Save updated history
                    await chrome.storage.local.set({ copyHistory });
                    
                    // Refresh the display
                    location.reload();
                } catch (error) {
                    console.error('Error removing item:', error);
                }
            };
            
            itemHeader.appendChild(pageTitle);
            itemHeader.appendChild(timestamp);
            itemDiv.appendChild(itemHeader);
            itemDiv.appendChild(text);
            itemDiv.appendChild(clearBtn);
            copyHistoryDiv.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error in popup:', error);
        copyHistoryDiv.innerHTML = '<div class="no-copies">Error loading copy history. Please try again.</div>';
    }
});
