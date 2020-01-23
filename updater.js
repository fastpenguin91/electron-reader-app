// Electron-updater module
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater');

// Configure log debugging
//autoUpdater.logger = require("electron-log");
//autoUpdater.logger.transports.file.level = "info";


// Disable auto downloading of updates
autoUpdater.autoDownload = false;

// Single export to check for and apply any available updates
module.exports = () => {
  // Check for updates (GH Releases)
  autoUpdater.checkForUpdates();

  // Listen for update found
  autoUpdater.on('update-available', () => {

    // prompt user to start download
    dialog.showMessageBox({
      type: 'info',
      title: 'Update available',
      message: 'A new version of Readit is available. you you want to update now?',
      buttons: ['Update', 'No']
    }, buttonIndex => {

      // If button index is 0 start downloading update
      if (buttonIndex === 0) autoUpdater.downloadUpdate()
    });
   // autoUpdater.downloadUpdate()
  })

  // Listen for update downloaded
  autoUpdater.on('update-downloaded', () => {

    // Prompt user to install the update
    dialog.showMessageBox({
      type: 'info',
      title: 'Update ready',
      message: 'Install and restart now?',
      buttons: ['Yes', 'Later']
    }, buttonIndex => {

      // Install and restart
      if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
    })
  })

}
