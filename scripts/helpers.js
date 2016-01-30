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
    },

    'getCaretCharacterOffsetWithin': function(element) {
        var caretOffset = 0;
       var doc = element.ownerDocument || element.document;
       var win = doc.defaultView || doc.parentWindow;
       var sel;
       if (typeof win.getSelection != "undefined") {
           sel = win.getSelection();
           if (sel.rangeCount > 0) {
               var range = win.getSelection().getRangeAt(0);
               var preCaretRange = range.cloneRange();
               preCaretRange.selectNodeContents(element);
               preCaretRange.setEnd(range.endContainer, range.endOffset);
               caretOffset = preCaretRange.toString().length;
           }
       } else if ( (sel = doc.selection) && sel.type != "Control") {
           var textRange = sel.createRange();
           var preCaretTextRange = doc.body.createTextRange();
           preCaretTextRange.moveToElementText(element);
           preCaretTextRange.setEndPoint("EndToEnd", textRange);
           caretOffset = preCaretTextRange.text.length;
       }
       return caretOffset;
    },

    'setCaretPosition': function(element, offset) {
        var range = document.createRange();
        var sel = window.getSelection();

        //select appropriate node
        var currentNode = null;
        var previousNode = null;

        for (var i = 0; i < element.childNodes.length; i++) {
            //save previous node
            previousNode = currentNode;

            //get current node
            currentNode = element.childNodes[i];
            //if we get span or something else then we should get child node
           while(currentNode.childNodes.length > 0){
              currentNode = currentNode.childNodes[0];
           }

            //calc offset in current node
            if (previousNode != null) {
                offset -= previousNode.length;
            }
            //check whether current node has enough length
            if (offset <= currentNode.length) {
                break;
            }
        }
        //move caret to specified offset
        if (currentNode != null) {
            range.setStart(currentNode, offset);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    },

    'htmlForTextWithEmbeddedNewlines': function(text) {
        var htmls = [];
        var lines = text.split(/\n/);
        // The temporary <div/> is to perform HTML entity encoding reliably.
        //
        // document.createElement() is *much* faster than jQuery('<div></div>')
        // http://stackoverflow.com/questions/268490/
        //
        // You don't need jQuery but then you need to struggle with browser
        // differences in innerText/textContent yourself
        var tmpDiv = jQuery(document.createElement('div'));
        for (var i = 0 ; i < lines.length ; i++) {
            htmls.push(tmpDiv.text(lines[i]).html());
        }
        return htmls.join("<br>");
    }
};
