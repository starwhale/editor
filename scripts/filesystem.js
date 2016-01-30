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

    'openFolder': function(callback) {
        let fs = require('fs');
        let remote = require('remote');

        remote.require('dialog').showOpenDialog({
        	title: 'Open Project',
            properties: ['openDirectory']
        }, function(path) {
            callback(filesystem.listFolder(path[0]));
        });
    },

    'listFolder': function(path) {
        let result = {};
        let fs = require('fs');

        let items = fs.readdirSync(path);

        for (var i=0; i<items.length; i++) {
            if (fs.lstatSync(path + '/' + items[i]).isDirectory()) {
                result[items[i]] = filesystem.listFolder(path + '/' + items[i]);
            }
            else {
                result[items[i]] = undefined;
            }
        }

        return result;
    }
};
