const { app, BrowserWindow ,Menu,ipcMain} = require('electron');
const path = require('path');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
app.quit();
}
const createWindow = () => {
// Create the browser window.
const mainWindow = new BrowserWindow({
width: 800,
height: 600,
webPreferences: {
contextIsolation:true,
nodeIntegration:false,
preload: path.join(__dirname, 'preload.js'),

},
icon: __dirname + '/images/apple-touch-icon.png'
});

mainWindow.maximize();
// and load the index.html of the app.
mainWindow.loadFile(path.join(__dirname, 'index.html'));
// Open the DevTools.
//mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
app.quit();
}
});
app.on('activate', () => {
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (BrowserWindow.getAllWindows().length === 0) {
createWindow();
}
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
//Menu template
const menu=[
{
label:'Settings',
click:()=>createSettingsWindow()
},
{
label:'Exit',
click:()=>app.quit()
}
];
app.whenReady().then(()=>{
const mainMenu=Menu.buildFromTemplate(menu);
Menu.setApplicationMenu(mainMenu);

});
const Settings=require('electron-store');
const store = new Settings();
Settings.initRenderer();

let portnum=9089;
let sobj1,sobj2,sobj3,sobj4;
const Stream = require('./rtspstreamer'); 


//s.on("data", (data) => {
// console.log(data);
//     });




ipcMain.handle('getStoreValue', (event, key) => {
  return store.get(key);
});
ipcMain.handle('setStoreValue',(event,key)=>{
 
  store.set('appsettings',key);
  
   
});


function createSettingsWindow() {
 
  
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation:true,
      nodeIntegration:false,
      preload: path.join(__dirname, 'preload.js'),
      
      }
  });

  win.loadURL(path.join(__dirname, 'settings.html'));
  //win.openDevTools();
  win.setMenu(null);
}
ipcMain.handle('start-live',startlive)
ipcMain.on('stop-stream',async(event,ar)=>{

 // console.log("stop called"+ar);
  switch(ar)
{
  case 'diver1':
    if(sobj1)
    sobj1.stop();
    
  break;
  case 'diver2':
    if(sobj2)
    sobj2.stop();
    break;
  
  case 'diver3':
    if(sobj3)
    sobj3.stop();
  
  break;
  case 'diver4':
    if(sobj4)
    sobj4.stop();
  break;
}

})
async function startlive (event,rdata) {
 
  portnum++;

  switch(rdata.vidid)
  {
  case 'diver1':
    if(sobj1)
    sobj1.stop();
  sobj1= new Stream({
    url:store.get('appsettings.diver1url'),
    wsport:portnum
    });
  break;
  case 'diver2':
    if(sobj2)
    sobj2.stop();
  sobj2= new Stream({
    url:store.get('appsettings.diver2url'),
    wsport:portnum
    });
  break;
  
  case 'diver3':
    if(sobj3)
    sobj3.stop();
  sobj3= new Stream({
    url:store.get('appsettings.diver3url'),
    wsport:portnum
    });
  break;
  case 'diver4':
    if(sobj4)
    sobj4.stop();
  sobj4= new Stream({
    url:store.get('appsettings.diver4url'),
    wsport:portnum
    });
  break;
  
  
  }
  
  console.log('start live called by browser');
 return {wsport:portnum,vidid:rdata.vidid};
  
  
  
}