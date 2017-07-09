const {app, BrowserWindow, ipcMain} = require('electron')
// Module to control application life.
//const app = electron.app
// Module to create native browser window.
//const BrowserWindow = electron.BrowserWindow

//const ipcMain = electron.ipc

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow
var smallWindow
var gestureWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    titleBarStyle: 'hiddenInset'
  })
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))
   // Open the DevTools.
  mainWindow.webContents.openDevTools()


  smallWindow = new BrowserWindow({
    width: 700,
    height: 400,
    show: true
  })
  smallWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/extern_code/rotary_push_car_ui/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  smallWindow.hide()


    gestureWindow = new BrowserWindow({
    width: 700,
    height: 400,
    show: true
  })
  gestureWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/extern_code/gesture_car_ui/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  gestureWindow.hide()
 

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  smallWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    smallVisible = false
  })

  gestureWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    gestureVisible = false
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

var smallVisible = false
var gestureVisible = false


ipcMain.on('toggleSmall', function(){

  if( smallVisible ){
    smallWindow.hide()
    smallVisible = false
  }else{
    smallWindow.show()
    smallVisible = true
  }

})

ipcMain.on('toggleGesture', function(){

  if( gestureVisible ){
    gestureWindow.hide()
    gestureVisible = false
  }else{
    gestureWindow.show()
    gestureVisible = true
  }

})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.