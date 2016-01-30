'use strict'
/**
    @file           load-startup-viewparts.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          27/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Loads the window's startup viewparts. (The ones that
                    marked using the data-viewpart attribute)
*/

$('body').find('[data-viewpart]').each(function(i, elem) {
    viewparts.replace($(elem).data('viewpart'), elem);
});
