'use strict';

/**
    @file           main.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           Node.js application file
    @description    The application's main entry point.
*/

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// IPC module
const ipcMain = electron.ipcMain;

const clientInterface = require('./clientInterface');

const windowManager = require('./windowManager');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    windowManager.mainWindow = windowManager.createWindow('mainWindow', 0);
});

// Create IPC events
for (let funcName in clientInterface) {
    ipcMain.on(funcName, clientInterface[funcName]);
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windowManager.mainWindow === null) {
    windowManager.mainWindow = windowManager.createWindow('mainWindow', 0);
  }
});
