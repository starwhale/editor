'use strict'
/**
    @file           helpers.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          28/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Contains several different helper methods.
    @class helpers
*/

window.helpers = {
    /**
        Url
    */

    /**
        @function       helpers.isUrlExists
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          27/01/2016
        @version        1.0.0
        @type           sync
        @description    Vaidates that an external URL exists.
        @param          (string) url
                        The external URL you wish to validate.
    */
    'isUrlExists': function(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    },

    /**
        Elements
    */

    /**
        @function       helpers.isElementExists
        @author         Eliran Pe'er (eliran@starwhale.com)
        @since          27/01/2016
        @version        1.0.0
        @type           sync
        @description    Vaidates that a DOM element exists in the current context.
        @param          (object) selector
                        A jQuery selector string or object.
    */
    'isElementExists': function(selector) {
        return $(selector).length;
    }
};
