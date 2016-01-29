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
    /**
        @property       settings.list
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           object
        @description    Stores all of the updated user settings.
    */
    'list': {},

    /**
        @property       settings.observers
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           object
        @description    A list of all the observers created for the settings.
                        The key is the settings key name and the value is the callback.
    */
    'observers': {},

    /**
        @property       settings.filePath
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           string
        @description    Stores the currently open settings file's path.
                        If it's set to undefined it means that the Settings
                        are not loaded.
    */
    'filePath': undefined,

    /**
        @property       settings.isDirty
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           bool
        @description    Sets to true whenever there is unsaved data in the settings.
                        The save method automatically sets it to false.
    */
    'isDirty': false,

    /**
        @function       settings.get
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Returns a value from the user settings.
        @param          (string) key
                        The settings key of the value you want to retreive.
        @return         (object)
                        The requested value.
    */
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

    /**
        @function       settings.set
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Sets a value in the local user settings memory.
                        Also fires the observers of this key, if any.
        @param          (string) key
                        The settings key of the value you want to set.
        @param          (object) newValue
                        The value you wish to set.
    */
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

    /**
        @function       settings.load
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           async
        @description    Loads settings from a file to the application memory
                        for further use.
        @param          (string) filePath
                        The path to the json settings file.
        @param          (function) callback
                        A callback being called after the settings file has been
                        loaded.
    */
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

    /**
        @function       settings.save
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           async
        @description    Saves the settings back to the filesystem.
        @param          (string) filePath
                        Wherever you want to save the settings. If sets to undefined,
                        it will use the currently opened file. (If any)
    */
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

    /**
        @function       settings.rollback
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Bring the settings state back to the way it is saved in the
                        file system, and delete the settings stored on the memory.
                        Any unsaved changes are peremently removed.
    */
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

    /**
        @function       settings.restoreDefaults
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Removes both the settings from the memory and filesystem,
                        and restores the values from the system parameters.
        @todo           Implement this functionallity.
    */
    'restoreDefaults': function() {

    },

    /**
        @function       settings.observe
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Observes a settings key for any changes. Whenever a key
                        changes the settings module will notify using the supplied
                        callback.
        @param          (string) key
                        The setings key you wish to observe.
        @param          (function) callback
                        The callback you wish to run whenever the observed key
                        is changing. (The callback signature is: '(void) oldValue, newValue')
    */
    'observe': function(key, callback) {
        window.settings.observers[key] = callback;
    }
};
