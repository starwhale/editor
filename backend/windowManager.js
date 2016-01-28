'use strict'

/**
    @file           windowManager.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           Node.js Module File
    @description    Contains window management functionality,
                    such as window creation.
*/

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

module.exports = {
    'mainWindow': undefined,

    'windows': {},

    'createWindow': function(name, id, options) {
        if (!options) {
            options = {width: 800, height: 600};
        }

        // Create the browser window.
        let win = new BrowserWindow(options);

        // and load the index.html of the app.
        win.loadURL('file://' + __dirname + '/../windows/' + name + '.html');

        // Open the DevTools.
        win.webContents.openDevTools();

        module.exports.windows[id] = win;

        // Emitted when the window is closed.
        win.on('closed', function() {
            delete module.exports.windows[id];
        });

        return win;
    }
};
