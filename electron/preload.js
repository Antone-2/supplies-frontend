const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Example: send message to main process
    sendMessage: (message) => ipcRenderer.invoke('message', message),
    // Add more APIs as needed
});
