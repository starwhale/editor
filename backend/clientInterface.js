'use strict'
/**
    @file           clientInterface.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          29/01/2016
    @version        1.0.0
    @type           Node.js Module File
    @description    Contains a list of functions that the IPC expands to the
                    client side.
*/

const windowManager = require('./windowManager');
const fs = require('fs');

module.exports = {
    /**
        Filesystem
    */

    /**
        @function       clientInterface.save-json-file
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Simpley saves an object as a json file at the
                        local filesystem.
        @param          (object) event
                        An IPC event object.
        @param          (object) dto
                        A Data Transfer Object that contains the path you want
                        to save at (as 'filePath') and the object you want to save. (as 'data')
    */
    'save-json-file': function(event, dto) {
        let jsonString = JSON.stringify(dto.data, undefined, 2);

        fs.writeFile(dto.filePath, jsonString, function(err) {
            if(err) {
                console.log("Failed to save file (" + err + ")");
                return;
            }

            console.log("File saved successfuly.");
        });
    },

    /**
        Windows
    */

    /**
        @function       clientInterface.open-window
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Opens an application window.
        @param          (object) event
                        An IPC event object.
        @param          (object) dto
                        A Data Transfer Object that contains the filename of the
                        window (as 'name'), a unique integer id for the new window,
                        and an optional options object.
    */
    'open-window': function(event, dto) {
        windowManager.createWindow(dto.name, dto.id, dto.options)
    },

    /**
        @function       clientInterface.close-window
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Closes an application window.
        @param          (object) event
                        An IPC event object.
        @param          (int) id
                        Supply the window id of the window you want to close.
    */
    'close-window': function(event, id) {
        windowManager.windows[id].close();
    },

    /**
        @function       clientInterface.minimize-window
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Minimizes an application window.
        @param          (object) event
                        An IPC event object.
        @param          (int) id
                        Supply the window id of the window you want to minimize.
    */
    'minimize-window': function(event, id) {
        windowManager.windows[id].minimize();
    },

    /**
        @function       clientInterface.maximize-window
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Maximizes an application window.
        @param          (object) event
                        An IPC event object.
        @param          (int) id
                        Supply the window id of the window you want to maximize.
    */
    'maximize-window': function(event, id) {
        windowManager.windows[id].maximize();
    }
};
