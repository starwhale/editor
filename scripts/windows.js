'use strict'
/**
    @file           windows.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          29/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Manages the software's windows. Has actions such as closing,
                    opening and minimizing windows.
    @class          windows
*/

window.windows = {
    'list': {},

    'lastId': 0,

    'open': function(name, options) {
        window.ipcRenderer.send('open-window', {
            id: ++window.windows.lastId,
            name: name,
            options: options,
        });

        window.windows.list[window.windows.lastId] = name;

        if (systemParams.debugMode) {
            console.log("Windows Manager: A window of type '" + name + "' has been created. (id #" + window.windows.lastId + ")");
        }
    },

    'close': function(id) {
        if (window.windows.list.hasOwnProperty(id)) {
            window.ipcRenderer.send('close-window', id);

            if (systemParams.debugMode) {
                console.log("Windows Manager: A window of type '" + window.windows.list[id] + "' has closed.");
            }

            delete window.windows.list[id];
        }
        else {
            if (systemParams.debugMode) {
                console.error("Windows Manager: An attempt to close an unknown window (id #" + id + ") occured.")
            }
        }
    },

    'minimize': function(id) {
        if (window.windows.list.hasOwnProperty(id)) {
            window.ipcRenderer.send('minimize-window', id);

            if (systemParams.debugMode) {
                console.log("Windows Manager: A window of type '" + window.windows.list[id] + "' has minimized.");
            }
        }
        else {
            if (systemParams.debugMode) {
                console.error("Windows Manager: An attempt to minimize an unknown window (id #" + id + ") occured.")
            }
        }
    },

    'maximize': function(id) {
        if (window.windows.list.hasOwnProperty(id)) {
            window.ipcRenderer.send('maximize-window', id);

            if (systemParams.debugMode) {
                console.log("Windows Manager: A window of type '" + window.windows.list[id] + "' has maximized.");
            }
        }
        else {
            if (systemParams.debugMode) {
                console.error("Windows Manager: An attempt to maximize an unknown window (id #" + id + ") occured.")
            }
        }
    }
}
