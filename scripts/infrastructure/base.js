'use strict'
/**
    @file           base.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Integrates all the script files and requires jQuery.
*/

/**
    Require the system parameters configuration file.
*/
var systemParamsScirptElement = document.createElement('script');
systemParamsScirptElement.src = '../scripts/infrastructure/systemParams.js';
document.head.appendChild(systemParamsScirptElement);

/**
    Require jQuery, and make it available for Electron.
*/
var jqueryScirptElement = document.createElement('script');
jqueryScirptElement.src = '../scripts/infrastructure/jquery.js';
document.head.appendChild(jqueryScirptElement);

window.$ = window.jQuery = module.exports;

/**
    Create IPC Channel
*/
window.ipcRenderer = require('electron').ipcRenderer;

window.onload = function() {

    /**
        Load user settings module
    */
    $.getScript('../scripts/infrastructure/settings.js')
    .done(function() {
        settings.load(systemParams.settingsFile, function() {

            /**
                Create settings anti-loss mechanism
            */
            $(window).unload(function() {
                if (settings.isDirty) {
                    if (confirm("Do you want to save the settings?")) {
                        settings.save();
                    }
                }
            });

            let scriptsToLoad = systemParams.scripts;

            /**
                Load the scripts defined in the window.
            */
            $(document).find('[data-script]').each(function(i, elem) {
                var script = $(elem).data('script') + '.js';
                scriptsToLoad[script] = 'Window script on <' + $(elem).prop("tagName").toLowerCase() + '>';
            });

            /**
                Load all the scripts defined in the scripts list.
            */
            for (let path in scriptsToLoad) {
                // Extract the description from the scripts array.
                let description = scriptsToLoad[path];

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
        });
    });


}
