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
    /**
        @property       windows.list
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           object
        @description    Stores all the currently opened windows. This list might
                        not be as updated as I wish it was.
    */
    'list': {},

    /**
        @property       windows.lastId
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           object
        @description    Stores the last window's id number.
    */
    'lastId': 0,

    /**
        @function       windows.open
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Creates an application window and logs it into the windows
                        list.
        @param          (string) name
                        The name of the window's type. (mainWindow, settingsWindow, etc.)
        @param          (object) options
                        An object that contains BroswerWindow options, such as
                        width, height, fullscreen and etc.
        @return         (int)
                        a unique auto-generated window id.
    */
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

        return window.windows.lastId;
    },

    /**
        @function       windows.close
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Closes a window by it's id.
        @param          (int) id
                        The id number of the window you wish to close.
    */
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

    /**
        @function       windows.minimize
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Minimizes a window by it's id.
        @param          (int) id
                        The id number of the window you wish to minimize.
    */
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

    /**
        @function       windows.maximize
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          29/01/2016
        @version        1.0.0
        @type           sync
        @description    Maximizes a window by it's id.
        @param          (int) id
                        The id number of the window you wish to maximize.
    */
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
