'use strict'
/**
    @file           viewparts.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Defines the viewparts static class,
                    which contains that load and manage view parts.
    @class viewparts
*/

window.viewparts = {
        /**
            @function       viewparts.replace
            @author         Eliran Pe'er (eliran@starwhale.com)
            @since          27/01/2016
            @version        1.0.0
            @type           async
            @description    Replaces the selector wiht a view-part from the filesystem.
            @param          (string) name
                            The name of the view-part, as defined
                            in the file system. (/view-parts/{name}.html)
            @param          (object) selector
                            Whatever you want to replace with the viewpart.
            @param          (function) callback
                            A callback that calls when the viewpart is finished loading.
            @return         (void)
        */
        'replace': function(name, selector, callback) {
            $.get("../view-parts/" + name + ".html", function(data) {
                $(selector).replaceWith(data);

                /**
                    Load the scripts defined in the window.
                */
                $('<div/>').html(data).find('[data-script]').each(function(i, elem) {
                    window.scriptmanager.load($(elem).data('script'));
                });

                if (systemParams.debugMode) {
                    console.log("Successfuly load view-part: '" + name + "'.");
                }

                if (callback) {
                    callback(true);
                }
            })
            .fail(function(a, b, e) {
                if (systemParams.debugMode) {
                    console.error("Failed to load view-part: '" + name + "'.");
                }

                if (callback) {
                    callback(false);
                }
            });
        },

        /**
            @function       viewparts.load
            @author         Eliran Pe'er (eliran@starwhale.com)
            @since          30/01/2016
            @version        1.0.0
            @type           async
            @description    Loads a view-part from the filesystem and append
                            it in the current view.
            @param          (string) name
                            The name of the view-part, as defined
                            in the file system. (/view-parts/{name}.html)
            @param          (object) selector
                            Wherever you want the view-part to appear.
            @param          (function) callback
                            A callback that calls when the viewpart is finished loading.
            @return         (void)
        */
        'load': function(name, selector, callback) {
            $.get("../view-parts/" + name + ".html", function(data) {
                $(selector).html(data);

                if (systemParams.debugMode) {
                    console.log("Successfuly load view-part: '" + name + "'.");
                }

                if (callback) {
                    callback(true);
                }
            })
            .fail(function() {
                if (systemParams.debugMode) {
                    console.error("Failed to load view-part: '" + name + "'.");
                }

                if (callback) {
                    callback(false);
                }
            });
        }
};
