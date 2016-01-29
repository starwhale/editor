'use strict'
/**
    @file           windowManager.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          29/01/2016
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
    /**
        @property       windowManager.mainWindow
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           object
        @description    Holds the main window of the application after it's
                        begin created.
    */
    'mainWindow': undefined,

    /**
        @property       windowManager.windows
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           object
        @description    An updated list of all the active windows of the application.
                        The key is the window id and the value is it's type. (filename)
    */
    'windows': {},

    /**
        @function       windowManager.createWindow
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Creates a new application window of a certian type.
        @param          (string) name
                        The filename of the window, without extention and path.
        @param          (int) id
                        A new unique window id.
        @param          (object) options
                        BrowserWindow options object, that contains information
                        such as: width, height, y, x, fullscreen and so on...
        @see            https://github.com/atom/electron/blob/master/docs/api/browser-window.md
    */
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
