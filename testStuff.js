// modules
const {BrowserWindow} = require('electron')

// Offscreen BrowserWindow
let offscreenWindow

/////////



const someFunc = (url) => {
  console.log("somebody sent us this: ")
  console.log(url)

  console.log("hello from the READ ITEM.js");

  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

}

exports.someFunc = someFunc;
