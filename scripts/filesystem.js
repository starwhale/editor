'use strict'

window.filesystem = {
    'saveFileAs': function(fileContents) {
        let fs = require('fs');
        let remote = require('remote');

        remote.require('dialog').showSaveDialog({
        	title:'Save as...'
        }, function(path) {
        	console.log(path);
        });
    },

    'openFile': function() {
        let fs = require('fs');
        let remote = require('remote');

        remote.require('dialog').showOpenDialog({
        	title:'Open'
        }, function(path) {
        	console.log(path);
        });
    },
};
