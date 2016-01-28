'use strict'
/**
    @file           systemParams.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Stores client-side default systematic configuration settings,
                    which can be overwritten by settings.
                    Note that jQuery is not available on this file.
*/

/**
    Global system parameters
*/
let systemParams = {
    // Settings debugMode to true if you want to see logs in the console.
    'debugMode': true,
    'defaultTheme': "dark",
    'settingsFile': "settings.json",
};

/**
    UI parameters
*/
systemParams.ui = {
    'leftPanelWidth': 175, // Static width of the left panel (Pixels)
}

/**
    Defines a list of scripts to be included on the application startup.
    To add a script, add a line to the scripts array and use the following format:

    'path/to/script.js': "script description"

    Note that the base folder for scripts is /scripts/.
*/
systemParams.scripts = {
        // Project dependencies
        'helpers.js': "Contains several different helper methods.",
        'viewparts.js': "Defines the viewparts static class, which contains that load and manage view parts.",
        'set-panel-sizes.js': "Fix the panel width and height everytime the window resizes.",
        'themes.js': "Defines the themes class, which manages and loads ui themes.",
        'create-ipc-connection.js': "Creates the connection tunnel between the Node.js layer and the Javascript layer.",

        // Startup loaders
        'load-startup-viewparts.js': "Loads the viewparts of the window on startup.",
        'load-startup-theme.js': "Loads the current theme from the settings.",
};