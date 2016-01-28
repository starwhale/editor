'use strict'
/**
    @file           script-manager.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          28/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Loads scripts
    @class scriptmanager
*/

window.scriptmanager {
    /**
        @function       themes.set
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          28/01/2016
        @version        1.0.0
        @type           sync
        @description    Loads a script from the scripts folder.
    */
    'load': function(name) {
        $.getScript("../scripts/" + name + '.js')
            .done(function() {
                if (systemParams.debugMode) {
                    console.group("Script '" + name + "' has loaded.");
                    console.log(description);
                    console.groupEnd();
                }
            })
            .fail(function(a, b, ex) {
                if (systemParams.debugMode) {
                    console.error("Script '" + name + "' has failed to load. (" + ex + ")");
                }
            });
    }
}
