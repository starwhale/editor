'use strict'
/**
    @file           set-pnale-sizes.js
    @author         Eliran Pe'er (eliran@starwhale.com)
    @since          28/01/2016
    @version        1.0.0
    @type           JavaScript Client-side Script
    @description    Sets the panels width everytime the window size changes.
*/

$(window).resize(function() {
    let leftPanel = $('#left-pane');
    let rightPanel = $('#right-pane');

    if ($(leftPanel).length && $(rightPanel).length) {
        let rightPanelBoundsX = $(rightPanel).outerWidth(true) - $(rightPanel).innerWidth();
        let rightPanelBoundsY = $(rightPanel).outerHeight(true) - $(rightPanel).innerHeight();

        let leftPanelBoundsY = $(leftPanel).outerHeight(true) - $(leftPanel).innerHeight();

        $(leftPanel).width(systemParams.ui.leftPanelWidth);
        $(rightPanel).width($(window).width() - systemParams.ui.leftPanelWidth - rightPanelBoundsX);

        $(leftPanel).height($(window).height() - leftPanelBoundsY);
        $(rightPanel).height($(window).height() - rightPanelBoundsY);


        if (systemParams.debugMode) {
            console.group("Panel sizes has changed");
            console.log("Left Panel: " + $(leftPanel).width() + "px");
            console.log("Right Panel: " + $(rightPanel).width() + "px");
            console.groupEnd();
        }
    }
});
