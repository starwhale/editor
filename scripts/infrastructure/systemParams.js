'use strict'
/**
    @file           systemParams.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Stores client-side configuration settings.
                    Note that jQuery is not available on this file.
*/

/**
    Global system parameters
*/
let systemParams = {
    // Settings debugMode to true if you want to see logs in the console.
    'debugMode': true,
};

/**
    Defines a list of scripts to be included on the application startup.
    To add a script, add a line to the scripts array and use the following format:

    'absolute/path/to/script': "script description"
*/
systemParams.scripts = {
        'scripts/setsize.js': "Fix the panel width and height everytime the window resizes.",
};
