// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Import the necessary Electron components.
const { contextBridge,ipcRenderer} = require('electron/renderer')

  contextBridge.exposeInMainWorld('screenshot',{

    captureScreenShot: () => ipcRenderer.send('capture-screenshot'),
    screenShotCaptured: (callback)=>{
      ipcRenderer.on('screenshot-captured',(event,screenshotURL) => callback(event,screenshotURL));
    },
  })
 
  contextBridge.exposeInMainWorld('startstream',{

    startstream: (rdata) => ipcRenderer.send('start-stream',rdata),
    ondataavailable: (callback)=>{
      ipcRenderer.on('on-dataavailable',(event,chunk) => callback(event,chunk));
      
    },
  })
  
 

  contextBridge.exposeInMainWorld('getStoreValue',{

    getStoreValue: (rdata) => ipcRenderer.invoke('getStoreValue',rdata)
  })
  contextBridge.exposeInMainWorld('setStoreValue',{

    setStoreValue: (rdata) => ipcRenderer.invoke('setStoreValue',rdata)
  })

 contextBridge.exposeInMainWorld('stopstreaming',{

  stopstreaming: (req) => ipcRenderer.send('stop-stream',req)
})

contextBridge.exposeInMainWorld('electronAPI', {
  startLive: (rdata) => ipcRenderer.invoke('start-live',rdata)
})
  
 
