# Easy Scrap Chrome Extension

A Chrome extension that helps you keep track of your recently copied text snippets. It maintains a history of your last 5 copied items, complete with timestamps and source page information.

## Features

- Tracks your last 5 copied text items
- Shows timestamps for each copied item
- Displays source page information
- Right-click context menu integration
- Modern, clean user interface
- Easy deletion of individual history items

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

### Copying Text
There are two ways to save text to your copy history:

1. **Context Menu**
   - Select any text on a webpage
   - Right-click and choose "Copy to History"
   - The text will be saved with page information

2. **Keyboard Shortcut**
   - Select text and use Ctrl+C (Windows/Linux) or Cmd+C (Mac)
   - The text will be automatically saved to your history

### Viewing History
- Click the extension icon in your Chrome toolbar
- View your last 5 copied items with timestamps and source pages
- Hover over any item to see the delete button
- Click the button to remove individual items

## Technical Details

The extension uses:
- Chrome Storage API for persistent data storage
- Context Menus API for right-click functionality
- Modern JavaScript with async/await
- Chrome Extension Manifest V3

## Privacy

This extension:
- Only stores data locally on your device
- Does not send any data to external servers
- Only tracks text that you explicitly copy
- Keeps only the 5 most recent items

## License

MIT License - feel free to modify and reuse this code for your own projects.
