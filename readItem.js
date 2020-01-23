// Modules
const {BrowserWindow} = require('electron')

// Offscreen BrowserWindow
let offscreenWindow

// Exported readItem function
module.exports = (url, callback) => {



  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  // Load item url

  /*Keep this please */
  // offscreenWindow.loadURL(url).then((msg) => {
  //   console.log("waaaa please");
    
  // }, reason => {
  //   console.log("something broke!!!!")
    
  // })
  /*Keep this please */

  offscreenWindow.loadURL(url);

  console.log("offscreenWindow: ");
  console.log(offscreenWindow);

  // Wait for content to finish loading
  offscreenWindow.webContents.on('did-finish-load', e => {

    console.log("what the heck I swear this didnt work and now it does.");

    // Get page title
    let title = offscreenWindow.getTitle()

    console.log("after title gotten")

    // Get Screenshot attempt via promise
    offscreenWindow.webContents.capturePage().then((image) => {
      console.log("inside the capturepage!!!!! almost there");

        //Get image as dataURL
        let screenshot = image.toDataURL()

        console.log("well am about to run callback.")

        // execute callback with new item object
        callback({ title, screenshot, url })

        // Clean up
        offscreenWindow.close()
        offscreenWindow = null
    })

  })

}
