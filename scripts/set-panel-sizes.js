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
        $(leftPanel).width(systemParams.ui.leftPanelWidth);
        $(rightPanel).width($(window).width() - systemParams.ui.leftPanelWidth);

        if (systemParams.debugMode) {
            console.group("Panel sizes has changed");
            console.log("Left Panel: " + $(leftPanel).width() + "px");
            console.log("Right Panel: " + $(rightPanel).width() + "px");
            console.groupEnd();
        }
    }
});
