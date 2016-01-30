'use strict'

window.explorerManager = {
    'setFileList': function(fileList) {
        $("#file-explorer-section ul").empty();
        explorerManager.addFileListToNode('#file-explorer-section ul', fileList);

        $("#file-explorer-section ul").show();
        $("#no-opened-directory").hide();
    },

    'addFileListToNode': function(selector, fileList) {
        for (let filename in fileList) {
            let liNode = $('<li />').text(filename);

            if (fileList[filename] != undefined) {
                // It's a folder
                let innerList = $('<ul />');
                explorerManager.addFileListToNode(innerList, fileList[filename]);
                $(liNode).append(innerList);
            }

            $("#file-explorer-section ul").append(liNode);
        }
    }
}
