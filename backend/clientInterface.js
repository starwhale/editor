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
    'open-window': function(event, dto) {
        windowManager.createWindow(dto.name, dto.id, dto.options)
    },

    'close-window': function(event, id) {
        windowManager.windows[id].close();
    },

    'minimize-window': function(event, id) {
        windowManager.windows[id].minimize();
    },

    'maximize-window': function(event, id) {
        windowManager.windows[id].maximize();
    }
};
