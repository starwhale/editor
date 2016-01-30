'use strict'
/**
    @file           code-editor.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          29/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Contains helper method that helps manage the code editor
                    control.
    @class codeeditor
*/

window.codeeditor = {
        'currentNumberOfLines': 0,

        'countLines': function(selector) {
            var divheight = $(selector).height();
            var lineheight = 16;
            var numberOfLines = Math.floor(divheight/parseInt(lineheight));

            return numberOfLines;
        },

        'setNumberOfLines': function(selector, lines) {
            if (window.codeeditor.currentNumberOfLines != lines) {
                window.codeeditor.currentNumberOfLines = lines;
                $(selector).empty();
                for (var i = 1; i <= lines; i++) {
                    $(selector).append(i + '<br />');
                }
            }
        },

        'highlight': function(editorSelector) {
            //let cursorPosition = helpers.getCaretCharacterOffsetWithin($(selector)[0]);

            $(editorSelector).html(Prism.highlight(helpers.htmlForTextWithEmbeddedNewlines($(editorSelector).text()), Prism.languages.markup));
            //helpers.setCaretPosition($(selector), cursorPosition);
        }
};
