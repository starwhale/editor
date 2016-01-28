'use strict'
/**
    @file           settings.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          28/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Manages user settings. The user settings overwrite
                    system parameters, and has unique values per client.
    @class          settings
*/

window.settings = {
    'list': {},

    'observers': {},

    'filePath': undefined,

    'isDirty': false,

    'get': function(key) {
        if (window.settings.list.hasOwnProperty(key))
        {
            // Taking the value from the user settings.
            return window.settings.list[key];
        }
        else if (systemParams.hasOwnProperty(key)) {
            // Taking default value from the system parameters.
            return systemParams[key];
        }
        else {
            // The key does not exist in the system, error.
            if (systemParams.debugMode) {
                console.error("Settings Manager: Key '" + key + "' does not exist in the system.");
            }
        }
    },

    'set': function(key, newValue) {
        let oldValue = window.settings.list[key];

        if (oldValue == newValue) {
            console.warn("Settings Manager: 'set' function cancelled because the value supplied is the same value.");
            return;
        }

        window.settings.isDirty = true;

        if (systemParams.debugMode) {
            if (window.settings.list.hasOwnProperty(key) == false) {
                console.warn("Settings Manager: Inserting new key '" + key + "' into user settings.");
            }
        }

        for (let observerKey in window.settings.observers) {
            if (observerKey == key) {
                let observerCallback = window.settings.observers[observerKey];
                observerCallback(oldValue, newValue);

                if (systemParams.debugMode) {
                    console.group("Settings Manager: Observer fired for key: '" + key + "'");
                    console.log("Old Value: " + oldValue);
                    console.log("New Value: " + newValue);
                    console.groupEnd();
                }
            }
        }

        window.settings.list[key] = newValue;
    },

    'load': function(filePath, callback) {
        $.getJSON("../" + filePath, function(newSettings) {
            window.settings.list = newSettings;
            window.settings.filePath = filePath;

            if (systemParams.debugMode) {
                console.log("Settings Manager: Settings has been loaded from: '" + filePath + "'");
            }

            if (callback) {
                callback();
            }
        })
        .fail(function() {
            console.error("Error loading user settings file from '" + filePath + "'");
        });
    },

    'save': function(filePath) {
        if (!filePath) {
            if (window.settings.filePath == undefined) {
                // Settings are not loaded, error.
                if (systemParams.debugMode) {
                    console.error("Settings Manager: An attempt was made to save the settings before it was loaded. Attemp canceled.");
                }
                return;
            }
            else {
                filePath = window.settings.filePath;
            }
        }

        if (systemParams.debugMode) {
            console.log("Settings Manager: Saving user settings file into '" + filePath + "'");
        }

        window.ipcRenderer.send('save-json-file', {
            data: window.settings.list,
            filePath: filePath
        });

        window.settings.isDirty = false;
    },

    'rollback': function() {
        if (window.settings.filePath == undefined) {
            // Settings has not been loaded yet, error.
            if (systemParams.debugMode) {
                console.error("Settings Manager: Attempt to preform a rollback before settings has been loaded occured. Canceling rollback.");
            }
            return;
        }

        window.settings.load(window.settings.filePath);

        if (systemParams.debugMode) {
            console.log("Settings Manager: Preforming settings rollback");
        }
    },

    'restoreDefaults': function() {

    },

    'observe': function(key, callback) {
        window.settings.observers[key] = callback;
    }
};
