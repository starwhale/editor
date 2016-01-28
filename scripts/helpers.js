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
    'isUrlExists': function(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    },

    /**
        Elements
    */
    'isElementExists': function(selector) {
        return $(selector).length;
    }
};
