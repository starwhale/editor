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
    'list': [],

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

    'set': function(key, value) {
        window.settings.isDirty = true;
    },

    'load': function(filePath, callback) {
        $.getJSON(filePath, function(newSettings) {
            window.settings.list = newSettings;
            window.settings.filePath = filePath;

            if (systemParams.debugMode) {
                console.log("Settings Manager: Settings has been loaded from: '" + filePath + "'");
            }

            callback();
        });
    },

    'save': function(filePath, callback) {

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

    }
};
