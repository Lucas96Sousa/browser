const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win = null
let contents = null

function createWindow () {

  win = new BrowserWindow({
    width: config.width,
    height: config.height,
    // transparent:true,
    // frame:false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    },
  })

  win.loadURL(config.url)

  contents = win.webContents

}

function toggleDevTools() {
  contents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', recreateWindow)


function recreateWindow() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}
