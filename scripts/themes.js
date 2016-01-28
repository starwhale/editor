'use strict'
/**
    @file           themes.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          28/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Manages and loads UI themes.
    @class themes
*/

window.themes = {
        /**
            @function       themes.set
            @author         Eliran Pe'er (eliran@starwhale.com)
            @since          28/01/2016
            @version        1.0.0
            @type           sync
            @description    Changees the theme to the theme name supplied.
        */
        'set': function(name) {
            let path = '../styles/themes/' + name + '.css';
            if (helpers.isUrlExists(path)) {
                if (helpers.isElementExists('#theme')) {
                    $('#theme').attr('href', path);
                }
                else {
                    if (systemParams.debugMode) {
                        console.log("Theme Manager: New link attribute has been added.");
                    }
                    $("head").append($("<link>", {rel: 'stylesheet', type: 'text/css', href: path, id: 'theme'}));
                }

                if (systemParams.debugMode) {
                    console.log("Theme Manager: Theme set to '" + path + "'");
                }
            }
            else {
                if (systemParams.debugMode) {
                    console.error("Theme Manager: Cannot find theme '" + path + "'")
                }
            }
        },

        /**
            @function       themes.unset
            @author         Eliran Pe'er (eliran@starwhale.com)
            @since          28/01/2016
            @version        1.0.0
            @type           sync
            @description    Remove the current theme.
        */
        'unset': function() {
            if (isElementExists('#theme')) {
                $('#theme').remove();
                console.log('Theme has removed.');
            }
        }
}
