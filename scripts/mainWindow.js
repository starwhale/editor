/**
    Build the main window's application menu.
*/
const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

var menu = new Menu();
menu.append(new MenuItem({ label: 'File', submenu: [
    {
        label: 'New Projcet',
        accelerator: 'Ctrl+O'
    },
    {
        label: 'Open Project',
        accelerator: 'Ctrl+Shift+O'
    },
    {
        type: 'separator'
    },
    {
        label: 'New File',
        accelerator: 'Ctrl+N'
    },
    {
        label: 'New Projcet',
        accelerator: 'Ctrl+Shift+N'
    },
    {
        type: 'separator'
    },
    {
        label: 'Save',
        accelerator: 'Ctrl+S'
    },
    {
        label: 'Save As...',
        accelerator: 'Ctrl+Shift+S'
    },
    {
        label: 'Save All'
    },
    {
        type: 'separator'
    },
    {
        label: 'Settings',
        accelerator: 'Ctrl+,',
        click: settings.openWindow
    },
    {
        label: 'Exit',
        accelerator: 'Ctrl+Q'
    },
]}));

menu.append(new MenuItem({ label: 'Edit', submenu: [
    {
        label: 'Undo'
    },
    {
        label: 'Redo'
    },
]}));

menu.append(new MenuItem({ label: 'Find', submenu: [
    {
        label: 'Find'
    },
    {
        label: 'Find in project'
    },
    {
        label: 'Find in open tabs'
    },
    {
        type: 'separator'
    },
    {
        label: 'Replace'
    },
    {
        label: 'Replace in project'
    },
    {
        label: 'Replace in open tabs'
    },
    {
        type: 'separator'
    },
    {
        label: 'Find next'
    },
    {
        label: 'Find previous'
    },
    {
        label: 'Replace next'
    },
    {
        label: 'Replace all'
    },
] }));

menu.append(new MenuItem({ label: 'Help', submenu: [
    {
        label: 'Terms of use'
    },
    {
        label: 'License'
    },
    {
        label: 'About Starwhale'
    }
] }));

Menu.setApplicationMenu(menu);
