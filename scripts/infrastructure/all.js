'use strict'
/**
    @file           all.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Integrates all the script files and requires jQuery.
*/

/**
    Require the system parameters configuration file.
*/
var imported = document.createElement('script');
imported.src = '../scripts/infrastructure/systemParams.js';
document.head.appendChild(imported);

/**
    Require jQuery, and make it available for Electron.
*/
var imported = document.createElement('script');
imported.src = '../scripts/infrastructure/jquery.js';
document.head.appendChild(imported);

window.$ = window.jQuery = module.exports;

/**
    Load all the scripts defined in the scripts list.
*/
window.onload = function() {
    for (let path in systemParams.scripts) {
        // Extract the description from the scripts array.
        let description = systemParams.scripts[path];

        // Use jQuery to load the script, and report back to the console if
        // debug mode is set to true.
        $.getScript("../scripts/" + path)
            .done(function() {
                if (systemParams.debugMode) {
                    console.group("Script '" + path + "' has loaded.");
                    console.log(description);
                    console.groupEnd();
                }
            })
            .fail(function(a, b, ex) {
                if (systemParams.debugMode) {
                    console.error("Script '" + path + "' has failed to load. (" + ex + ")");
                }
            });
    };
}
